export type MusicRequest = {
  prompt: string;
  language: string;
  genre: string;
  mood?: string;
  gender: "male" | "female";
  voiceType: "ai" | "clone";
  voiceId?: string;
  durationSeconds?: number;
};

export type GenerationResult = {
  providerJobId: string;
  previewUrl?: string;
  fullUrl?: string;
  status: "queued" | "processing" | "completed" | "failed";
};
