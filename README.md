# iSing AI

iSing AI is a WhatsApp-first creative platform for making original music and AI-inspired video.

## Deployment-safe music generation

The current music preview path is **100% in-house and local to the Next.js server**. It does not call ACE-Step, Suno, Udio, Replicate, Fal, or another external music-generation API.

Flow:

```text
Browser / WhatsApp
        ↓
/api/generate
        ↓
iSing AI Composer
        ↓
local synthesis
        ↓
WAV preview
```

The preview composer is deliberately lightweight so it can run on a normal Render Node service without a GPU. It creates deterministic arrangements from the prompt, language, genre and mood, including Amapiano and Kenyan Benga-inspired patterns.

### Important

This is **iSing AI v1**, not a claim of Suno/Udio-quality neural audio. The repository also contains a neural research/training foundation under `engine/neural/`, but those weights are not trained production weights. A true neural music model requires a licensed dataset, training compute and a separate inference architecture.

## Local generation API

`POST /api/generate`

Example:

```json
{
  "prompt": "A joyful Swahili birthday song with Kenyan Benga guitar and Amapiano log drums",
  "language": "Swahili",
  "genre": "Amapiano",
  "mood": "Happy",
  "gender": "male",
  "voiceType": "ai",
  "durationSeconds": 30
}
```

The response contains a `taskId`. Poll:

```text
GET /api/generate/status?taskId=...
```

When complete, the response includes:

```text
/api/generate/audio?taskId=...
```

## Render

Use:

```text
Build: npm install && npm run build
Start: npm start
```

No AI engine URL or AI provider API key is required for local music preview generation.

Supabase, WhatsApp and payment environment variables are only needed for the corresponding platform features.

## Supabase

Run the SQL in `supabase/schema.sql` before enabling database-backed features.

## Product direction

iSing AI is being developed toward:

- in-house neural music generation
- authorized voice cloning
- multilingual African and international singing
- AI-inspired music video generation
- WhatsApp creation
- free previews
- $0.50 full audio unlock
- $1.00 video unlock
