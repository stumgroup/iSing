import { NextResponse } from "next/server";
import { generateMusic } from "@/lib/ai/music";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.prompt?.trim()) return NextResponse.json({ message: "Prompt is required." }, { status: 400 });

    const result = await generateMusic({
      prompt: body.prompt.trim(),
      language: body.language || "English",
      genre: body.genre || "Afrobeats",
      mood: body.mood || "uplifting",
      gender: body.gender || "male",
      voiceType: body.voiceType || "ai",
      voiceId: body.voiceId,
      durationSeconds: Math.min(Math.max(Number(body.durationSeconds || 60), 30), 180)
    });

    return NextResponse.json({ ok: true, result, message: "iSing AI is creating your song." });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error instanceof Error ? error.message : "Generation failed." }, { status: 500 });
  }
}
