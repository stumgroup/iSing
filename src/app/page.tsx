import Link from "next/link";
import { ArrowUpRight, Check, Music2, Mic2, MessageCircle, Video, Sparkles } from "lucide-react";

const features = [
  { icon: Music2, title: "Music creation", text: "Describe the song you hear and iSing AI composes an original preview in-house." },
  { icon: Mic2, title: "AI or your voice", text: "Choose an iSing AI singer or an authorized personal voice profile." },
  { icon: MessageCircle, title: "WhatsApp first", text: "Send your idea naturally from WhatsApp and let iSing AI handle the workflow." },
  { icon: Video, title: "Music video", text: "Turn your finished song into an AI-inspired visual experience." },
];

export default function Home() {
  return (
    <main className="workspace-shell min-h-screen">
      <header className="workspace-header">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="brand"><span className="brand-mark">i</span>Sing <span className="brand-ai">AI</span></Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <Link href="/songs" className="nav-link">My Music</Link>
            <Link href="/videos" className="nav-link">Videos</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/help" className="nav-link">Help</Link>
          </nav>
          <div className="flex gap-2">
            <Link href="/dashboard" className="hidden rounded-full px-4 py-2 text-sm font-bold sm:block">Sign in</Link>
            <Link href="/create" className="dark-pill">Create with AI <ArrowUpRight size={14} className="ml-1 inline" /></Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-20 lg:px-8 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="eyebrow"><Sparkles size={14}/> Your creative studio</p>
            <h1 className="mt-5 max-w-4xl text-6xl font-black leading-[.94] tracking-[-.055em] text-zinc-950 md:text-8xl">
              Make the music<br />you imagine.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-500">
              iSing AI turns a simple idea into an original song. Choose the language, sound, singer and mood — then hear a free preview before you pay.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/create" className="rounded-full bg-[#ff5a36] px-7 py-4 text-center text-sm font-black text-white shadow-lg shadow-orange-200">Start creating</Link>
              <Link href="/whatsapp" className="rounded-full border border-zinc-300 bg-white px-7 py-4 text-center text-sm font-black">Create on WhatsApp</Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-zinc-400">
              {["Free preview", "$0.50 full audio", "$1 AI video"].map((item) => <span key={item}><Check size={14} className="mr-1 inline text-[#ff5a36]" />{item}</span>)}
            </div>
          </div>

          <div className="rounded-[30px] border border-zinc-200 bg-white p-4 shadow-xl shadow-zinc-200/50">
            <div className="rounded-[23px] bg-[#111] p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black">iSing AI Studio</span>
                <span className="rounded-full bg-white/10 px-2 py-1 text-[9px] font-bold text-zinc-300">LIVE COMPOSER</span>
              </div>
              <div className="mt-5 rounded-2xl bg-[#202020] p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Song idea</p>
                <p className="mt-3 text-xl font-bold leading-8">“A joyful Swahili Amapiano song with Kenyan Benga guitar…”</p>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {["Swahili", "Amapiano", "Male"].map((x) => <span key={x} className="rounded-xl bg-white/10 p-3 text-center text-[10px] font-bold">{x}</span>)}
              </div>
              <div className="mt-3 rounded-2xl bg-gradient-to-br from-[#8b1f0e] to-[#ff5a36] p-5">
                <div className="flex items-center gap-2 text-xs font-black"><Music2 size={15}/> iSing AI is composing</div>
                <div className="mt-5 flex items-end gap-1">
                  {Array.from({length:28}).map((_,i)=><span key={i} className="flex-1 rounded-full bg-white/70" style={{height:`${12 + ((i*17)%38)}px`}} />)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-4">
          {features.map(({icon: Icon, title, text}) => (
            <div key={title} className="rounded-3xl border border-zinc-200 bg-white p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-100"><Icon size={18}/></div>
              <h3 className="mt-5 font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Simple workflow</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">Idea → preview → release.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Describe", "Tell iSing AI what you want in your own words."],
              ["02", "Create", "Our in-house composer turns the direction into an audio preview."],
              ["03", "Unlock", "Keep the preview free, then pay $0.50 for full audio or $1 for video."],
            ].map(([n,t,d]) => <div key={n} className="rounded-3xl bg-[#f7f7f5] p-7"><span className="text-xs font-black text-[#ff5a36]">{n}</span><h3 className="mt-5 text-xl font-black">{t}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{d}</p></div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
