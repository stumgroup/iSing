create table if not exists public.ising_ai_jobs (
 id uuid primary key default gen_random_uuid(),
 user_id uuid,
 type text not null check (type in ('music','video')),
 status text not null default 'queued' check (status in ('queued','processing','completed','failed')),
 prompt text not null,
 language text, genre text, mood text, gender text, voice_mode text,
 audio_path text, video_path text, preview_path text, error_message text,
 metadata jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(),
 started_at timestamptz, completed_at timestamptz
);
create index if not exists ising_ai_jobs_status_idx on public.ising_ai_jobs(status);
create index if not exists ising_ai_jobs_user_idx on public.ising_ai_jobs(user_id);
alter table public.ising_ai_jobs enable row level security;
