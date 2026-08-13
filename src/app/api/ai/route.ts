import { NextResponse } from "next/server";
import { generate } from "@/lib/ising-ai/core";
export async function POST(req: Request){ try { const body=await req.json(); if(!body?.type || !body?.prompt) return NextResponse.json({ok:false,error:"type and prompt are required"},{status:400}); return NextResponse.json(await generate(body)); } catch(e:any){ return NextResponse.json({ok:false,error:e?.message||"Generation request failed"},{status:500}); }}
