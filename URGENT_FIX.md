# 🚨 URGENT: Fix 401 Errors - Products Not Loading

## The Problem
Your products are not loading because **Row Level Security (RLS) policies** are not configured in Supabase. This is a 2-minute fix!

## ✅ Quick Fix (Do This Now)

### Step 1: Open Supabase SQL Editor
Click this link: https://app.supabase.com/project/mipblzufysinssqushei/sql/new

### Step 2: Copy the SQL Script
1. Open the file `COPY_PASTE_RLS_FIX.sql` in this project
2. Copy **ALL** the code from that file (Ctrl+A, Ctrl+C)

### Step 3: Paste and Run
1. Paste the code into the Supabase SQL Editor
2. Click **Run** button (or press Ctrl+Enter)
3. You should see: "Success. No rows returned"

### Step 4: Refresh Your Site
1. Go back to your Netlify site
2. Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
3. Products should now load! 🎉

## What This Does
This script creates security policies that allow:
- ✅ Anyone to **read** products and categories (for your store)
- ✅ Anyone to **create** orders and feedback (for checkout)

## Still Not Working?

### Check Netlify Environment Variables
1. Go to: https://app.netlify.com
2. Select your site → **Site configuration** → **Environment variables**
3. Make sure these exist:
   - `VITE_SUPABASE_URL` = `https://mipblzufysinssqushei.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcGJsemZ5c3lua3NzcXVzaGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNjIyOTEsImV4cCI6MjA0NjkzODI5MX0.Gq25R6J5xYQF2Oo28wVnKkCp2v7QVg928pNnZlR1hE`
4. If they don't exist, add them and **redeploy** your site

## Need Help?
The error message on your site now shows exactly what to do. Just follow the steps!

