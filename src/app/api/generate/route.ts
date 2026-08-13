import { NextResponse } from "next/server";
import { generateMusic } from "@/lib/ai/music";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.prompt) return NextResponse.json({ message: "Prompt is required." }, { status: 400 });
    const result = await generateMusic({
      prompt: body.prompt,
      language: body.language || "English",
      genre: body.genre || "Afrobeats",
      gender: body.gender || "male",
      voiceType: body.voiceType || "ai",
      voiceId: body.voiceId
    });
    return NextResponse.json({ ok: true, result, message: result.status === "queued" ? "Your preview job has been queued." : "Generation started." });
  } catch (error) {
    return NextResponse.json({ ok:false, message: error instanceof Error ? error.message : "Generation failed." }, { status:500 });
  }
}
