export async function createVoiceProfile(input: {
  userId: string;
  audioUrl: string;
  gender?: "male" | "female";
}) {
  const provider = process.env.VOICE_PROVIDER;
  const apiKey = process.env.VOICE_PROVIDER_API_KEY;

  if (!provider || !apiKey) return { providerVoiceId: `demo_voice_${Date.now()}`, status: "pending" as const };
  throw new Error(`Voice provider "${provider}" is configured but its adapter is not implemented yet.`);
}
