-- COPY AND PASTE THIS ENTIRE SCRIPT INTO SUPABASE SQL EDITOR
-- This will fix the 401 errors by allowing public access to your tables

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
DROP POLICY IF EXISTS "Anyone can create order items" ON order_items;
DROP POLICY IF EXISTS "Anyone can submit feedback" ON feedback;
DROP POLICY IF EXISTS "Public read access for categories" ON categories;
DROP POLICY IF EXISTS "Public read access for products" ON products;
DROP POLICY IF EXISTS "Public insert access for orders" ON orders;
DROP POLICY IF EXISTS "Public insert access for order items" ON order_items;
DROP POLICY IF EXISTS "Public insert access for feedback" ON feedback;

-- RLS Policies for categories (public read access)
CREATE POLICY "Public read access for categories"
  ON categories FOR SELECT
  USING (true);

-- RLS Policies for products (public read access)
CREATE POLICY "Public read access for products"
  ON products FOR SELECT
  USING (true);

-- RLS Policies for orders (public insert only)
CREATE POLICY "Public insert access for orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- RLS Policies for order_items (public insert only)
CREATE POLICY "Public insert access for order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

-- RLS Policies for feedback (public insert only)
CREATE POLICY "Public insert access for feedback"
  ON feedback FOR INSERT
  WITH CHECK (true);

