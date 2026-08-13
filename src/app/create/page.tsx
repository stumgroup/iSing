"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Play, Music2, Mic2, Globe2, Wand2, Loader2 } from "lucide-react";
import { LANGUAGES, GENRES } from "@/lib/constants";

const moods = ["Happy", "Romantic", "Energetic", "Chill", "Gospel", "Celebration"];

export default function CreatePage() {
  const [form, setForm] = useState({
    prompt: "",
    language: "Swahili",
    genre: "Amapiano",
    mood: "Happy",
    gender: "male",
    voiceType: "ai",
    durationSeconds: 30,
  });
  const [status, setStatus] = useState("");
  const [taskId, setTaskId] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!form.prompt.trim()) {
      setStatus("Start with a song idea.");
      return;
    }

    setBusy(true);
    setAudioUrl("");
    setTaskId("");
    setStatus("iSing AI is composing your preview…");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || data.error || "Generation failed.");
      }

      // /api/generate returns taskId directly.
      const id = data.taskId || data.providerJobId;

      if (!id) {
        throw new Error("iSing AI did not return a generation task.");
      }

      setTaskId(id);

      for (let i = 0; i < 120; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const statusResponse = await fetch(
          `/api/generate/status?taskId=${encodeURIComponent(id)}`,
          { cache: "no-store" }
        );
        const statusData = await statusResponse.json();

        if (statusData.status === "completed") {
          setAudioUrl(statusData.audioUrl);
          setStatus("Your iSing AI preview is ready.");
          setBusy(false);
          return;
        }

        if (statusData.status === "failed") {
          throw new Error(statusData.error || "iSing AI could not complete the song.");
        }

        const progress =
          typeof statusData.progress === "number"
            ? ` ${Math.round(statusData.progress * 100)}%`
            : "";
        setStatus(`iSing AI is composing…${progress}`);
      }

      throw new Error("Generation is taking longer than expected. Please try again.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Generation failed.");
      setBusy(false);
    }
  }

  return (
    <main className="workspace-shell min-h-screen">
      <header className="workspace-header">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="brand">
            <span className="brand-mark">i</span>Sing <span className="brand-ai">AI</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <Link href="/dashboard" className="nav-link">Projects</Link>
            <Link href="/songs" className="nav-link">My Music</Link>
            <Link href="/videos" className="nav-link">Videos</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
          </nav>
          <Link href="/dashboard" className="dark-pill">Dashboard</Link>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-7 lg:grid-cols-[230px_1fr] lg:px-8">
        <aside className="hidden rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm lg:block">
          <p className="px-3 pb-4 text-[11px] font-black uppercase tracking-[0.18em] text-zinc-400">Create</p>
          {[
            ["✦", "Song", true],
            ["◌", "Voice", false],
            ["▣", "Video", false],
          ].map(([icon, label, active]) => (
            <div key={String(label)} className={`side-item ${active ? "side-item-active" : ""}`}>
              <span>{icon}</span>{label}
            </div>
          ))}
          <div className="my-5 border-t border-zinc-100" />
          <Link href="/help" className="side-item"><span>?</span> Help</Link>
        </aside>

        <section>
          <div className="mb-6">
            <p className="eyebrow"><Sparkles size={14} /> iSing AI Studio</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-zinc-950 md:text-5xl">
              Turn an idea into a song.
            </h1>
            <p className="mt-3 max-w-2xl text-zinc-500">
              Describe the sound, choose the language and singer, then hear a free iSing AI preview.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_330px]">
            <div className="space-y-5">
              <section className="editor-card">
                <div className="card-title"><Music2 size={18} /> Song idea</div>
                <textarea
                  value={form.prompt}
                  onChange={(e) => setForm({ ...form, prompt: e.target.value })}
                  className="prompt-editor"
                  placeholder="A joyful Swahili birthday song for Mary, with warm Kenyan Benga guitar, Amapiano log drums and a catchy chorus…"
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Birthday song", "Love song", "Wedding", "Celebration"].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setForm({ ...form, prompt: suggestion })}
                      className="chip"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </section>

              <section className="editor-card">
                <div className="card-title"><Globe2 size={18} /> Language</div>
                <div className="choice-grid">
                  {LANGUAGES.map((item) => (
                    <button key={item} type="button" onClick={() => setForm({ ...form, language: item })} className={`choice ${form.language === item ? "choice-selected" : ""}`}>
                      {item}
                    </button>
                  ))}
                </div>
              </section>

              <section className="editor-card">
                <div className="card-title"><Wand2 size={18} /> Sound & mood</div>
                <p className="field-label">Genre</p>
                <div className="choice-grid">
                  {GENRES.map((item) => (
                    <button key={item} type="button" onClick={() => setForm({ ...form, genre: item })} className={`choice ${form.genre === item ? "choice-selected" : ""}`}>
                      {item}
                    </button>
                  ))}
                </div>
                <p className="field-label mt-5">Mood</p>
                <div className="flex flex-wrap gap-2">
                  {moods.map((item) => (
                    <button key={item} type="button" onClick={() => setForm({ ...form, mood: item })} className={`chip ${form.mood === item ? "chip-selected" : ""}`}>
                      {item}
                    </button>
                  ))}
                </div>
              </section>

              <section className="editor-card">
                <div className="card-title"><Mic2 size={18} /> Singer</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button type="button" onClick={() => setForm({ ...form, voiceType: "ai" })} className={`voice-card ${form.voiceType === "ai" ? "voice-selected" : ""}`}>
                    <span className="voice-icon">AI</span>
                    <span><b>iSing AI Voice</b><small>Choose a male or female singer</small></span>
                  </button>
                  <button type="button" onClick={() => setForm({ ...form, voiceType: "clone" })} className={`voice-card ${form.voiceType === "clone" ? "voice-selected" : ""}`}>
                    <span className="voice-icon">MY</span>
                    <span><b>My Voice</b><small>Use your authorized voice profile</small></span>
                  </button>
                </div>
                <div className="mt-4 flex gap-2">
                  {["male", "female"].map((item) => (
                    <button key={item} type="button" onClick={() => setForm({ ...form, gender: item })} className={`choice flex-1 ${form.gender === item ? "choice-selected" : ""}`}>
                      {item === "male" ? "Male" : "Female"}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <aside className="xl:sticky xl:top-6 xl:h-fit">
              <section className="preview-card">
                <div className="flex items-center justify-between">
                  <span className="preview-label">FREE PREVIEW</span>
                  <span className="live-dot">● Ready</span>
                </div>
                <div className="cover-art">
                  <div className="cover-orbit" />
                  <div className="cover-center"><Music2 size={32} /></div>
                  <span>{form.genre}</span>
                </div>
                <h2 className="mt-5 text-xl font-black">{form.genre} · {form.language}</h2>
                <p className="mt-1 text-sm text-zinc-500">{form.mood} · {form.gender} · {form.durationSeconds}s preview</p>
                <button type="button" disabled={busy} onClick={submit} className="generate-button">
                  {busy ? <><Loader2 className="animate-spin" size={18} /> Composing…</> : <><Sparkles size={18} /> Generate with iSing AI</>}
                </button>
                {status && <p className="mt-4 text-center text-xs font-semibold text-zinc-500">{status}</p>}
                {taskId && <p className="mt-2 truncate text-center text-[10px] text-zinc-300">Task {taskId}</p>}
                {audioUrl && (
                  <div className="audio-panel">
                    <div className="flex items-center gap-2 text-sm font-bold"><Play size={15} fill="currentColor" /> Preview ready</div>
                    <audio controls src={audioUrl} className="mt-3 w-full" />
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link href="/payments" className="unlock-button">Audio · $0.50</Link>
                      <Link href="/videos" className="outline-button">Video · $1</Link>
                    </div>
                  </div>
                )}
                <p className="mt-4 text-center text-[11px] text-zinc-400">Preview free · Full audio $0.50 · Video $1.00</p>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
