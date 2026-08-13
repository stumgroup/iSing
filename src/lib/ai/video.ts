export async function generateVideo(input: {
  songId: string;
  audioUrl: string;
  prompt?: string;
}) {
  const provider = process.env.VIDEO_PROVIDER;
  const apiKey = process.env.VIDEO_PROVIDER_API_KEY;

  if (!provider || !apiKey) return { providerJobId: `demo_video_${Date.now()}`, status: "queued" as const };
  throw new Error(`Video provider "${provider}" is configured but its adapter is not implemented yet.`);
}
