import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FilterSidebar from './filters/FilterSidebar';
import ProductGrid from './ProductGrid';
import FilterResults from './FilterResults';
import CartPanel from '../Cart/CartPanel';
import CheckoutModal from '../Cart/CheckoutModal';
import { API_URL } from '../../config';

export default function ShopLayout({
  searchTerm, setSearchTerm,
  selectedCategories, setSelectedCategories,
  selectedDiets, setSelectedDiets,
  selectedFestivals, setSelectedFestivals,
  maxPrice, setMaxPrice, sortBy, setSortBy, filteredProducts, products
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isProcessingVision, setIsProcessingVision] = useState(false);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleCheckout = async (totalAmount) => {
    try {
      await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total_amount: totalAmount, user_id: 1 })
      });
      setIsCartOpen(false);
      setIsCheckoutModalOpen(true);
      setCart([]); 
    } catch (err) {
      console.error("Checkout failed", err);
    }
  };

  const cartTotalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 transition-colors">
      <Navbar 
        cartCount={cartTotalItems} 
        setIsCartOpen={setIsCartOpen} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        isProcessingVision={isProcessingVision}
      />
      
      {/* Hidden file input for visual search */}
      <input 
        type="file" 
        id="visual-search-upload" 
        className="hidden" 
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          setIsProcessingVision(true);
          const formData = new FormData();
          formData.append('image', file);
          try {
            const res = await fetch(`${API_URL}/api/visual-search`, { method: 'POST', body: formData });
            const data = await res.json();
            if (data.search_term) setSearchTerm(data.search_term);
          } catch (err) {
            console.error(err);
          } finally {
            setIsProcessingVision(false);
          }
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left Column: Intro Box + Filter Sidebar */}
          <div className="w-full md:w-80 shrink-0 flex flex-col gap-6">
            
            {/* Small Clean Intro Card on Left */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🏺</span>
                <h3 className="font-bold text-slate-900 text-base">Sharadha Stores</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Authentic handcrafted traditional Indian pickles, Diwali sweets, savory snacks, and aromatic filter coffee.
              </p>
            </div>

            {/* Filter Toggle Button for Mobile */}
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="md:hidden w-full py-3 bg-slate-900 text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2"
            >
              <span>🎛️</span> {isFiltersOpen ? "Hide Filters" : "Show Filters"}
            </button>

            {/* Desktop & Open Filters */}
            <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block w-full`}>
              <FilterSidebar 
                searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
                selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} 
                selectedDiets={selectedDiets} setSelectedDiets={setSelectedDiets}
                selectedFestivals={selectedFestivals} setSelectedFestivals={setSelectedFestivals}
                maxPrice={maxPrice} setMaxPrice={setMaxPrice} products={products}
              />
            </div>

          </div>
          
          {/* Right Main Column: Category Tabs + Results + Grid */}
          <div className="flex-1 flex flex-col w-full min-w-0">
            
            {/* Quick Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none shrink-0">
              {['All', 'Pickles', 'Sweets', 'Snacks', 'Beverages', 'Pantry', 'Spices'].map((cat) => {
                const isActive = (cat === 'All' && selectedCategories.length === 0) || selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategories(cat === 'All' ? [] : [cat])}
                    className={`px-4 py-2 rounded-xl font-bold text-xs shrink-0 transition-all border ${
                      isActive 
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm' 
                        : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <FilterResults 
              filteredProducts={filteredProducts} searchTerm={searchTerm} setSearchTerm={setSearchTerm}
              category={selectedCategories.length ? selectedCategories[0] : ''} setCategory={(v) => setSelectedCategories(v ? [v] : [])}
              dietaryPref={selectedDiets.length ? selectedDiets[0] : ''} setDietaryPref={(v) => setSelectedDiets(v ? [v] : [])}
              festival={selectedFestivals.length ? selectedFestivals[0] : ''} setFestival={(v) => setSelectedFestivals(v ? [v] : [])}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              sortBy={sortBy} setSortBy={setSortBy}
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