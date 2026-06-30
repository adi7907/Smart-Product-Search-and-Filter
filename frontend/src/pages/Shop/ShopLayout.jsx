import { useState } from 'react';
import Navbar from './components/Navbar';
import FilterSidebar from './filters/FilterSidebar';
import ProductGrid from './ProductGrid';
import FilterResults from './FilterResults';
import CartPanel from '../Cart/CartPanel';
import { API_URL } from '../../config';
import { useToast } from '../../context/ToastContext';
import { TagIcon, CartIcon, FilterIcon } from '../../components/Icons';

export default function ShopLayout({
  searchTerm, setSearchTerm,
  selectedCategories, setSelectedCategories,
  selectedDiets, setSelectedDiets,
  selectedFestivals, setSelectedFestivals,
  maxPrice, setMaxPrice,
  minRating, setMinRating,
  sortBy, setSortBy,
  filteredProducts, products,
  customerAuth, onLogout,
  cart, setCart,
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isProcessingVision, setIsProcessingVision] = useState(false);
  const { showToast } = useToast();

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
    showToast(`${product.name.split(' ').slice(0, 2).join(' ')} added to cart! 🛒`);
  };

  const cartTotalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-800 font-sans">
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
            if (data.search_term) { setSearchTerm(data.search_term); showToast(`Searching for "${data.search_term}"... 🔍`, 'info'); }
          } catch (err) {
            console.error(err);
            showToast('Visual search failed. Try again.', 'error');
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
                <img src="/logo.png" alt="Icon" className="w-12 h-12 object-contain" />
                <div>
                  <h3 className="font-black text-stone-900 text-lg leading-tight">SHARADHA</h3>
                  <span className="text-[11px] font-extrabold text-orange-600 tracking-wider">STORES & SAVORIES</span>
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Experience authentic handcrafted traditional Indian pickles, Diwali sweets, crunchy snacks, and aromatic filter coffee.
              </p>
            </div>

            {/* Filter Toggle Button for Mobile */}
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="md:hidden w-full py-3.5 bg-stone-900 text-white font-extrabold rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <FilterIcon className="w-4 h-4" /> {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Desktop & Open Filters */}
            <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block w-full`}>
              <FilterSidebar
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
                selectedDiets={selectedDiets} setSelectedDiets={setSelectedDiets}
                selectedFestivals={selectedFestivals} setSelectedFestivals={setSelectedFestivals}
                maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                minRating={minRating} setMinRating={setMinRating}
                products={products}
              />
            </div>

          </div>

          {/* Right Main Column */}
          <div className="flex-1 flex flex-col w-full min-w-0">

            {/* Quick Category Tabs */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-4 scrollbar-none shrink-0">
              {['All', 'Pickles', 'Sweets', 'Snacks', 'Beverages', 'Pantry', 'Spices'].map((cat) => {
                const isActive = (cat === 'All' && selectedCategories.length === 0) || selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategories(cat === 'All' ? [] : [cat])}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-stone-900 text-white border-stone-900 shadow-sm font-extrabold'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200 shadow-xs'
                    }`}
                  >
                    {cat === 'All' ? 'All Dishes' : cat}
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
              minRating={minRating} setMinRating={setMinRating}
              sortBy={sortBy} setSortBy={setSortBy}
            />
            <ProductGrid filteredProducts={filteredProducts} addToCart={addToCart} customerAuth={customerAuth} showToast={showToast} />
          </div>
        </div>
      </div>

      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} setCart={setCart} customerAuth={customerAuth} />

      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 text-white px-7 py-4 rounded-full shadow-2xl shadow-orange-600/40 transition-transform hover:scale-105 flex items-center gap-3 z-40 cursor-pointer border border-white/20"
        style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}
      >
        <CartIcon className="w-5 h-5 text-white" />
        <span className="font-black text-lg">{cartTotalItems > 0 ? `${cartTotalItems} Item${cartTotalItems !== 1 ? 's' : ''}` : 'Cart'}</span>
      </button>
    </div>
  );
}