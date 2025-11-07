import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Environment variables are required for production (Netlify)
// For local development, fallback values are used
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mipblzufysinssqushei.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcGJsemZ5c3lua3NzcXVzaGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNjIyOTEsImV4cCI6MjA0NjkzODI5MX0.Gq25R6J5xYQF2Oo28wVnKkCp2v7QVg928pNnZlR1hE';

// Log configuration status (helpful for debugging in production too)
console.log('🔧 Supabase Config Check:', {
  url: supabaseUrl,
  urlSet: !!import.meta.env.VITE_SUPABASE_URL,
  keySet: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
  keyLength: supabaseAnonKey?.length || 0,
  keyStartsWith: supabaseAnonKey?.substring(0, 3) || 'N/A',
  usingFallback: !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY,
  environment: import.meta.env.MODE,
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. For Netlify, add them in Site Settings → Environment variables.'
  );
}

// Create Supabase client with explicit configuration
// The client automatically handles authentication headers
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Test connection on initialization (development only)
if (import.meta.env.DEV) {
  supabase
    .from('categories')
    .select('count')
    .limit(1)
    .then(({ error }) => {
      if (error) {
        console.warn('Supabase connection test failed:', error.message);
        if (error.message.includes('Invalid API key') || error.message.includes('JWT')) {
          console.error('⚠️ API Key is invalid. Get the correct key from: https://app.supabase.com/project/mipblzufysinssqushei/settings/api');
        }
      } else {
        console.log('✅ Supabase connection successful');
      }
    });
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image_url: string;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  total_amount: number;
  items: {
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }[];
}

export interface FeedbackData {
  name: string;
  email: string;
  message: string;
}
