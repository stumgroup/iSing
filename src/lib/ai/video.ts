export async function generateVideo(input: {
  songId: string;
  audioUrl: string;
  prompt?: string;
}) {
  const engineUrl = process.env.ISING_ENGINE_URL;
  const engineKey = process.env.ISING_ENGINE_API_KEY;
  if (!engineUrl) throw new Error("ISING_ENGINE_URL is not configured.");

  const response = await fetch(`${engineUrl.replace(/\/$/, "")}/v1/video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(engineKey ? { Authorization: `Bearer ${engineKey}` } : {})
    },
    body: JSON.stringify(input),
    cache: "no-store"
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.detail || data?.error || "iSing AI engine rejected the video request.");
  return data;
}
