-- iSing AI pricing and currency controls
create extension if not exists pgcrypto;

create table if not exists public.currency_settings (
  id uuid primary key default gen_random_uuid(),
  currency_code text unique not null,
  currency_name text not null,
  currency_symbol text,
  market_rate numeric(18,6),
  ising_rate numeric(18,6) not null,
  use_custom_rate boolean not null default true,
  rounding_increment numeric(18,6) not null default 5,
  rounding_direction text not null default 'up' check (rounding_direction in ('up','nearest','down')),
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.pricing_products (
  id uuid primary key default gen_random_uuid(),
  product_code text unique not null,
  name text not null,
  base_price_usd numeric(12,4) not null check (base_price_usd >= 0),
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.pricing_products(product_code,name,base_price_usd)
values ('audio','Full Audio',0.50),('video','Full Video',1.00)
on conflict (product_code) do update set name=excluded.name, base_price_usd=excluded.base_price_usd;

insert into public.currency_settings(currency_code,currency_name,currency_symbol,market_rate,ising_rate,rounding_increment)
values
('KES','Kenyan Shilling','KES',129.20,135,5),
('UGX','Ugandan Shilling','UGX',3720,3800,5),
('TZS','Tanzanian Shilling','TZS',2700,2800,5),
('NGN','Nigerian Naira','NGN',1520,1600,5),
('GHS','Ghanaian Cedi','GHS',10.80,11,5)
on conflict(currency_code) do nothing;

alter table public.currency_settings enable row level security;
alter table public.pricing_products enable row level security;

-- Public customers may read active pricing; only server-side/admin credentials should update it.
drop policy if exists "public read active currencies" on public.currency_settings;
create policy "public read active currencies" on public.currency_settings for select using (is_active = true);
drop policy if exists "public read active products" on public.pricing_products;
create policy "public read active products" on public.pricing_products for select using (is_active = true);
