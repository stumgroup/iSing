# iSing — AI Music & Video Platform

Create original music through the web or WhatsApp, listen to a free preview, then unlock full audio for $0.50 or AI music video for $1.00.

## Architecture

- Next.js app: `src/`
- Supabase: `supabase/schema.sql`
- Self-hosted AI engine: `engine/`
- Music engine: ACE-Step 1.5
- Video engine: LTX-2 audio-to-video
- Render: web/API layer
- GPU host: `engine/` Docker service

The AI engine is intentionally separated from the Node web service because practical inference requires GPU resources. The engine source is part of this repository, so iSing controls the orchestration and can later replace/fine-tune the underlying models.

## Current generation flow

1. User submits a prompt.
2. iSing sends it to the self-hosted AI engine.
3. ACE-Step creates the music asynchronously.
4. iSing polls the task until completion.
5. Audio is returned to the iSing UI.
6. A video task sends the finished audio to LTX-2's audio-to-video pipeline.

## Deployment

Keep the Next.js app on Render. Build `engine/` as a Docker GPU service on a GPU-capable host. Then set `ISING_ENGINE_URL` and `ISING_ENGINE_API_KEY` in Render.
