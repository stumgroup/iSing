-- iSing database
create extension if not exists "pgcrypto";

create type public.user_role as enum ('user','creator','business','admin');
create type public.voice_type as enum ('ai','clone');
create type public.job_type as enum ('music_preview','music_full','voice_clone','video');
create type public.job_status as enum ('queued','processing','completed','failed','cancelled');
create type public.order_product as enum ('audio','video');
create type public.order_status as enum ('pending','paid','failed','refunded');
create type public.payment_method as enum ('mobile_money','card','wallet','other');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text unique,
  country text,
  role public.user_role not null default 'user',
  credits numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.voices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  type public.voice_type not null,
  gender text check (gender in ('male','female')),
  language text,
  provider text,
  provider_voice_id text,
  sample_path text,
  consent_confirmed boolean not null default false,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.songs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  title text not null default 'Untitled Song',
  prompt text not null,
  lyrics text,
  language text not null default 'English',
  genre text not null default 'Afrobeats',
  mood text,
  gender text check (gender in ('male','female')),
  voice_type public.voice_type not null default 'ai',
  voice_id uuid references public.voices(id) on delete set null,
  preview_path text,
  full_audio_path text,
  duration_seconds integer,
  status public.job_status not null default 'queued',
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.videos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  song_id uuid not null references public.songs(id) on delete cascade,
  prompt text,
  preview_path text,
  full_video_path text,
  provider text,
  provider_job_id text,
  status public.job_status not null default 'queued',
  created_at timestamptz not null default now()
);

create table public.ai_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  song_id uuid references public.songs(id) on delete cascade,
  video_id uuid references public.videos(id) on delete cascade,
  voice_id uuid references public.voices(id) on delete cascade,
  type public.job_type not null,
  provider text,
  provider_job_id text,
  status public.job_status not null default 'queued',
  input jsonb,
  output jsonb,
  error_message text,
  estimated_cost numeric(12,4) default 0,
  actual_cost numeric(12,4) default 0,
  created_at timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  song_id uuid references public.songs(id) on delete set null,
  video_id uuid references public.videos(id) on delete set null,
  product public.order_product not null,
  amount numeric(12,2) not null,
  currency text not null default 'USD',
  status public.order_status not null default 'pending',
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  method public.payment_method not null,
  provider text,
  provider_reference text,
  amount numeric(12,2) not null,
  currency text not null,
  status public.order_status not null default 'pending',
  raw_response jsonb,
  created_at timestamptz not null default now()
);

create table public.whatsapp_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  wa_id text unique not null,
  phone text,
  name text,
  country text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz
);

create table public.whatsapp_messages (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references public.whatsapp_contacts(id) on delete cascade,
  direction text not null check (direction in ('inbound','outbound')),
  message_id text,
  message_type text,
  body text,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references public.profiles(id) on delete cascade,
  referred_id uuid references public.profiles(id) on delete set null,
  code text unique not null,
  reward_credits numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table public.downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  song_id uuid references public.songs(id) on delete set null,
  video_id uuid references public.videos(id) on delete set null,
  asset_type text check (asset_type in ('audio','video')),
  created_at timestamptz not null default now()
);

create table public.provider_costs (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  service text not null,
  job_id uuid references public.ai_jobs(id) on delete set null,
  cost numeric(12,4) not null default 0,
  currency text not null default 'USD',
  created_at timestamptz not null default now()
);

create index songs_user_idx on public.songs(user_id);
create index voices_user_idx on public.voices(user_id);
create index orders_user_idx on public.orders(user_id);
create index jobs_status_idx on public.ai_jobs(status);
create index whatsapp_wa_idx on public.whatsapp_contacts(wa_id);

alter table public.profiles enable row level security;
alter table public.voices enable row level security;
alter table public.songs enable row level security;
alter table public.videos enable row level security;
alter table public.ai_jobs enable row level security;
alter table public.orders enable row level security;
alter table public.payments enable row level security;
alter table public.whatsapp_contacts enable row level security;
alter table public.whatsapp_messages enable row level security;
alter table public.referrals enable row level security;
alter table public.downloads enable row level security;

create policy "profiles own read" on public.profiles for select using (auth.uid() = id);
create policy "profiles own update" on public.profiles for update using (auth.uid() = id);

create policy "voices own all" on public.voices for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "songs own all" on public.songs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "videos own all" on public.videos for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "jobs own read" on public.ai_jobs for select using (auth.uid() = user_id);
create policy "orders own read" on public.orders for select using (auth.uid() = user_id);
create policy "payments own read" on public.payments for select using (auth.uid() = user_id);
create policy "contacts own read" on public.whatsapp_contacts for select using (auth.uid() = user_id);
create policy "downloads own read" on public.downloads for select using (auth.uid() = user_id);
create policy "referrals own read" on public.referrals for select using (auth.uid() = referrer_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''), new.phone)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

insert into storage.buckets (id, name, public) values
('audio-previews','audio-previews',true),
('songs','songs',false),
('voices','voices',false),
('videos','videos',false)
on conflict (id) do nothing;

-- iSing AI engine metadata
alter table public.songs add column if not exists share_token text;
alter table public.songs add column if not exists play_count bigint not null default 0;
alter table public.songs add column if not exists share_count bigint not null default 0;
alter table public.songs add column if not exists download_count bigint not null default 0;
alter table public.songs add column if not exists preview_ready boolean not null default false;
alter table public.songs add column if not exists audio_unlocked boolean not null default false;
alter table public.songs add column if not exists video_unlocked boolean not null default false;
create unique index if not exists songs_share_token_idx on public.songs(share_token);
