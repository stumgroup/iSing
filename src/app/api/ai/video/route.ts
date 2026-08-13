import { NextResponse } from "next/server";
import { generate } from "@/lib/ising-ai/core";
export async function POST(req: Request){ try{ const body=await req.json(); if(!body?.prompt) return NextResponse.json({ok:false,error:"prompt is required"},{status:400}); return NextResponse.json(await generate({...body,type:"video"})); }catch(e:any){ return NextResponse.json({ok:false,error:e?.message||"Generation failed"},{status:500}); } }
