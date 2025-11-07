# 🔑 Fix "Invalid API Key" Error

## The Problem
You're seeing "Invalid API key" error because the Supabase API key in your code/environment variables doesn't match your actual Supabase project.

## ✅ Quick Fix (3 Steps)

### Step 1: Get Your Correct API Key

1. Go to: **https://app.supabase.com/project/mipblzufysinssqushei/settings/api**
2. Find the **API Keys** section
3. Copy the **`anon` `public`** key (NOT the `service_role` key - that's secret!)
4. It should look like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 2: Update Netlify Environment Variables

1. Go to: **https://app.netlify.com**
2. Select your site
3. Go to: **Site configuration** → **Environment variables**
4. Find `VITE_SUPABASE_ANON_KEY`
5. Click **Edit** and paste the correct key you copied in Step 1
6. Click **Save**

### Step 3: Redeploy and Fix RLS

1. In Netlify, go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait for deployment to finish
4. **Also run the RLS fix:**
   - Go to: https://app.supabase.com/project/mipblzufysinssqushei/sql/new
   - Copy ALL code from `COPY_PASTE_RLS_FIX.sql`
   - Paste and click **Run**
5. Refresh your site (Ctrl+Shift+R)

## Verify Your API Key is Correct

The API key should:
- ✅ Start with `eyJ` (it's a JWT token)
- ✅ Be very long (200+ characters)
- ✅ Be labeled as **`anon` `public`** in Supabase
- ❌ NOT be the `service_role` key (that's secret!)

## Still Not Working?

1. **Double-check the key:**
   - Make sure you copied the ENTIRE key (it's very long)
   - No extra spaces before/after
   - It should match exactly what's in Supabase

2. **Check Netlify build logs:**
   - Go to Deploys → Latest deploy → Build log
   - Look for any errors about environment variables

3. **Verify RLS policies are set:**
   - Run the SQL from `COPY_PASTE_RLS_FIX.sql` in Supabase
   - This is required even with correct API key

## After Fixing

Once you update the API key and redeploy:
- ✅ Products should load
- ✅ Categories should load
- ✅ No more "Invalid API key" errors

