# iSing AI

**iSing AI** is a self-generating creative platform served through **WhatsApp and the Website**.

## Core architecture

Music AI + Voice AI + Video AI -> iSing AI Core -> WhatsApp / Website -> Supabase -> Payments & Storage.

The repository does not depend on ACE-Step, Suno, Udio, or another external generation API for orchestration.

### Important
The neural models themselves require properly licensed training data and GPU inference infrastructure. The web app must not claim a completed neural generation until a trained inference worker is deployed. The current API provides a stable iSing AI job contract so the trained workers can be connected without changing WhatsApp or the website.

## Build
`npm install && npm run build`

## Start
`npm start`
