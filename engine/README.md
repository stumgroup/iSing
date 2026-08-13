# iSing AI Engine

The production iSing AI music preview currently runs directly inside the Next.js application through `src/lib/ai/inhouse-composer.ts`.

The `engine/neural/` directory contains the proprietary neural research and training foundation. It is intentionally not required for the first deployment because an untrained neural model cannot produce useful music.

When the iSing neural model has been trained, it can be moved into a dedicated inference worker without changing the public iSing API.

## Production rule

There is no ACE-Step, Suno, Udio, or external music-generation dependency in the current music path.
