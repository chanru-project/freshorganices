# 🚨 START HERE: Fix Netlify Connection Error

## Quick Summary
Your site can't connect to Supabase because:
1. ❌ Environment variables are missing in Netlify
2. ❌ RLS policies are not set in Supabase

## ⚡ Quick Fix (5 Minutes)

### ✅ Step 1: Get API Key (1 minute)
1. Go to: https://app.supabase.com/project/mipblzufysinssqushei/settings/api
2. Copy the **`anon` `public`** key (click the copy button 📋)

### ✅ Step 2: Add to Netlify (2 minutes)
1. Go to: https://app.netlify.com
2. Select your site → **Site configuration** → **Environment variables**
3. Add these TWO variables:
   - **Key:** `VITE_SUPABASE_URL` **Value:** `https://mipblzufysinssqushei.supabase.co`
   - **Key:** `VITE_SUPABASE_ANON_KEY` **Value:** (paste the key from Step 1)
4. Click **Save**

### ✅ Step 3: Redeploy (1 minute)
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait for it to finish

### ✅ Step 4: Fix RLS (1 minute)
1. Go to: https://app.supabase.com/project/mipblzufysinssqushei/sql/new
2. Copy ALL code from `COPY_PASTE_RLS_FIX.sql`
3. Paste and click **Run**
4. You should see "Success"

### ✅ Step 5: Test
1. Refresh your Netlify site (Ctrl+Shift+R)
2. Products should load! 🎉

---

## 📖 Detailed Instructions

For step-by-step instructions with screenshots, see:
- **`NETLIFY_FIX_STEP_BY_STEP.md`** - Complete guide with all details

---

## 🔍 Debugging

After deploying, open your site and press **F12** → **Console** tab.

You should see:
```
🔧 Supabase Config Check: {
  urlSet: true,        ← Should be true
  keySet: true,        ← Should be true
  keyLength: 200+,     ← Should be 200+ characters
  usingFallback: false ← Should be false
}
```

If `usingFallback: true`, your environment variables aren't set correctly in Netlify!

---

## ❓ Common Questions

**Q: Do I need to do both steps?**
A: YES! You need BOTH:
- Environment variables in Netlify ✅
- RLS policies in Supabase ✅

**Q: The key is very long, did I copy it all?**
A: Yes! The API key is 200+ characters. Make sure you copied the ENTIRE key.

**Q: I added the variables but it still doesn't work?**
A: You MUST redeploy after adding environment variables. Go to Deploys → Trigger deploy.

**Q: Which key do I use?**
A: Use the **`anon` `public`** key. NOT the `service_role` key (that's secret!).

---

## ✅ Success Checklist

- [ ] Copied `anon` `public` key from Supabase
- [ ] Added `VITE_SUPABASE_URL` to Netlify
- [ ] Added `VITE_SUPABASE_ANON_KEY` to Netlify
- [ ] Redeployed site in Netlify
- [ ] Ran SQL script in Supabase
- [ ] Refreshed site and products load

If all checked, your site should work! 🎉

