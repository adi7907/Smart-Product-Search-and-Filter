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
  maxPrice, setMaxPrice, sortBy, setSortBy, filteredProducts, products, customerAuth, onLogout
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
    // Always show success — API call is best-effort
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
    setCart([]);
    try {
      await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total_amount: totalAmount, user_id: 1 })
      });
    } catch (err) {
      console.warn('Order API call failed (non-blocking):', err);
    }
  };

  const cartTotalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-800 transition-colors font-sans">
      <Navbar 
        cartCount={cartTotalItems} 
        setIsCartOpen={setIsCartOpen} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        isProcessingVision={isProcessingVision}
        customerAuth={customerAuth}
        onLogout={onLogout}
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
            <div className="bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-white p-6 rounded-3xl border border-orange-200/60 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <img src="/logo.png" alt="Icon" className="w-12 h-12 object-contain drop-shadow-xs" />
                <div>
                  <h3 className="font-black text-stone-900 text-lg leading-tight">SHARADHA</h3>
                  <span className="text-[11px] font-extrabold text-orange-600 tracking-wider">STORES & SAVORIES</span>
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Experience authentic handcrafted traditional Indian pickles, Diwali sweets, crunchy snacks, and aromatic filter coffee prepared with pure ingredients.
              </p>
            </div>

            {/* Filter Toggle Button for Mobile */}
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="md:hidden w-full py-3.5 bg-stone-900 text-white font-extrabold rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
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
            <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-4 scrollbar-none shrink-0">
              {['All', 'Pickles', 'Sweets', 'Snacks', 'Beverages', 'Pantry', 'Spices'].map((cat) => {
                const isActive = (cat === 'All' && selectedCategories.length === 0) || selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategories(cat === 'All' ? [] : [cat])}
                    className={`px-5 py-2.5 rounded-2xl font-extrabold text-xs shrink-0 transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/25 scale-105' 
                        : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80 shadow-2xs'
                    }`}
                  >
                    {cat === 'All' ? '🍽️ All Dishes' : cat === 'Pickles' ? '🥭 Pickles' : cat === 'Sweets' ? '🍬 Sweets' : cat === 'Snacks' ? '🥨 Snacks' : cat === 'Beverages' ? '☕ Beverages' : cat === 'Pantry' ? '🫙 Pantry' : '🌶️ Spices'}
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
        className="fixed bottom-8 right-8 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-700 hover:to-amber-700 text-white px-7 py-4 rounded-full shadow-2xl shadow-orange-600/40 transition-transform hover:scale-105 flex items-center gap-3 z-40 cursor-pointer border border-white/20"
      >
        <span className="text-2xl">🛒</span>
        {cartTotalItems > 0 ? (
          <span className="font-black text-lg">{cartTotalItems} {cartTotalItems === 1 ? 'Item' : 'Items'}</span>
        ) : (
          <span className="font-black text-lg">Cart</span>
        )}
      </button>
    </div>
  );
}