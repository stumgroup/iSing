import Link from "next/link";

const features = [
  ["🎵","AI Music","Turn a simple idea into an original song."],
  ["🎙️","Your Voice","Use your own authorized voice or an AI voice."],
  ["🌍","Global","Create in African and international languages."],
  ["🎬","AI Video","Turn your song into an AI-inspired video."]
];

export default function Home() {
  return <main className="min-h-screen bg-white">
    <header className="border-b"><div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      <Link href="/" className="text-3xl font-black">i<span className="text-red-600">S</span>ing</Link>
      <div className="flex gap-3"><Link href="/pricing" className="hidden rounded-full px-5 py-3 text-sm font-semibold md:block">Pricing</Link><Link href="/create" className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-bold text-white">Create Music</Link></div>
    </div></header>
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="max-w-4xl">
        <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-700">WhatsApp-first AI music</span>
        <h1 className="mt-7 text-6xl font-black leading-[.95] tracking-tight md:text-8xl">Your idea.<br/>Your music.<br/><span className="text-red-600">iSing.</span></h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600">Create original songs from WhatsApp. Choose your language, genre, voice and gender. Listen to a preview, then unlock the full audio for $0.50 or an AI-inspired video for $1.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Link href="/create" className="rounded-full bg-red-600 px-8 py-4 text-center font-black text-white">Start Creating 🎵</Link><a href="#how" className="rounded-full border px-8 py-4 text-center font-black">How it works</a></div>
      </div>
      <div className="mt-20 grid gap-5 md:grid-cols-4">{features.map(([i,t,d])=><div key={t} className="rounded-3xl border p-7"><div className="text-4xl">{i}</div><h3 className="mt-5 text-xl font-black">{t}</h3><p className="mt-2 text-sm leading-6 text-zinc-600">{d}</p></div>)}</div>
    </section>
    <section id="how" className="bg-zinc-950 px-6 py-24 text-white"><div className="mx-auto max-w-6xl"><h2 className="text-4xl font-black">Create in three steps.</h2><div className="mt-12 grid gap-5 md:grid-cols-3">{["Tell iSing what you want","Listen to your preview","Pay and unlock"].map((x,i)=><div key={x} className="rounded-3xl bg-white/5 p-7"><div className="text-red-500">0{i+1}</div><h3 className="mt-4 text-xl font-black">{x}</h3><p className="mt-2 text-zinc-400">{["Send a natural-language prompt through WhatsApp or the web studio.","Hear a short sample before paying for the complete asset.","Pay $0.50 for audio or $1.00 for an AI-inspired video."][i]}</p></div>)}</div></div></section>
  </main>;
}
