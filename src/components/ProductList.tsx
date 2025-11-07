import { useState, useEffect } from 'react';
import { supabase, Product, Category } from '../lib/supabase';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      
      if (error.message?.includes('Invalid API key') || error.message?.includes('JWT') || error.code === 'PGRST301') {
        setError('Invalid API key. Please get the correct key from Supabase Settings → API and update your environment variables in Netlify.');
      } else if (error.code === 'PGRST301' || error.message?.includes('401') || error.message?.includes('permission denied')) {
        setError('Database access denied. Please configure RLS policies in Supabase. See QUICK_FIX.md for instructions.');
      } else {
        setError(`Failed to load categories: ${error.message}`);
      }
    } else if (data) {
      setCategories(data);
      setError(null); // Clear error on success
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase.from('products').select('*').order('featured', { ascending: false });

    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      
      if (error.message?.includes('Invalid API key') || error.message?.includes('JWT') || error.code === 'PGRST301') {
        setError('Invalid API key. Please get the correct key from Supabase Settings → API and update your environment variables in Netlify.');
      } else if (error.code === 'PGRST301' || error.message?.includes('401') || error.message?.includes('permission denied')) {
        setError('Database access denied. Please configure RLS policies in Supabase. See QUICK_FIX.md for instructions.');
      } else {
        setError(`Failed to load products: ${error.message}`);
      }
    } else if (data) {
      setProducts(data);
      setError(null); // Clear error on success
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  return (
    <section id="products" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Fresh Products
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Handpicked organic produce from local farms
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                  <div className="mt-4">
                    <p className="font-semibold">To fix this:</p>
                    <ol className="list-decimal list-inside mt-2 space-y-1">
                      <li>Get your API key from <a href="https://app.supabase.com/project/mipblzufysinssqushei/settings/api" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Supabase API Settings</a> (copy the <strong>anon public</strong> key)</li>
                      <li>Go to <a href="https://app.netlify.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Netlify Dashboard</a> → Your Site → Environment Variables</li>
                      <li>Update <code className="bg-red-100 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> with the correct key</li>
                      <li>Redeploy your site in Netlify</li>
                      <li>Also run the SQL from <code className="bg-red-100 px-1 rounded">COPY_PASTE_RLS_FIX.sql</code> in <a href="https://app.supabase.com/project/mipblzufysinssqushei/sql/new" target="_blank" rel="noopener noreferrer" className="underline">Supabase SQL Editor</a></li>
                      <li>Refresh this page</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
