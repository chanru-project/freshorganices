# Quick Fix for 401 Errors on Netlify

## ⚡ Fast Solution (2 Steps)

### Step 1: Add Environment Variables in Netlify (REQUIRED)

1. Go to: https://app.netlify.com
2. Select your site
3. Go to: **Site configuration** → **Environment variables**
4. Click **Add variable** and add:

   **Variable 1:**
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://mipblzufysinssqushei.supabase.co`

   **Variable 2:**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcGJsemZ5c3lua3NzcXVzaGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNjIyOTEsImV4cCI6MjA0NjkzODI5MX0.Gq25R6J5xYQF2Oo28wVnKkCp2v7QVg928pNnZlR1hE`

5. Click **Save**
6. Go to **Deploys** tab → **Trigger deploy** → **Clear cache and deploy site**

### Step 2: Fix RLS Policies in Supabase (REQUIRED)

1. Go to: https://app.supabase.com/project/mipblzufysinssqushei/editor
2. Click **SQL Editor** (left sidebar)
3. Click **New query**
4. Copy ALL the code from `supabase/migrations/fix_rls_policies.sql`
5. Paste it in the SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

### Step 3: Test

1. Wait for Netlify to finish deploying (check the Deploys tab)
2. Visit your Netlify site
3. Products should now load! 🎉

## ❌ Still Getting 401?

If you're still seeing 401 errors after both steps:

1. **Check Netlify build logs:**
   - Go to Deploys → Click on the latest deploy → Check build logs
   - Look for any errors about environment variables

2. **Verify RLS policies:**
   - In Supabase, go to **Authentication** → **Policies**
   - Check that policies exist for `categories` and `products` tables

3. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## 📝 Notes

- Environment variables in Netlify are **required** - `.env` files don't work in production
- The RLS policies must be applied in Supabase - they control who can access your data
- After adding env vars, you **must redeploy** for them to take effect

