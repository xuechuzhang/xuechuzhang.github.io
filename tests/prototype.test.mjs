import test from 'node:test';
import assert from 'node:assert/strict';
import {DAY_MS,createSession,answer,characterFor,handoff,openGroupPreview,finish,payoff,exportRecord,validateConfig} from '../prototype/engine.mjs';
const time=Date.UTC(2026,9,9,12);
const config={identity:'shared',delay:0,slot:1,rotation:0};
const ready=(cfg=config)=>['plan','compare','voice'].reduce((s,c,i)=>answer(s,c,time+i+1),createSession(cfg,'demo-a',time));

test('shared identity stays consistent across independent slots and all rotations',()=>{
  for (let rotation=0;rotation<3;rotation++) {
    const names=[1,2,3].map(slot=>characterFor({...config,slot,rotation}).name);
    assert.equal(new Set(names).size,1);
  }
});
test('separate identity uses three names and rotation balances each slot',()=>{
  const names=[1,2,3].map(slot=>characterFor({...config,identity:'separate',slot}).name);
  assert.equal(new Set(names).size,3);
  const rotated=[0,1,2].map(rotation=>characterFor({...config,identity:'separate',rotation}).name);
  assert.equal(new Set(rotated).size,3);
});
test('invalid configuration and arbitrary choice payloads are rejected',()=>{
  for (const cfg of [{...config,identity:'bad'},{...config,delay:1},{...config,slot:4},{...config,rotation:8}]) assert.throws(()=>validateConfig(cfg));
  assert.throws(()=>answer(createSession(config,'a',time),'<script>bad</script>',time+1));
  assert.throws(()=>createSession(config,'',time));
  assert.throws(()=>createSession(config,'a',NaN));
});
test('personalization stays within its own state and does not change character identity',()=>{
  const original=createSession(config,'a',time);
  const a=answer(original,'plan',time+1);
  const b=answer(createSession({...config,slot:2},'b',time),'listen',time+1);
  assert.notEqual(a.messages[3].text,b.messages[3].text);
  assert.equal(a.character.name,b.character.name);
  assert.equal(original.turn,0);
  assert.equal(original.choices.length,0);
  assert.deepEqual(a.choices,['plan']);
  assert.deepEqual(b.choices,['listen']);
  const a2=answer(a,'compare',time+2);
  assert.equal(b.messages.some(m=>m.text===a2.messages.at(-2).text),false);
});
test('private fields never enter the facilitator handoff',()=>{
  const state=ready();
  assert.deepEqual(Object.keys(handoff(state)).sort(),['slot','character','identity','delayDays','eligibleAt','stage','requiresHumanFacilitator'].sort());
  assert.equal('messages' in handoff(state),false);
  assert.equal('choices' in handoff(state),false);
});
test('state order prevents premature handoffs, late choices, and double completion',()=>{
  const initial=createSession(config,'a',time);
  assert.throws(()=>handoff(initial));
  assert.throws(()=>openGroupPreview(initial,time));
  assert.throws(()=>finish(initial,time));
  const state=ready();
  assert.throws(()=>answer(state,'plan',time+4));
  const group=openGroupPreview(state,time+5);
  assert.throws(()=>openGroupPreview(group,time+6));
  const complete=finish(group,time+7);
  assert.equal(complete.phase,'complete');
  assert.throws(()=>finish(complete,time+8));
});
test('seven-day eligibility is real arithmetic, with an explicitly marked simulation escape',()=>{
  const state=ready({...config,delay:7});
  assert.equal(state.eligibleAt-state.completedAt,7*DAY_MS);
  assert.throws(()=>openGroupPreview(state,time+5));
  assert.throws(()=>openGroupPreview(state,time-1,{simulateDelay:true}));
  const simulated=openGroupPreview(state,time+5,{simulateDelay:true});
  assert.equal(simulated.clockSimulated,true);
  assert.equal(simulated.events.at(-1).payload.clockMode,'simulated');
  assert.equal(openGroupPreview(state,state.eligibleAt).clockSimulated,false);
});
test('event sequences and exports identify software demonstration evidence',()=>{
  const state=finish(openGroupPreview(ready(),time+5),time+6);
  const record=exportRecord(state);
  assert.deepEqual(record.events.map(e=>e.sequence),[1,2,3,4,5,6,7]);
  assert.equal(record.notResearchData,true);
  assert.equal(record.evidenceType,'local_demo_interaction');
  record.transcript[0].text='edited export';
  record.events[0].payload.identity='edited export';
  assert.notEqual(state.messages[0].text,'edited export');
  assert.equal(state.events[0].payload.identity,'shared');
});
test('payoff honors the specified three-person public-goods rule',()=>{
  assert.deepEqual(payoff([10,10,10]).earnings,[15,15,15]);
  assert.deepEqual(payoff([0,0,0]).earnings,[10,10,10]);
  assert.deepEqual(payoff([6,4,2]).earnings,[10,12,14]);
  for (const values of [[11,0,0],[-1,0,0],[1.5,0,0],[0,0],['5',0,0]]) assert.throws(()=>payoff(values));
});
