# 🚀 Step-by-Step: Fix Netlify Connection Error

Follow these steps **exactly** to fix the "Invalid API key" error on Netlify.

## ⚠️ IMPORTANT: Do BOTH Steps

You need to do **TWO things**:
1. Set environment variables in Netlify ✅
2. Run RLS policies SQL in Supabase ✅

---

## Step 1: Get Your Supabase API Key

### 1.1 Open Supabase Dashboard
👉 **Click here:** https://app.supabase.com/project/mipblzufysinssqushei/settings/api

### 1.2 Find the API Keys Section
You'll see a section with two keys:
- **`anon` `public`** ← **COPY THIS ONE** ✅
- `service_role` `secret` ← **DO NOT USE THIS** ❌

### 1.3 Copy the Anon Public Key
1. Find the key labeled **`anon` `public`**
2. Click the **copy button** (📋) next to it
3. **IMPORTANT:** The key should be:
   - Very long (200+ characters)
   - Start with `eyJ`
   - Look like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 1.4 Save the Key
- **Paste it somewhere safe** (like Notepad) so you can copy it again
- You'll need it in the next step

---

## Step 2: Add Environment Variables in Netlify

### 2.1 Open Netlify Dashboard
👉 **Go to:** https://app.netlify.com

### 2.2 Select Your Site
- Click on your site name in the list

### 2.3 Go to Environment Variables
1. Click **Site configuration** (left sidebar)
2. Click **Environment variables** (under "Build & deploy")

### 2.4 Add First Variable: VITE_SUPABASE_URL
1. Click **Add variable** button
2. **Key:** `VITE_SUPABASE_URL`
3. **Value:** `https://mipblzufysinssqushei.supabase.co`
4. Click **Save**

### 2.5 Add Second Variable: VITE_SUPABASE_ANON_KEY
1. Click **Add variable** button again
2. **Key:** `VITE_SUPABASE_ANON_KEY`
3. **Value:** Paste the key you copied in Step 1.3
   - Make sure you paste the ENTIRE key (it's very long!)
   - No extra spaces before or after
4. Click **Save**

### 2.6 Verify Variables Are Set
You should now see both variables in the list:
- ✅ `VITE_SUPABASE_URL`
- ✅ `VITE_SUPABASE_ANON_KEY`

---

## Step 3: Redeploy Your Site

### 3.1 Trigger New Deployment
1. Go to **Deploys** tab (top menu)
2. Click **Trigger deploy** dropdown
3. Select **Clear cache and deploy site**
4. Wait for deployment to finish (usually 1-2 minutes)

### 3.2 Check Build Logs
1. Click on the new deployment
2. Check the build log for any errors
3. Look for messages about environment variables

---

## Step 4: Fix RLS Policies in Supabase

### 4.1 Open Supabase SQL Editor
👉 **Click here:** https://app.supabase.com/project/mipblzufysinssqushei/sql/new

### 4.2 Copy the SQL Script
1. Open the file `COPY_PASTE_RLS_FIX.sql` in your project
2. Select ALL the code (Ctrl+A or Cmd+A)
3. Copy it (Ctrl+C or Cmd+C)

### 4.3 Paste and Run
1. Paste the SQL code into the Supabase SQL Editor
2. Click the **Run** button (or press Ctrl+Enter)
3. You should see: **"Success. No rows returned"**

---

## Step 5: Test Your Site

### 5.1 Clear Browser Cache
- **Windows:** Ctrl+Shift+R
- **Mac:** Cmd+Shift+R

### 5.2 Visit Your Netlify Site
- Go to your Netlify site URL
- Products should now load! 🎉

### 5.3 Check Browser Console
1. Press **F12** to open DevTools
2. Go to **Console** tab
3. Look for:
   - ✅ "Supabase Config Check" - shows your configuration
   - ✅ No red error messages
   - ✅ Products loading successfully

---

## ❌ Still Not Working?

### Check These Common Issues:

1. **Environment Variables Not Set:**
   - Go back to Netlify → Environment Variables
   - Make sure BOTH variables exist
   - Make sure the values are correct (no extra spaces)

2. **Wrong API Key:**
   - Go back to Supabase → Settings → API
   - Copy the `anon` `public` key again
   - Make sure you copied the ENTIRE key (it's very long!)

3. **RLS Policies Not Applied:**
   - Go back to Supabase SQL Editor
   - Run the SQL from `COPY_PASTE_RLS_FIX.sql` again
   - Make sure you see "Success" message

4. **Site Not Redeployed:**
   - After adding environment variables, you MUST redeploy
   - Go to Netlify → Deploys → Trigger deploy

5. **Browser Cache:**
   - Clear your browser cache completely
   - Or try in an incognito/private window

---

## ✅ Success Checklist

After completing all steps, you should see:
- ✅ No "Invalid API key" error
- ✅ Products loading on your site
- ✅ Categories showing in the filter
- ✅ No red errors in browser console

---

## Need More Help?

Check the browser console (F12) for detailed error messages. The error will tell you exactly what's wrong!

