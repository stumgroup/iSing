# iSing AI Engine

Self-hosted GPU engine for iSing. It bundles the integration layer for ACE-Step 1.5 music generation and LTX-2 audio-to-video generation. The Next.js application talks only to this service.

## Important

The AI models are open-source/self-hostable, but model weights are large and GPU compute is not free. Do not run this service on the normal Render Node web service. Run this Docker image on a CUDA GPU host.

ACE-Step 1.5 automatically downloads its models on first start. LTX-2 weights must be downloaded separately and configured through environment variables.

Required environment variables:

- `ISING_ENGINE_API_KEY`
- `ACESTEP_API_KEY`
- `LTX_CHECKPOINT_PATH`
- `LTX_DISTILLED_LORA_PATH`
- `LTX_UPSAMPLER_PATH`
- `LTX_GEMMA_ROOT`

The main iSing Render service needs:

- `ISING_ENGINE_URL=https://your-gpu-engine.example.com`
- `ISING_ENGINE_API_KEY=<same secret>`

## API

- `GET /health`
- `POST /v1/music`
- `POST /v1/video`
- `GET /v1/tasks/{taskId}`
- `GET /v1/files/{name}`
