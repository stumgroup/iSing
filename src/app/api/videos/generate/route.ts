import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateVideo } from "@/lib/ai/video";

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase server configuration is missing.");
  return createClient(url, key);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.songId) return NextResponse.json({ error: "songId is required" }, { status: 400 });

    const supabase = admin();
    const { data: song, error } = await supabase.from("songs").select("*").eq("id", body.songId).single();
    if (error || !song?.full_audio_path) return NextResponse.json({ error: "Completed song audio is required before creating a video." }, { status: 400 });

    const { data: signed, error: signedError } = await supabase.storage.from("songs").createSignedUrl(song.full_audio_path, 3600);
    if (signedError || !signed?.signedUrl) throw new Error("Could not create audio URL for the video engine.");

    const { data: video, error: videoError } = await supabase.from("videos").insert({
      user_id: song.user_id,
      song_id: song.id,
      prompt: body.prompt || song.prompt,
      provider: "ising-local-engine",
      status: "processing"
    }).select().single();
    if (videoError) throw videoError;

    const result = await generateVideo({ songId: song.id, audioUrl: signed.signedUrl, prompt: body.prompt || song.prompt });

    await supabase.from("videos").update({ provider_job_id: result.taskId }).eq("id", video.id);
    await supabase.from("ai_jobs").insert({ user_id: song.user_id, song_id: song.id, video_id: video.id, type: "video", provider: "ising-local-engine", provider_job_id: result.taskId, status: "processing", input: body });

    return NextResponse.json({ ok: true, videoId: video.id, taskId: result.taskId, status: "processing" });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Video generation failed." }, { status: 500 });
  }
}
