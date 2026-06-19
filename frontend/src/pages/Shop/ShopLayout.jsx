import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FilterSidebar from './filters/FilterSidebar';
import ProductGrid from './ProductGrid';
import FilterResults from './FilterResults';
import CartPanel from '../Cart/CartPanel';
import CheckoutModal from '../Cart/CheckoutModal';

export default function ShopLayout({
  searchTerm, setSearchTerm,
  selectedCategories, setSelectedCategories,
  selectedDiets, setSelectedDiets,
  selectedFestivals, setSelectedFestivals,
  maxPrice, setMaxPrice, filteredProducts, products
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
    setCart([]); 
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors ${isDarkMode ? 'dark' : ''}`}>
      <Navbar cartCount={cart.reduce((s, i) => s + i.quantity, 0)} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setIsCartOpen={setIsCartOpen} />
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <FilterSidebar 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
          selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} 
          selectedDiets={selectedDiets} setSelectedDiets={setSelectedDiets}
          selectedFestivals={selectedFestivals} setSelectedFestivals={setSelectedFestivals}
          maxPrice={maxPrice} setMaxPrice={setMaxPrice} products={products}
        />
        
        <div className="flex-1 flex flex-col">
          <FilterResults 
            filteredProducts={filteredProducts} searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            category={selectedCategories.length ? selectedCategories[0] : ''} setCategory={(v) => setSelectedCategories(v ? [v] : [])}
            dietaryPref={selectedDiets.length ? selectedDiets[0] : ''} setDietaryPref={(v) => setSelectedDiets(v ? [v] : [])}
            festival={selectedFestivals.length ? selectedFestivals[0] : ''} setFestival={(v) => setSelectedFestivals(v ? [v] : [])}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
          />
          <ProductGrid filteredProducts={filteredProducts} addToCart={addToCart} />
        </div>
      </div>

      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} setCart={setCart} onCheckout={handleCheckout} />
      <CheckoutModal isOpen={isCheckoutModalOpen} onClose={() => setIsCheckoutModalOpen(false)} />
    </div>
  );
}