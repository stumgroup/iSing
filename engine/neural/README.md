# iSing AI Neural Research

This directory is the beginning of iSing AI's proprietary neural music research stack.

It is **not** used by the production preview endpoint yet. The production endpoint uses the lightweight in-house iSing AI Composer so a normal Render Node service can generate an actual WAV preview without an external model.

The neural path is:

```text
licensed audio dataset
        ↓
audio codec / tokenizer
        ↓
iSing Music Transformer
        ↓
music tokens
        ↓
neural audio decoder
        ↓
song audio
```

The included Transformer is an experimental architecture and must be trained on appropriately licensed data before it can be used for production inference. Do not represent the untrained weights as Suno/Udio-equivalent.
