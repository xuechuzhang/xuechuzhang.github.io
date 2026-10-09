import {STEPS,VERSION,validateConfig,characterFor,createSession,answer,handoff,openGroupPreview,finish,payoff,exportRecord} from './engine.mjs';
const byId=id=>document.getElementById(id);
let session=null;
const fields=['identity','delay','slot','rotation'];
const configuration=()=>validateConfig(Object.fromEntries(fields.map(id=>[id,byId(id).value])));
const status=text=>{byId('app-status').textContent=text;};
function element(tag,text,className) {
  const node=document.createElement(tag);
  if (text!==undefined) node.textContent=text;
  if (className) node.className=className;
  return node;
}
function updateConfiguration() {
  const config=configuration();
  byId('identity-map').replaceChildren(...[1,2,3].map(slot=>element('li',`Slot ${slot} → ${characterFor({...config,slot}).name}`)));
  byId('session-links').replaceChildren(...[1,2,3].map(slot=>{
    const link=element('a',`Open slot ${slot} ↗`);
    const url=new URL('prototype.html',window.location.href);
    url.search=new URLSearchParams({...config,slot}).toString();
    link.href=url.href; link.target='_blank'; link.rel='noopener noreferrer';
    return link;
  }));
}
function updatePayoff() {
  const values=[1,2,3].map(i=>Number(byId(`token-${i}`).value));
  const result=payoff(values);
  values.forEach((v,i)=>{byId(`value-${i+1}`).textContent=String(v);});
  byId('pool-note').textContent=`Pool: ${result.pool} × 1.5 = ${result.multipliedPool}. Each receives ${result.sharedReturn.toFixed(1)} from the pool.`;
  byId('payoff-earnings').replaceChildren(...result.earnings.map((v,i)=>{
    const item=element('div'); item.append(element('span',`Illustrative player ${i+1}`),element('strong',`${v.toFixed(1)} tokens`)); return item;
  }));
}
function render() {
  const phase=session?.phase;
  byId('prototype-layout').dataset.sessionActive=String(Boolean(session));
  byId('welcome-panel').hidden=Boolean(session);
  byId('chat-panel').hidden=!['chat','ready'].includes(phase);
  byId('group-panel').hidden=phase!=='group';
  byId('complete-panel').hidden=phase!=='complete';
  byId('event-details').hidden=!session;
  byId('record-details').hidden=!session;
  fields.forEach(id=>{byId(id).disabled=Boolean(session);});
  byId('demo-ack').disabled=Boolean(session);
  byId('start-session').disabled=Boolean(session);
  byId('reset-session').disabled=!session;
  byId('export-session').disabled=!session;
  byId('inspect-session').disabled=!session;
  [1,2,3].forEach(i=>byId(`progress-${i}`).removeAttribute('aria-current'));
  const stage=phase==='ready'?2:['group','complete'].includes(phase)?3:1;
  byId(`progress-${stage}`).setAttribute('aria-current','step');
  if (!session) return;
  byId('character-title').textContent=session.character.name;
  byId('character-mark').textContent=session.character.initial;
  byId('session-label').textContent=`Slot ${session.config.slot} · Response engine: scripted branches · v${VERSION}`;
  byId('turn-label').textContent=`${Math.min(session.turn+1,3)} / 3 turns`;
  byId('transcript').replaceChildren(...session.messages.map(message=>{
    const row=element('div',undefined,`message ${message.speaker}`);
    row.append(element('span',message.speaker==='character'?session.character.name:'You'),element('p',message.text));
    return row;
  }));
  byId('transcript').scrollTop=byId('transcript').scrollHeight;
  byId('choice-panel').hidden=phase!=='chat';
  byId('handoff-panel').hidden=phase!=='ready';
  if (phase==='chat') {
    const step=STEPS[session.turn];
    byId('choice-prompt').textContent=step.prompt;
    byId('choices').replaceChildren(...step.choices.map(choice=>{
      const button=element('button',choice.label,'choice-button'); button.type='button';
      button.addEventListener('click',()=>{
        try {session=answer(session,choice.id,Date.now()); render(); if (session.phase==='chat') byId('choice-prompt').focus({preventScroll:true}); else byId('open-group').focus({preventScroll:true});}
        catch (error) {status(error.message);}
      }); return button;
    }));
  }
  if (phase==='ready') {
    byId('eligibility-note').textContent=session.config.delay===7
      ?`A real seven-day meeting becomes eligible at ${new Date(session.eligibleAt).toLocaleString()}. This demo does not store or schedule that follow-up.`
      :'Immediate condition: the human-only handoff is now eligible.';
    byId('open-group').textContent=session.config.delay===7?'Preview seven-day handoff · simulate clock':'Open group-phase preview';
  }
  if (phase==='group') {
    byId('group-clock-note').textContent=session.clockSimulated
      ?'Seven-day clock simulation. No week has elapsed; this is a preview of a later first meeting, not follow-up evidence.'
      :'Immediate handoff preview. No real human group is connected in this demonstration.';
    byId('handoff-record').textContent=JSON.stringify(handoff(session),null,2);
    updatePayoff();
  }
  byId('event-log').textContent=JSON.stringify(session.events,null,2);
  byId('demo-record').textContent=JSON.stringify(exportRecord(session),null,2);
}
function reset() {
  session=null; byId('demo-ack').checked=false;
  byId('transcript').replaceChildren(); byId('choices').replaceChildren();
  byId('event-log').textContent=''; byId('handoff-record').textContent=''; byId('demo-record').textContent='';
  [1,2,3].forEach(i=>{byId(`token-${i}`).value='0';});
  ['event-details','record-details','handoff-details'].forEach(id=>{byId(id).open=false;});
  updatePayoff(); render(); updateConfiguration();
}
try {
  const params=new URLSearchParams(window.location.search);
  const defaults={identity:'shared',delay:0,slot:1,rotation:0};
  const config=validateConfig(Object.fromEntries(fields.map(id=>[id,params.get(id)??defaults[id]])));
  fields.forEach(id=>{byId(id).value=String(config[id]);});
} catch (error) {status('Invalid public configuration; default settings restored. '+error.message);}
fields.forEach(id=>byId(id).addEventListener('change',updateConfiguration));
byId('config-form').addEventListener('submit',event=>{
  event.preventDefault(); if (session || !byId('demo-ack').checked) return;
  try {session=createSession(configuration(),crypto.randomUUID(),Date.now()); status('Private session started. Settings are locked until reset.'); render(); byId('chat-panel').scrollIntoView({block:'start'}); byId('choice-prompt').focus({preventScroll:true});}
  catch (error) {status(error.message);}
});
byId('reset-session').addEventListener('click',()=>{reset(); status('Private choices, transcript, and event log cleared from this page. Existing downloaded files are unchanged.'); byId('identity').focus();});
byId('open-group').addEventListener('click',()=>{
  try {session=openGroupPreview(session,Date.now(),{simulateDelay:session.config.delay===7}); render(); byId('group-title').focus();}
  catch (error) {status(error.message);}
});
byId('finish-demo').addEventListener('click',()=>{
  try {session=finish(session,Date.now()); render(); status('Walkthrough complete. The record is software demonstration evidence, not participant evidence.'); byId('complete-title').focus();}
  catch (error) {status(error.message);}
});
function inspectRecord() {
  if (!session) return;
  byId('record-details').open=true;
  byId('record-details').scrollIntoView({block:'start'});
  byId('record-summary').focus({preventScroll:true});
}
byId('inspect-session').addEventListener('click',inspectRecord);
byId('export-session').addEventListener('click',()=>{
  if (!session) return;
  try {
    const url=URL.createObjectURL(new Blob([JSON.stringify(exportRecord(session),null,2)],{type:'application/json'}));
    const link=element('a'); link.href=url; link.download=`prototype01-demo-slot${session.config.slot}.json`;
    document.body.append(link); link.click(); link.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
    status('Download requested. Check your browser downloads; the page cannot confirm the file was saved. The same JSON is available under Inspect demo record. Nothing was uploaded.');
  } catch {
    inspectRecord();
    status('This browser could not create a download. You can inspect and copy the same JSON below. Nothing was uploaded.');
  }
});
[1,2,3].forEach(i=>byId(`token-${i}`).addEventListener('input',updatePayoff));
window.addEventListener('pagehide',()=>{reset();});
window.addEventListener('pageshow',event=>{if(event.persisted){reset();status('A fresh session is required after returning to this page.');}});
updateConfiguration(); render();
