import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-green-500" />
              <span className="text-xl font-bold">Fresh Organics</span>
            </div>
            <p className="text-gray-400">
              Delivering the finest organic produce from local farms to your doorstep.
              Fresh, healthy, and sustainable.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#products" className="hover:text-green-500 transition-colors">Products</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">Our Farms</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">Delivery Info</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on new products and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
              />
              <button className="bg-green-600 px-6 py-2 rounded-r-lg hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Fresh Organics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
