/*
  # Organic Food Store Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique) - Category name (e.g., Fruits, Vegetables, Grains, Dairy)
      - `slug` (text, unique) - URL-friendly version
      - `description` (text) - Category description
      - `created_at` (timestamptz) - Creation timestamp

    - `products`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key) - Reference to categories
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (decimal) - Product price
      - `unit` (text) - Unit of measurement (kg, lb, piece, etc.)
      - `image_url` (text) - Product image URL
      - `in_stock` (boolean) - Stock availability
      - `featured` (boolean) - Featured product flag
      - `created_at` (timestamptz) - Creation timestamp

    - `orders`
      - `id` (uuid, primary key)
      - `customer_name` (text) - Customer full name
      - `customer_email` (text) - Customer email
      - `customer_phone` (text) - Customer phone number
      - `delivery_address` (text) - Delivery address
      - `total_amount` (decimal) - Order total
      - `status` (text) - Order status (pending, confirmed, delivered)
      - `created_at` (timestamptz) - Order creation timestamp

    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key) - Reference to orders
      - `product_id` (uuid, foreign key) - Reference to products
      - `product_name` (text) - Product name snapshot
      - `quantity` (integer) - Quantity ordered
      - `price` (decimal) - Price at time of order
      - `created_at` (timestamptz) - Creation timestamp

    - `feedback`
      - `id` (uuid, primary key)
      - `name` (text) - Customer name
      - `email` (text) - Customer email
      - `message` (text) - Feedback message
      - `created_at` (timestamptz) - Submission timestamp

  2. Security
    - Enable RLS on all tables
    - Public read access for categories and products
    - Public insert access for orders, order_items, and feedback
    - No update/delete access for public users (admin would need auth)
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  price decimal(10, 2) NOT NULL,
  unit text NOT NULL DEFAULT 'piece',
  image_url text DEFAULT '',
  in_stock boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  delivery_address text NOT NULL,
  total_amount decimal(10, 2) NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  quantity integer NOT NULL,
  price decimal(10, 2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon
  USING (true);

-- RLS Policies for products (public read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon
  USING (true);

-- RLS Policies for orders (public insert only)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO anon
  WITH CHECK (true);

-- RLS Policies for order_items (public insert only)
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  TO anon
  WITH CHECK (true);

-- RLS Policies for feedback (public insert only)
CREATE POLICY "Anyone can submit feedback"
  ON feedback FOR INSERT
  TO anon
  WITH CHECK (true);

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
  ('Fruits', 'fruits', 'Fresh organic fruits picked at peak ripeness'),
  ('Vegetables', 'vegetables', 'Farm-fresh organic vegetables'),
  ('Grains', 'grains', 'Wholesome organic grains and cereals'),
  ('Dairy', 'dairy', 'Pure organic dairy products')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (category_id, name, description, price, unit, image_url, in_stock, featured) VALUES
  -- Fruits
  ((SELECT id FROM categories WHERE slug = 'fruits'), 'Organic Apples', 'Crisp and sweet organic apples', 4.99, 'lb', 'https://images.pexels.com/photos/672101/pexels-photo-672101.jpeg', true, true),
  ((SELECT id FROM categories WHERE slug = 'fruits'), 'Organic Bananas', 'Fresh organic bananas rich in potassium', 2.99, 'lb', 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg', true, false),
  ((SELECT id FROM categories WHERE slug = 'fruits'), 'Organic Strawberries', 'Sweet and juicy organic strawberries', 5.99, 'lb', 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg', true, true),
  ((SELECT id FROM categories WHERE slug = 'fruits'), 'Organic Blueberries', 'Antioxidant-rich organic blueberries', 6.99, 'lb', 'https://images.pexels.com/photos/265393/pexels-photo-265393.jpeg', true, false),
  
  -- Vegetables
  ((SELECT id FROM categories WHERE slug = 'vegetables'), 'Organic Carrots', 'Crunchy organic carrots full of beta-carotene', 3.49, 'lb', 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg', true, false),
  ((SELECT id FROM categories WHERE slug = 'vegetables'), 'Organic Broccoli', 'Fresh organic broccoli crowns', 4.49, 'lb', 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg', true, true),
  ((SELECT id FROM categories WHERE slug = 'vegetables'), 'Organic Spinach', 'Tender organic baby spinach leaves', 4.99, 'bunch', 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg', true, false),
  ((SELECT id FROM categories WHERE slug = 'vegetables'), 'Organic Tomatoes', 'Vine-ripened organic tomatoes', 3.99, 'lb', 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg', true, true),
  
  -- Grains
  ((SELECT id FROM categories WHERE slug = 'grains'), 'Organic Brown Rice', 'Nutritious organic brown rice', 5.99, '2lb bag', 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg', true, false),
  ((SELECT id FROM categories WHERE slug = 'grains'), 'Organic Quinoa', 'Protein-rich organic quinoa', 8.99, '1lb bag', 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg', true, true),
  ((SELECT id FROM categories WHERE slug = 'grains'), 'Organic Oats', 'Wholesome organic rolled oats', 4.99, '2lb bag', 'https://images.pexels.com/photos/543733/pexels-photo-543733.jpeg', true, false),
  
  -- Dairy
  ((SELECT id FROM categories WHERE slug = 'dairy'), 'Organic Milk', 'Fresh organic whole milk', 6.99, 'gallon', 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg', true, false),
  ((SELECT id FROM categories WHERE slug = 'dairy'), 'Organic Greek Yogurt', 'Creamy organic Greek yogurt', 5.49, '32oz', 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg', true, true),
  ((SELECT id FROM categories WHERE slug = 'dairy'), 'Organic Cheddar Cheese', 'Sharp organic cheddar cheese', 7.99, '8oz', 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg', true, false)
ON CONFLICT DO NOTHING;