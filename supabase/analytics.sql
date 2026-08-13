-- Run this migration if your existing Supabase database already has schema.sql applied.
create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  event text not null check (event in ('landing_view','create_started','prompt_submitted','preview_played','share_clicked','pricing_viewed')),
  path text,
  country text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists analytics_events_event_idx on public.analytics_events(event, created_at desc);
create index if not exists analytics_events_created_idx on public.analytics_events(created_at desc);
alter table public.analytics_events enable row level security;
