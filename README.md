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

## iSing AI SaaS finish
The web application now uses the `/create` studio as its visual design system across the dashboard, library, voices, videos, payments, pricing, WhatsApp, account and admin areas. The UI uses a consistent SaaS shell, responsive sidebar, command-style topbar, cards, tables, empty states, pricing controls and production-oriented workflows.

## Commercial pricing controls
USD is the control price: audio USD 0.50 and video USD 1.00. Local customer prices are calculated using the saved iSing exchange rate for the detected/selected currency and rounded according to the currency setting. Administrators can adjust iSing rates in `/admin/pricing`. Run `supabase/pricing.sql` in Supabase SQL Editor before enabling database-backed pricing controls.
