# Fix 401 Unauthorized Error

The 401 error you're seeing is caused by **Row Level Security (RLS) policies** not being properly configured in your Supabase database.

## Quick Fix Steps

### Option 1: Run SQL in Supabase Dashboard (Recommended)

1. Go to your Supabase project: https://app.supabase.com/project/mipblzufysinssqushei
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy and paste the contents of `supabase/migrations/fix_rls_policies.sql`
5. Click **Run** (or press Ctrl+Enter)
6. Refresh your application

### Option 2: Verify Your API Key

1. Go to: https://app.supabase.com/project/mipblzufysinssqushei/settings/api
2. Verify that your **anon/public** key matches the one in your `.env` file
3. If it's different, update your `.env` file with the correct key

### Option 3: Check RLS Policies Manually

1. In Supabase Dashboard, go to **Authentication** → **Policies**
2. For each table (`categories`, `products`, `orders`, `order_items`, `feedback`):
   - Ensure RLS is enabled
   - Check that policies exist for the operations you need:
     - `categories` and `products`: SELECT policy for public/anonymous users
     - `orders`, `order_items`, `feedback`: INSERT policy for public/anonymous users

## What the Fix Does

The SQL script will:
- Enable RLS on all tables (if not already enabled)
- Drop any conflicting policies
- Create new policies that allow:
  - **Public read access** to `categories` and `products` tables
  - **Public insert access** to `orders`, `order_items`, and `feedback` tables

## After Running the Fix

1. Restart your development server if it's running
2. Clear your browser cache or do a hard refresh (Ctrl+Shift+R)
3. Check the browser console for any remaining errors
4. The application should now be able to fetch products and categories

## Still Getting 401 Errors?

If you're still seeing 401 errors after applying the fix:

1. **Check the browser console** - Look for detailed error messages
2. **Verify API key** - Make sure it's the correct anon key from your Supabase project
3. **Check network tab** - Inspect the request headers to ensure the Authorization header is being sent
4. **Verify tables exist** - Make sure you've run the initial migration (`20251107150906_create_organic_store_schema.sql`)

## Need Help?

Check the error details in your browser console - the improved error handling will show you exactly what's wrong.

