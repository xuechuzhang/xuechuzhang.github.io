/** Prototype 01. Scripted interaction; no model, database, or network calls. */
export const VERSION = '0.1.0';
export const DAY_MS = 86400000;
export const CHARACTERS = Object.freeze([
  Object.freeze({id:'aster', name:'Aster', initial:'A', principle:'Make room for a different perspective before deciding.'}),
  Object.freeze({id:'rowan', name:'Rowan', initial:'R', principle:'Make room for a different perspective before deciding.'}),
  Object.freeze({id:'marlow', name:'Marlow', initial:'M', principle:'Make room for a different perspective before deciding.'})
]);

export const STEPS = Object.freeze([
  {prompt:'You are helping a new group plan a welcome activity. Where would you start?', choices:[
    {id:'plan', label:'Sketch a plan', response:'You prefer a clear starting point. A draft can make the choices visible, while leaving room for other people to change it.'},
    {id:'listen', label:'Ask what people need', response:'You prefer to listen first. Asking what people need can reveal priorities that a quick plan might miss.'},
    {id:'explore', label:'Explore a few possibilities', response:'You prefer to explore. Comparing possibilities can make it easier to notice assumptions before settling on one.'}
  ]},
  {prompt:'Two people suggest different activities. What would you do next?', choices:[
    {id:'compare', label:'Compare the trade-offs', response:'Comparing trade-offs keeps both ideas in view. What would each activity make possible, and what would each leave out?'},
    {id:'clarify', label:'Ask each person why it matters', response:'Clarifying the reasons can change how the disagreement looks. People may want similar things but imagine different routes.'},
    {id:'try', label:'Try a small version of each', response:'A small trial can turn a disagreement into something to learn from. It still helps to agree on what would count as a useful trial.'}
  ]},
  {prompt:'What would you want the group to remember when it makes a decision?', choices:[
    {id:'voice', label:'Everyone should have a voice', response:'Giving people a voice is a useful starting principle. Hearing a perspective does not require agreeing with it.'},
    {id:'reasons', label:'Make the reasons understandable', response:'Making the reasons understandable lets others question and improve the decision, rather than simply accept it.'},
    {id:'revise', label:'Keep room to revise the plan', response:'Keeping room to revise can make uncertainty manageable. A first decision does not have to become a permanent commitment.'}
  ]}
]);

export function validateConfig(input) {
  const identity = input.identity;
  const delay = Number(input.delay);
  const slot = Number(input.slot);
  const rotation = Number(input.rotation);
  if (!['shared','separate'].includes(identity)) throw new Error('Choose a valid identity condition.');
  if (![0,7].includes(delay)) throw new Error('Delay must be 0 or 7 days.');
  if (![1,2,3].includes(slot)) throw new Error('Participant slot must be 1, 2, or 3.');
  if (![0,1,2].includes(rotation)) throw new Error('Character rotation must be 0, 1, or 2.');
  return {identity,delay,slot,rotation};
}

export function characterFor(input) {
  const config = validateConfig(input);
  const index = (config.rotation + (config.identity === 'shared' ? 0 : config.slot - 1)) % 3;
  return {...CHARACTERS[index]};
}

function addEvent(state,type,at,payload={}) {
  if (!Number.isFinite(at)) throw new Error('A valid timestamp is required.');
  const event = {sequence:state.events.length+1,type,at:new Date(at).toISOString(),payload:{...payload}};
  return {...state,events:[...state.events,event]};
}

export function createSession(input,id,at) {
  const config = validateConfig(input);
  if (typeof id !== 'string' || !id || id.length > 100) throw new Error('A local session ID is required.');
  const character = characterFor(config);
  return addEvent({version:VERSION,id,config,character,phase:'chat',turn:0,choices:[],
    completedAt:null,eligibleAt:null,clockSimulated:false,events:[],messages:[
      {speaker:'character',text:`Hello, I am ${character.name}, a scripted research character. We will think through a simple group activity together. My responses use only the choices in this session.`},
      {speaker:'character',text:STEPS[0].prompt}
    ]},'session_started',at,{identity:config.identity,delay:config.delay,slot:config.slot,rotation:config.rotation});
}

