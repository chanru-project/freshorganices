# 🔑 How to Get Your Supabase API Key

## Step-by-Step Guide

### Step 1: Open Supabase Dashboard
Go to: **https://app.supabase.com/project/mipblzufysinssqushei/settings/api**

### Step 2: Find the API Keys Section
You'll see a section called **"API Keys"** with two keys:
- `anon` `public` ← **USE THIS ONE**
- `service_role` `secret` ← **DO NOT USE THIS** (it's secret!)

### Step 3: Copy the Anon Public Key
1. Find the key labeled **`anon` `public`**
2. Click the **copy icon** (📋) next to it
3. The key should be very long (200+ characters) and start with `eyJ`

### Step 4: Use This Key
- **For local development:** Paste it in your `.env` file as `VITE_SUPABASE_ANON_KEY`
- **For Netlify:** Add it as an environment variable `VITE_SUPABASE_ANON_KEY` in Netlify dashboard

## What the Key Looks Like
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcGJsemZ5c3lua3NzcXVzaGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNjIyOTEsImV4cCI6MjA0NjkzODI5MX0.Gq25R6J5xYQF2Oo28wVnKkCp2v7QVg928pNnZlR1hE
```

## Important Notes
- ✅ The `anon` `public` key is safe to use in frontend code
- ✅ It's designed to be exposed in client-side applications
- ❌ Never use the `service_role` key in frontend code (it's secret!)
- ✅ The key should match your project: `mipblzufysinssqushei`

## If Your Key Doesn't Work
1. Make sure you copied the ENTIRE key (it's very long)
2. Check for extra spaces before/after
3. Verify it's the `anon` `public` key, not `service_role`
4. Make sure it matches your project URL: `mipblzufysinssqushei.supabase.co`

