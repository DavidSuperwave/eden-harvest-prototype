export type RouteName='home'|'all-items'|'discover'|'custom-ai'|'chat';
export interface LibraryItem {id:string;title:string;subtitle:string;paragraphs:string[];kind:'document';updatedAt:string}
export interface FeedPost {id:string;author:string;handle:string;age:string;body:string;art?:'studio'|'architecture'|'landscape';likes:string;multiplier:string;rank:string;avatar:string}
export interface ContentViewModel {route:RouteName;source:'synthetic';status:'ready';items:LibraryItem[];posts:FeedPost[]}
export interface ContentService {readView(route:RouteName):ContentViewModel;reset():void}
const item:LibraryItem={id:'welcome',title:'A place for your ideas',subtitle:'A small guide to getting started.',paragraphs:['Keep your notes, useful links, and unfinished thoughts together. Find them again when the next idea arrives.','Start with your Library','Collect notes, articles, transcripts, and research. Search across your collection. Bring related ideas together in a board.','Give ideas a place to grow','Use a board to connect a few thoughts, explore a question, or outline something new.'],kind:'document',updatedAt:'Today'};
const posts:FeedPost[]=[
{id:'p1',author:'Avery Morgan',handle:'@averymakes',age:'4mo',body:'A small corner. A little daylight. Room for a new idea.',art:'studio',likes:'8.2k',multiplier:'6.82×',rank:'Top 1%',avatar:'AM'},
{id:'p2',author:'Jordan Lee',handle:'@jordanlee',age:'20d',body:'The best way to make progress is to make space for the work that matters.',likes:'457',multiplier:'23×',rank:'Top 1%',avatar:'JL'},
{id:'p3',author:'Maya Chen',handle:'@mayastudio',age:'4mo',body:'Finding a new perspective in familiar places.',art:'architecture',likes:'2.6k',multiplier:'3.73×',rank:'Top 2%',avatar:'MC'},
{id:'p4',author:'Sam Rivera',handle:'@samrivera',age:'2mo',body:'A thought I keep coming back to:\n\nCuriosity is a practice.\n\nWhen you try something new, notice what surprised you. The unexpected part is often where the interesting work begins.',likes:'932',multiplier:'4.8×',rank:'Top 5%',avatar:'SR'},
{id:'p5',author:'Taylor Brooks',handle:'@tayloroutside',age:'12d',body:'A slower morning, a longer walk, and a fresh page.',art:'landscape',likes:'1.4k',multiplier:'5.3×',rank:'Top 2%',avatar:'TB'},
{id:'p6',author:'Alex Park',handle:'@alexpark',age:'14d',body:'Good questions give a project somewhere to go. Leave a little room for the answer to change.',likes:'660',multiplier:'2.1×',rank:'Top 10%',avatar:'AP'}];
export class FixtureContentService implements ContentService {
 readView(route:RouteName):ContentViewModel{return {route,source:'synthetic',status:'ready',items:[item],posts};}
 reset(){}
}
export const contentService:ContentService=new FixtureContentService();
