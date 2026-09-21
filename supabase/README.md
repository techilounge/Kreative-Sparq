# Supabase

The `leads` table stores inquiries from the contact form and the project
brief. It is one table, written by server code only.

## Applying the migration

With the Supabase CLI:

```bash
supabase db push
```

Or paste `migrations/0001_leads.sql` into the SQL editor in the dashboard.

## Keys

Two environment variables are involved and the difference between them
matters:

- `NEXT_PUBLIC_SUPABASE_URL` is the project URL. It reaches the browser, which
  is harmless.
- `SUPABASE_SECRET_KEY` is the service-role key. It is read only by
  `lib/lead-store`, which is marked `server-only`, and must never be given a
  `NEXT_PUBLIC_` name.

## Why there are no policies

Row-level security is enabled and forced, and no policy is created. The
service-role key bypasses row-level security, so the server can insert; every
other role can do nothing. A leaked publishable key therefore cannot read an
inquiry.

If you later want to read leads from a dashboard, add a policy scoped to an
authenticated staff role. Do not add one for `anon`.

## Retention

Nothing here expires on its own. Once a retention period is agreed, add a
scheduled job that deletes rows past it, and record the period in
`LEGAL_PRIVACY_RETENTION` so the privacy policy states the same thing the
database does.
