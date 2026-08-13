import { GenerationResult, MusicRequest } from "./types";

export async function generateMusic(request: MusicRequest): Promise<GenerationResult> {
  const provider = process.env.MUSIC_PROVIDER;
  const apiKey = process.env.MUSIC_PROVIDER_API_KEY;

  if (!provider || !apiKey) {
    return {
      providerJobId: `demo_${Date.now()}`,
      status: "queued"
    };
  }

  // Provider-specific implementation belongs here.
  // Keep this adapter isolated so the provider can be replaced later.
  throw new Error(`Music provider "${provider}" is configured but its adapter is not implemented yet.`);
}
