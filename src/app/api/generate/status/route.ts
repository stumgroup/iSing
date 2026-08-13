import { NextResponse } from "next/server";
import { pruneTasks, tasks } from "@/lib/ai/inhouse-store";

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
      {
        status: "failed",
        error: "iSing task not found. Start a new generation.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: task.status,
    progress: task.progress,
    taskId: task.id,
    audioUrl:
      task.status === "completed"
        ? `/api/generate/audio?taskId=${encodeURIComponent(task.id)}`
        : undefined,
    error:
      task.status === "failed"
        ? "iSing AI could not complete the generation."
        : undefined,
  });
}
