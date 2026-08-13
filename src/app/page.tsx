import Link from "next/link";

const features = [
  {
    icon: "🎵",
    title: "Create Music",
    text: "Turn a simple idea into an original AI-generated song.",
  },
  {
    icon: "🎙️",
    title: "Your Voice",
    text: "Use your own authorized voice or choose an AI voice.",
  },
  {
    icon: "🌍",
    title: "Global Languages",
    text: "Create music in African and international languages.",
  },
  {
    icon: "🎬",
    title: "AI Music Videos",
    text: "Turn your finished song into an AI-inspired music video.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      {/* Navigation */}
      <header className="border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-3xl font-black tracking-tight">
            i<span className="text-red-600">S</span>ing
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-950"
            >
              How It Works
            </Link>

            <Link
              href="#features"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-950"
            >
              Features
            </Link>

            <Link
              href="#pricing"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-950"
            >
              Pricing
            </Link>
          </nav>

          <Link
            href="/create"
            className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
          >
            Create Music
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 md:pb-32 md:pt-32">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
              <span className="h-2 w-2 rounded-full bg-red-600" />
              AI music creation through WhatsApp
            </div>

            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Your idea.
              <br />
              Your music.
              <br />
              <span className="text-red-600">iSing.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
              Create original songs using AI. Choose your language, music
              style, voice and gender. Use your own authorized voice or let AI
              sing for you.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/create"
                className="rounded-full bg-red-600 px-8 py-4 text-center font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
              >
                Start Creating 🎵
              </Link>

              <a
                href="#how-it-works"
                className="rounded-full border border-zinc-300 px-8 py-4 text-center font-bold text-zinc-900 transition hover:bg-zinc-50"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Hero preview */}
          <div className="mt-20 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-zinc-950 p-8 text-white shadow-2xl">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">iSing WhatsApp</p>
                  <p className="font-bold">Create a song</p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-xl">
                  ♪
                </div>
              </div>

              <div className="rounded-2xl bg-zinc-900 p-5">
                <p className="text-sm text-zinc-400">You</p>
                <p className="mt-2 leading-7">
                  Make me a romantic Swahili Amapiano song for my wife. Female
                  AI voice, emotional and beautiful.
                </p>
              </div>

              <div className="mt-4 rounded-2xl bg-red-600 p-5">
                <p className="text-sm text-red-100">iSing</p>
                <p className="mt-2 leading-7">
                  🎵 Your song is ready. Listen to the preview below.
                </p>

                <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/10 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                    ▶
                  </div>

                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-white/30">
                      <div className="h-2 w-2/5 rounded-full bg-white" />
                    </div>
                  </div>

                  <span className="text-xs">0:28</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-3xl border border-zinc-200 bg-zinc-50 p-8 md:p-12">
              <p className="text-sm font-bold uppercase tracking-widest text-red-600">
                Simple pricing
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight">
                Hear it first.
                <br />
                Pay when you love it.
              </h2>

              <p className="mt-5 leading-7 text-zinc-600">
                Every creation starts with a preview. When you're happy with
                your song, unlock the full audio or turn it into an AI-inspired
                music video.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-sm text-zinc-500">Full Audio</p>
                  <p className="mt-2 text-3xl font-black">$0.50</p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-sm text-zinc-500">AI Video</p>
                  <p className="mt-2 text-3xl font-black">$1.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="font-bold uppercase tracking-widest text-red-600">
              How it works
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Music creation as easy as sending a WhatsApp message.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              [
                "01",
                "Tell iSing what you want",
                "Send your idea through WhatsApp. You can describe the song naturally.",
              ],
              [
                "02",
                "Listen to your preview",
                "iSing creates a sample so you can hear the direction before paying.",
              ],
              [
                "03",
                "Unlock and share",
                "Pay $0.50 for the full audio or $1 for an AI-inspired music video.",
              ],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-3xl border border-zinc-200 p-8"
              >
                <p className="text-sm font-black text-red-600">{number}</p>
                <h3 className="mt-5 text-2xl font-black">{title}</h3>
                <p className="mt-4 leading-7 text-zinc-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="font-bold uppercase tracking-widest text-red-500">
            iSing features
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
            A music studio inside your WhatsApp.
          </h2>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/10"
              >
                <div className="text-4xl">{feature.icon}</div>

                <h3 className="mt-6 text-xl font-black">{feature.title}</h3>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            <p className="font-bold uppercase tracking-widest text-red-600">
              Simple pricing
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Create first. Pay when you're ready.
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-zinc-200 p-8">
              <p className="text-sm font-bold text-zinc-500">AUDIO</p>

              <p className="mt-4 text-5xl font-black">$0.50</p>

              <p className="mt-4 leading-7 text-zinc-600">
                Unlock the complete generated song after listening to your
                preview.
              </p>

              <Link
                href="/create"
                className="mt-8 block rounded-full bg-zinc-950 px-6 py-4 text-center font-bold text-white"
              >
                Create Audio
              </Link>
            </div>

            <div className="rounded-3xl border-2 border-red-600 p-8">
              <p className="text-sm font-bold text-red-600">VIDEO</p>

              <p className="mt-4 text-5xl font-black">$1.00</p>

              <p className="mt-4 leading-7 text-zinc-600">
                Turn your song into an AI-inspired music video ready to share.
              </p>

              <Link
                href="/create"
                className="mt-8 block rounded-full bg-red-600 px-6 py-4 text-center font-bold text-white"
              >
                Create Video
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-600 text-white">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            Your next song starts with an idea.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-red-100">
            Tell iSing what you're imagining and let AI turn it into music.
          </p>

          <Link
            href="/create"
            className="mt-10 inline-block rounded-full bg-white px-8 py-4 font-black text-red-600 transition hover:bg-zinc-100"
          >
            Start Creating 🎵
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} iSing. All rights reserved.
          </p>

          <p>AI music creation through WhatsApp.</p>
        </div>
      </footer>
    </main>
  );
}
