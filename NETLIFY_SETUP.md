# Netlify Deployment Setup - Fix 401 Errors

The 401 errors on Netlify are caused by missing environment variables. Netlify doesn't use `.env` files - you need to configure environment variables in the Netlify dashboard.

## Step 1: Add Environment Variables in Netlify

1. **Go to your Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Select your site

2. **Navigate to Site Settings**
   - Click on your site name
   - Go to **Site configuration** → **Environment variables**

3. **Add the following environment variables:**

   ```
   VITE_SUPABASE_URL = https://mipblzufysinssqushei.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcGJsemZ5c3lua3NzcXVzaGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNjIyOTEsImV4cCI6MjA0NjkzODI5MX0.Gq25R6J5xYQF2Oo28wVnKkCp2v7QVg928pNnZlR1hE
   ```

4. **Save the variables**

5. **Redeploy your site**
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Clear cache and deploy site**

## Step 2: Fix RLS Policies in Supabase

Even with correct environment variables, you still need to fix the RLS policies:

1. Go to: https://app.supabase.com/project/mipblzufysinssqushei
2. Navigate to **SQL Editor**
3. Run the SQL from `supabase/migrations/fix_rls_policies.sql`
4. This will allow public access to your tables

## Step 3: Verify the Fix

After redeploying:
1. Clear your browser cache
2. Visit your Netlify site
3. Open browser DevTools (F12) → Console tab
4. Check if products load without 401 errors

## Alternative: Use netlify.toml (Optional)

If you prefer, you can also create a `netlify.toml` file, but environment variables in the dashboard are more secure.

## Important Notes

- **Never commit your `.env` file** - it's already in `.gitignore`
- **The anon key is safe to expose** - it's designed for client-side use
- **RLS policies protect your data** - even with the anon key, users can only do what RLS allows

