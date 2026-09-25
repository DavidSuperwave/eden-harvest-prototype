import rawScenarios from './scenarios.json';
import rawTransitions from './transitions.json';
export interface CapturedControl {id:string;label:string;role:string;disabled:boolean;expanded:boolean|null}
export interface ScreenScenario {route:string;width:number;height:number;sidebar:boolean;controls:CapturedControl[]}
export interface Scenario {stateId:string;drafts:Record<string,string>;lastTransition:string;notice:string;sidebar:boolean;revision:number}
export interface ScenarioService {getSnapshot:()=>Scenario;subscribe:(listener:()=>void)=>()=>void;activate:(control:CapturedControl)=>void;navigate:(label:string)=>void;edit:(id:string,value:string)=>void;reset:(stateId?:string)=>void;notify:(message?:string)=>void}
export const layouts=rawScenarios as Record<string,ScreenScenario>;
export const transitions=rawTransitions as {id:string;from:string;to:string;control:string;label:string}[];
const defaults:Record<string,string>={home:'647dc839ad7f4a8f',discover:'4d26908d1a064a0d','all-items':'99c484be1ee8491a','custom-ai':'e1f675fb620541b7',chat:'130b181ba9e84cf4'};
const destinations:Record<string,string>={Home:'home',Library:'all-items',Discover:'discover','Custom AI':'custom-ai',Chat:'chat','View recents':'all-items'};
const mobile=()=>innerWidth<640;
function initial(){const requested=new URLSearchParams(location.search).get('state');if(requested&&layouts[requested])return requested;const route=location.pathname.split('/').pop()||'home';return mobile()&&route==='home'?'75522dff307243a2':mobile()&&route==='all-items'?'bd7e25f116db4df6':defaults[route]||defaults.home;}
const storageKey='eden-synthetic-preview-v2';
export class ScenarioStore implements ScenarioService {
 private listeners=new Set<()=>void>();
 private state:Scenario={stateId:initial(),drafts:{},lastTransition:'',notice:'',sidebar:new URLSearchParams(location.search).has('state')?layouts[initial()].sidebar:!mobile(),revision:0};
 getSnapshot=()=>this.state;
 subscribe=(fn:()=>void)=>{this.listeners.add(fn);return()=>{this.listeners.delete(fn);};};
 private commit(next:Scenario,push=false){this.state=next;try{localStorage.setItem(storageKey,JSON.stringify({drafts:next.drafts}));}catch{}if(push)history.pushState({stateId:next.stateId},'','/w/local/'+layouts[next.stateId].route);this.listeners.forEach(fn=>fn());}
 activate=(control:CapturedControl)=>{if(control.disabled)return;const exact=transitions.find(t=>t.from===this.state.stateId&&t.control===control.id);if(exact){this.commit({...this.state,stateId:exact.to,sidebar:layouts[exact.to].sidebar,lastTransition:exact.id,notice:''},true);return;}this.navigate(control.label);};
 navigate=(label:string)=>{if(label==='Open sidebar'||label==='Close sidebar'){this.commit({...this.state,sidebar:label==='Open sidebar',notice:''});return;}const route=destinations[label];if(!route){this.notify();return;}const id=mobile()&&route==='home'?'75522dff307243a2':mobile()&&route==='all-items'?'bd7e25f116db4df6':defaults[route];this.commit({...this.state,stateId:id,sidebar:!mobile(),lastTransition:'',notice:''},true);};
 edit=(id:string,value:string)=>this.commit({...this.state,drafts:{...this.state.drafts,[id]:value}});
 notify=(message='This is a local preview. Nothing was sent or saved to Eden.')=>this.commit({...this.state,notice:message});
 reset=(id?:string)=>{const sid=id&&layouts[id]?id:initial();this.commit({stateId:sid,drafts:{},lastTransition:'',notice:'',sidebar:layouts[sid].sidebar,revision:this.state.revision+1});};
 restore=(id?:string)=>this.reset(id);
}
export const scenario=new ScenarioStore();
window.__harvestResetScenario=scenario.reset;
window.addEventListener('popstate',event=>scenario.restore(event.state?.stateId));
