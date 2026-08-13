"use client";
import { useState } from "react";
import { LANGUAGES, GENRES } from "@/lib/constants";
import Link from "next/link";

export default function CreatePage() {
  const [form,setForm]=useState({prompt:"",language:"Swahili",genre:"Amapiano",gender:"male",voiceType:"ai"});
  const [status,setStatus]=useState("");
  async function submit(){
    if(!form.prompt.trim()) return setStatus("Describe the song first.");
    setStatus("Submitting generation request...");
    const r=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
    const d=await r.json();
    setStatus(d.message || (r.ok ? "Preview job queued." : "Something went wrong."));
  }
  return <main className="min-h-screen bg-zinc-50"><header className="border-b bg-white"><div className="mx-auto flex max-w-5xl justify-between px-6 py-5"><Link href="/" className="text-3xl font-black">i<span className="text-red-600">S</span>ing</Link><Link href="/dashboard" className="text-sm font-semibold">Dashboard</Link></div></header>
  <div className="mx-auto max-w-4xl px-6 py-12"><p className="font-bold uppercase tracking-widest text-red-600">Create</p><h1 className="mt-3 text-5xl font-black">Tell us what you hear.</h1>
  <div className="mt-10 space-y-6">
    <section className="rounded-3xl border bg-white p-7"><label className="font-black">Song idea</label><textarea value={form.prompt} onChange={e=>setForm({...form,prompt:e.target.value})} className="mt-4 min-h-40 w-full rounded-2xl border bg-zinc-50 p-5 outline-none focus:border-red-500" placeholder="Make me a romantic Swahili Amapiano song for my wife Sarah..."/></section>
    <section className="rounded-3xl border bg-white p-7"><h2 className="font-black">Language</h2><div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{LANGUAGES.map(x=><button key={x} onClick={()=>setForm({...form,language:x})} className={`rounded-xl border p-3 text-sm font-semibold ${form.language===x?"border-red-600 bg-red-600 text-white":""}`}>{x}</button>)}</div></section>
    <section className="rounded-3xl border bg-white p-7"><h2 className="font-black">Music style</h2><div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{GENRES.map(x=><button key={x} onClick={()=>setForm({...form,genre:x})} className={`rounded-xl border p-3 text-sm font-semibold ${form.genre===x?"border-red-600 bg-red-600 text-white":""}`}>{x}</button>)}</div></section>
    <section className="rounded-3xl border bg-white p-7"><h2 className="font-black">Singer</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{[["ai","🤖 AI Voice"],["clone","🎙️ My Voice"]].map(([v,t])=><button key={v} onClick={()=>setForm({...form,voiceType:v})} className={`rounded-2xl border p-5 text-left font-black ${form.voiceType===v?"border-red-600 bg-red-50":""}`}>{t}<span className="mt-1 block text-sm font-normal text-zinc-500">{v==="ai"?"Choose an AI singer.":"Use your own authorized voice profile."}</span></button>)}</div>
    <div className="mt-5"><p className="font-bold">Gender</p><div className="mt-2 grid grid-cols-2 gap-2">{["male","female"].map(x=><button key={x} onClick={()=>setForm({...form,gender:x})} className={`rounded-xl border p-3 font-bold ${form.gender===x?"border-red-600 bg-red-600 text-white":""}`}>{x==="male"?"👨 Male":"👩 Female"}</button>)}</div></div></section>
    <section className="rounded-3xl bg-zinc-950 p-7 text-white"><p className="text-sm text-zinc-400">Preview first</p><h2 className="mt-2 text-2xl font-black">{form.genre} · {form.language} · {form.voiceType==="ai"?`AI ${form.gender}`:"My Voice"}</h2><button onClick={submit} className="mt-6 w-full rounded-full bg-red-600 py-4 font-black">Generate Song Preview 🎵</button>{status&&<p className="mt-4 text-center text-sm text-zinc-300">{status}</p>}<p className="mt-3 text-center text-xs text-zinc-500">$0.50 full audio · $1.00 AI video</p></section>
  </div></div></main>
}
