import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const taskId = url.searchParams.get("taskId");
  if (!taskId) return NextResponse.json({ error: "taskId is required" }, { status: 400 });

  const engineUrl = process.env.ISING_ENGINE_URL;
  const engineKey = process.env.ISING_ENGINE_API_KEY;
  if (!engineUrl) return NextResponse.json({ error: "ISING_ENGINE_URL is not configured." }, { status: 500 });

  const response = await fetch(`${engineUrl.replace(/\/$/, "")}/v1/tasks/${encodeURIComponent(taskId)}`, {
    headers: engineKey ? { Authorization: `Bearer ${engineKey}` } : {},
    cache: "no-store"
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
