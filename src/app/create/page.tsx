"use client";

import { useState } from "react";
import Link from "next/link";

const languages = [
  "English",
  "Swahili",
  "French",
  "Spanish",
  "Portuguese",
  "Arabic",
  "Luganda",
  "Kinyarwanda",
  "Lingala",
  "Yoruba",
  "Zulu",
  "Other",
];

const genres = [
  "Amapiano",
  "Afrobeats",
  "Benga",
  "Gospel",
  "R&B",
  "Hip-Hop",
  "Reggae",
  "Dancehall",
  "Pop",
  "Afro House",
  "Traditional",
  "Surprise Me",
];

export default function CreatePage() {
  const [voiceType, setVoiceType] = useState<"ai" | "clone">("ai");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [language, setLanguage] = useState("Swahili");
  const [genre, setGenre] = useState("Amapiano");
  const [prompt, setPrompt] = useState("");

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-3xl font-black">
            i<span className="text-red-600">S</span>ing
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-zinc-500 hover:text-zinc-950"
          >
            ← Home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <div className="text-center">
          <p className="font-bold uppercase tracking-widest text-red-600">
            Create music
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-6xl">
            Tell us what you hear.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-zinc-600">
            Describe your song and choose the language, style and singer.
            iSing will turn your idea into music.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {/* Prompt */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
            <label className="text-lg font-black">What should we create?</label>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Make a romantic Swahili Amapiano song for my wife Sarah. Make it emotional, beautiful and memorable."
              className="mt-4 min-h-40 w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 p-5 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
            />
          </section>

          {/* Language */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
            <h2 className="text-lg font-black">Language</h2>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {languages.map((item) => (
                <button
                  key={item}
                  onClick={() => setLanguage(item)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    language === item
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-zinc-200 hover:border-red-300 hover:bg-red-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* Genre */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
            <h2 className="text-lg font-black">Music style</h2>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {genres.map((item) => (
                <button
                  key={item}
                  onClick={() => setGenre(item)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    genre === item
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-zinc-200 hover:border-red-300 hover:bg-red-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* Voice */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
            <h2 className="text-lg font-black">Singer</h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <button
                onClick={() => setVoiceType("ai")}
                className={`rounded-2xl border p-6 text-left transition ${
                  voiceType === "ai"
                    ? "border-red-600 bg-red-50"
                    : "border-zinc-200 hover:border-red-300"
                }`}
              >
                <div className="text-3xl">🤖</div>

                <h3 className="mt-4 font-black">AI Voice</h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Choose an AI-generated singer for your song.
                </p>
              </button>

              <button
                onClick={() => setVoiceType("clone")}
                className={`rounded-2xl border p-6 text-left transition ${
                  voiceType === "clone"
                    ? "border-red-600 bg-red-50"
                    : "border-zinc-200 hover:border-red-300"
                }`}
              >
                <div className="text-3xl">🎙️</div>

                <h3 className="mt-4 font-black">My Voice</h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Use your own authorized voice profile.
                </p>
              </button>
            </div>

            {voiceType === "ai" && (
              <div className="mt-7">
                <h3 className="font-bold">Voice gender</h3>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setGender("male")}
                    className={`rounded-2xl border px-5 py-4 font-bold ${
                      gender === "male"
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-zinc-200"
                    }`}
                  >
                    👨 Male
                  </button>

                  <button
                    onClick={() => setGender("female")}
                    className={`rounded-2xl border px-5 py-4 font-bold ${
                      gender === "female"
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-zinc-200"
                    }`}
                  >
                    👩 Female
                  </button>
                </div>
              </div>
            )}

            {voiceType === "clone" && (
              <div className="mt-7 rounded-2xl bg-zinc-50 p-5">
                <p className="font-bold">🎙️ Voice profile</p>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Your voice profile will be created after you provide a
                  suitable voice recording and confirm that you own or are
                  authorized to use the voice.
                </p>

                <button className="mt-4 rounded-full bg-zinc-950 px-5 py-3 text-sm font-bold text-white">
                  Add My Voice
                </button>
              </div>
            )}
          </section>

          {/* Summary */}
          <section className="rounded-3xl bg-zinc-950 p-7 text-white shadow-xl">
            <p className="text-sm font-bold uppercase tracking-widest text-red-500">
              Your creation
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-zinc-500">Language</p>
                <p className="mt-1 font-bold">{language}</p>
              </div>

              <div>
                <p className="text-xs text-zinc-500">Style</p>
                <p className="mt-1 font-bold">{genre}</p>
              </div>

              <div>
                <p className="text-xs text-zinc-500">Voice</p>
                <p className="mt-1 font-bold">
                  {voiceType === "ai"
                    ? `AI ${gender === "male" ? "Male" : "Female"}`
                    : "My Voice"}
                </p>
              </div>
            </div>

            <button
              disabled={!prompt.trim()}
              className="mt-8 w-full rounded-full bg-red-600 px-6 py-4 font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Generate Song Preview 🎵
            </button>

            <p className="mt-4 text-center text-xs text-zinc-500">
              Preview first. Pay $0.50 for full audio or $1.00 for an AI video.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
