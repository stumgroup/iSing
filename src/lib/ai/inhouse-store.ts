import { Buffer } from "node:buffer";

export type InHouseTask = {
  id: string;
  status: "processing" | "completed" | "failed";
  createdAt: number;
  audio: Buffer;
  duration: number;
  progress: number;
  request: Record<string, unknown>;
};

export const tasks = new Map<string, InHouseTask>();

export function pruneTasks(maxAgeMs = 30 * 60 * 1000) {
  const cutoff = Date.now() - maxAgeMs;
  for (const [id, task] of tasks) {
    if (task.createdAt < cutoff) tasks.delete(id);
  }
}
