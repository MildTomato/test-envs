# Sensitive Environment Variables

These variables contain secrets and must never be hardcoded in config files.
Store them in your secret manager (e.g. Supabase Vault, Vercel environment variables, or `.env.local`).

## `SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET`

The OAuth client secret for GitHub authentication. Generated when you create a GitHub OAuth App at https://github.com/settings/developers.

- **Used in:** `auth.external.github.secret`
- **Where to get it:** GitHub OAuth App settings > Client secrets

## `SMTP_PASS`

The password or API key used to authenticate with your SMTP provider when sending emails (e.g. password reset, email confirmation).

- **Used in:** `smtp.pass`
- **Where to get it:** Your email provider dashboard (e.g. SendGrid API key, Postmark server token)
