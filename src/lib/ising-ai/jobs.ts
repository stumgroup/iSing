import crypto from "crypto";
export async function createMusicJob(req:any){ return { ok:true, jobId:crypto.randomUUID(), status:"processing", type:"music", request:req, engine:"ising-ai-music" }; }
export async function createVideoJob(req:any){ return { ok:true, jobId:crypto.randomUUID(), status:"processing", type:"video", request:req, engine:"ising-ai-video" }; }
