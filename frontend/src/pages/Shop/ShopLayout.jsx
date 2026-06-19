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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
    setCart([]); 
  };

  const cartTotalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors dark">
      <Navbar cartCount={cartTotalItems} setIsCartOpen={setIsCartOpen} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex gap-2">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors text-lg shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              onClick={() => document.getElementById('visual-search-upload').click()}
              className="p-4 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-2xl hover:bg-teal-200 dark:hover:bg-teal-900 transition-colors shrink-0 shadow-sm"
              title="Visual Search"
            >
              <span className="text-xl">📷</span>
            </button>
            <input 
              type="file" 
              id="visual-search-upload" 
              className="hidden" 
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const formData = new FormData();
                formData.append('image', file);
                try {
                  const res = await fetch('http://localhost:5000/api/visual-search', { method: 'POST', body: formData });
                  const data = await res.json();
                  if (data.search_term) setSearchTerm(data.search_term);
                } catch (err) {
                  console.error(err);
                }
              }} 
            />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {isFiltersOpen && (
            <FilterSidebar 
              searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
              selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} 
              selectedDiets={selectedDiets} setSelectedDiets={setSelectedDiets}
              selectedFestivals={selectedFestivals} setSelectedFestivals={setSelectedFestivals}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice} products={products}
            />
          )}
          
          <div className="flex-1 flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <button 
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="px-6 py-2 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-900 transition-colors shadow-sm"
              >
                {isFiltersOpen ? "Hide Filters" : "Show Filters 🎛️"}
              </button>
            </div>

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
      </div>

      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} setCart={setCart} onCheckout={handleCheckout} />
      <CheckoutModal isOpen={isCheckoutModalOpen} onClose={() => setIsCheckoutModalOpen(false)} />
      
      {/* Floating Action Button for Cart */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-full shadow-2xl transition-transform hover:scale-105 flex items-center gap-3 z-40"
      >
        <span className="text-2xl">🛒</span>
        {cartTotalItems > 0 ? (
          <span className="font-bold text-lg">{cartTotalItems} {cartTotalItems === 1 ? 'Item' : 'Items'}</span>
        ) : (
          <span className="font-bold text-lg">Cart</span>
        )}
      </button>
    </div>
  );
}