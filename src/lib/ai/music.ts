import { MusicRequest, GenerationResult } from "./types";

export async function generateMusic(request: MusicRequest): Promise<GenerationResult> {
  const response = await fetch(new URL("/api/generate/inhouse", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "iSing in-house engine failed.");
  return data;
}
