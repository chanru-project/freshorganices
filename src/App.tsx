import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'contact'>('home');

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      {currentPage === 'home' ? (
        <>
          <Hero />
          <ProductList />
        </>
      ) : (
        <ContactPage />
      )}

      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

export default App;
