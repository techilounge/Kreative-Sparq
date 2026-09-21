-- Leads captured by the contact form and the project brief.
--
-- Row-level security is enabled with no policy granting access to the anon or
-- authenticated roles. That is deliberate: the only client that writes here is
-- server code holding the secret key, which bypasses row-level security. With
-- the table locked down this way, a leaked publishable key still cannot read a
-- single inquiry.

create extension if not exists "pgcrypto";

create type public.lead_kind as enum ('contact', 'project');

create table public.leads (
  id uuid primary key default gen_random_uuid(),

  -- Shown to the visitor on the thank-you page so they can quote it. Not a
  -- secret, and not derived from anything about the person.
  public_reference text not null unique,

  kind public.lead_kind not null,

  -- Contact details.
  name text not null,
  email text not null,
  phone text,
  company text,
  role text,
  website_url text,

  -- Contact form only.
  service text,
  message text,

  -- Project brief only.
  service_interests text[],
  goal text,
  desired_start text,
  target_date text,
  budget_band text,
  decision_makers text,

  -- Consent is recorded as given, with the moment it was given.
  consent boolean not null default false,
  marketing_consent boolean not null default false,

  -- Attribution. Referrer is reduced to an origin before it is sent, so a
  -- full URL from another site is never stored.
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer_origin text,
  landing_path text,

  created_at timestamptz not null default now()
);

comment on table public.leads is
  'Inquiries from the website. Server-only: no role has a policy on this table.';

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_kind_created_at_idx on public.leads (kind, created_at desc);

alter table public.leads enable row level security;

-- Forcing RLS applies it to the table owner as well, so nothing but a
-- service-role connection can read or write.
alter table public.leads force row level security;

-- No policies are created on purpose. Adding one that grants the anon role
-- select would expose every inquiry to anyone holding the publishable key.

revoke all on public.leads from anon, authenticated;