export function answer(state,choiceId,at) {
  if (state.phase !== 'chat') throw new Error('The conversation is not accepting choices.');
  const step = STEPS[state.turn];
  const choice = step.choices.find(item=>item.id===choiceId);
  if (!choice) throw new Error('Choose an option from the current turn.');
  const turn = state.turn+1;
  const messages = [...state.messages,{speaker:'visitor',text:choice.label},{speaker:'character',text:choice.response}];
  let next = {...state,turn,choices:[...state.choices,choice.id],messages};
  next = addEvent(next,'choice_selected',at,{turn,choice:choice.id});
  if (turn < STEPS.length) {
    next.messages = [...messages,{speaker:'character',text:STEPS[turn].prompt}];
  } else {
    const startingPoint = {plan:'a clear plan',listen:'listening to people',explore:'exploring possibilities'}[next.choices[0]];
    next = {...next,phase:'ready',completedAt:at,eligibleAt:at+state.config.delay*DAY_MS,
      messages:[...messages,{speaker:'character',text:`You started with ${startingPoint}. My principle remains: ${state.character.principle} That is a suggestion to consider, not a decision I can make for your group.`}]};
    next = addEvent(next,'conversation_completed',at,{turns:turn});
  }
  return next;
}

/** Public scheduling/identity metadata only. Never includes choices or messages. */
export function handoff(state) {
  if (!['ready','group','complete'].includes(state.phase)) throw new Error('Finish the private exchange first.');
  return {slot:state.config.slot,character:state.character.name,identity:state.config.identity,
    delayDays:state.config.delay,eligibleAt:new Date(state.eligibleAt).toISOString(),
    stage:'facilitator_handoff_preview',requiresHumanFacilitator:true};
}

export function openGroupPreview(state,at,{simulateDelay=false}={}) {
  if (state.phase !== 'ready') throw new Error('Finish the private exchange before the handoff.');
  if (at < state.completedAt) throw new Error('The clock is earlier than conversation completion.');
  if (at < state.eligibleAt && !simulateDelay) throw new Error('The scheduled meeting is not yet eligible.');
  const simulated = at < state.eligibleAt;
  return addEvent({...state,phase:'group',clockSimulated:simulated},'group_preview_opened',at,
    {clockMode:simulated?'simulated':'actual',delayDays:state.config.delay});
}

export function finish(state,at) {
  if (state.phase !== 'group') throw new Error('Open the handoff preview first.');
  return addEvent({...state,phase:'complete'},'walkthrough_completed',at,{notParticipantEvidence:true});
}

export function payoff(contributions) {
  if (!Array.isArray(contributions) || contributions.length !== 3 || contributions.some(n=>!Number.isInteger(n)||n<0||n>10))
    throw new Error('Enter three whole-token contributions from 0 to 10.');
  const pool = contributions.reduce((a,b)=>a+b,0);
  const sharedReturn = pool*1.5/3;
  return {pool,multipliedPool:pool*1.5,sharedReturn,
    earnings:contributions.map(n=>10-n+sharedReturn)};
}

export function exportRecord(state) {
  return {schemaVersion:'prototype01.demo.v1',softwareVersion:VERSION,
    evidenceType:'local_demo_interaction',notResearchData:true,
    description:'Choices entered by a visitor in a scripted software walkthrough. Not a recruited participant or a human-group experiment.',
    sessionId:state.id,configuration:{...state.config},character:{...state.character},phase:state.phase,
    clockSimulated:state.clockSimulated,choices:[...state.choices],
    transcript:state.messages.map(m=>({...m})),events:state.events.map(e=>({...e,payload:{...e.payload}}))};
}
