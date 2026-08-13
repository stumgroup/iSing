import { createMusicJob, createVideoJob } from "./jobs";
export type GenerationRequest = { type:"music"|"video"; prompt:string; language?:string; genre?:string; mood?:string; gender?:string; voiceMode?:string; duration?:number; lyrics?:string };
export async function generate(req: GenerationRequest){ return req.type==="music" ? createMusicJob(req) : createVideoJob(req); }
