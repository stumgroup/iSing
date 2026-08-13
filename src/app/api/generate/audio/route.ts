import { NextResponse } from "next/server";
import { tasks, pruneTasks } from "@/lib/ai/inhouse-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  pruneTasks();

  const taskId = new URL(request.url).searchParams.get("taskId");

  if (!taskId) {
    return NextResponse.json({ error: "taskId is required" }, { status: 400 });
  }

  const task = tasks.get(taskId);

  if (!task) {
    return NextResponse.json(
      { error: "Audio task not found. Generate a new preview." },
      { status: 404 }
    );
  }

  if (task.status === "failed") {
    return NextResponse.json(
      { error: "iSing AI failed to create the audio." },
      { status: 500 }
    );
  }

  if (task.status !== "completed") {
    return NextResponse.json(
      { error: "Audio is still being composed." },
      { status: 409 }
    );
  }

  return new NextResponse(new Uint8Array(task.audio), {
    status: 200,
    headers: {
      "Content-Type": "audio/wav",
      "Content-Length": String(task.audio.length),
      "Content-Disposition": `inline; filename="ising-ai-${task.id}.wav"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
