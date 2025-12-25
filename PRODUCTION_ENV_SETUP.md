# Environment Variables Required for Production

## NextAuth Configuration

For NextAuth to work properly in production (on www.sward.lol), you need to set these environment variables in your hosting platform (Vercel/Netlify/etc.):

### Required Variables:

```bash
# NextAuth Secret (CRITICAL for production)
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your-super-secret-random-string-here

# NextAuth URL (your production domain)
NEXTAUTH_URL=https://www.sward.lol

# Database and other existing variables...
DATABASE_URL=your-neon-postgres-url
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
# ... etc
```

## How to Generate NEXTAUTH_SECRET

Run this command in your terminal:

```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET` in production.

## Where to Set These Variables

### If using Vercel:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
4. Redeploy your application

### If using Netlify:

1. Go to Site settings → Build & deploy → Environment
2. Add the variables
3. Trigger a new deploy

### If using other platforms:

Check their documentation for setting environment variables.

## Important Notes

⚠️ **NEXTAUTH_SECRET is CRITICAL** - Without it, NextAuth won't work properly in production and sessions will fail.

⚠️ **Never commit secrets to git** - These should only be set in your hosting platform's environment variables.

✅ After setting these variables, redeploy your application and the login redirect should work properly!
