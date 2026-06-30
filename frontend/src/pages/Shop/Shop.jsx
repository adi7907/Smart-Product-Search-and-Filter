import { useState, useEffect } from 'react';
import ShopLayout from './ShopLayout';
import { API_URL } from '../../config';

// Accurate Matching Helper (prevents false positives like 'chips' matching 'spices')
function exactOrFuzzyMatch(product, query = '') {
  if (!query || !query.trim()) return true;
  const q = query.toLowerCase().trim();
  const name = (product.name || '').toLowerCase();
  const cat = (product.category || '').toLowerCase();
  const ing = (product.ingredients || '').toLowerCase();

  // Exact substring or ingredient check
  if (name.includes(q) || ing.includes(q)) return true;
  if (cat === q || cat.startsWith(q) || (q.length > 3 && q.startsWith(cat))) return true;

  // Keyword word match (e.g. searching 'samosa' or 'chips')
  const qWords = q.split(/\s+/);
  for (let w of qWords) {
    if (w.length >= 3 && name.includes(w)) return true;
  }

  return false;
}

export default function Shop({ customerAuth, onLogout, cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Array-based filter state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedFestivals, setSelectedFestivals] = useState([]);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  let filteredProducts = products.filter(product => {
    const matchesSearch = exactOrFuzzyMatch(product, searchTerm);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesDiet = selectedDiets.length === 0 || selectedDiets.includes(product.dietary_preference);
    const matchesFestival = selectedFestivals.length === 0 || selectedFestivals.includes(product.festival_need);
    const matchesPrice = product.price <= maxPrice;
    const matchesRating = (product.rating || 4.5) >= minRating;
    
    return matchesSearch && matchesCategory && matchesDiet && matchesFestival && matchesPrice && matchesRating;
  });

  // Sorting Pipeline
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    return 0; // featured/default
  });

  return (
    <ShopLayout
      searchTerm={searchTerm} setSearchTerm={setSearchTerm}
      selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
      selectedDiets={selectedDiets} setSelectedDiets={setSelectedDiets}
      selectedFestivals={selectedFestivals} setSelectedFestivals={setSelectedFestivals}
      maxPrice={maxPrice} setMaxPrice={setMaxPrice}
      minRating={minRating} setMinRating={setMinRating}
      sortBy={sortBy} setSortBy={setSortBy}
      filteredProducts={filteredProducts} products={products}
      customerAuth={customerAuth} onLogout={onLogout}
      cart={cart} setCart={setCart}
    />
  );
}