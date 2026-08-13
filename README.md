# iSing

iSing is a WhatsApp-first AI music creation platform.

## Stack

- Next.js + TypeScript
- Supabase PostgreSQL/Auth/Storage
- Render
- WhatsApp Business API
- Pluggable AI music, voice and video providers
- Pluggable mobile-money/card payment providers

## MVP flow

WhatsApp prompt -> structured music job -> preview -> $0.50 audio payment -> full audio -> optional $1.00 AI video.

## Important

The repository contains the complete application foundation, pages, database schema, API contracts and provider adapters. Real generation/payment/WhatsApp delivery requires provider credentials in Render environment variables.

## Deploy

1. Push this repository to GitHub.
2. Create a Render Web Service from the repository.
3. Build: `npm install && npm run build`
4. Start: `npm start`
5. Add `.env.example` variables in Render.
6. Run `supabase/schema.sql` in the Supabase SQL editor.
