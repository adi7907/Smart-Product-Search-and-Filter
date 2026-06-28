import { useState, useEffect } from 'react';
import ShopLayout from './ShopLayout';
import { API_URL } from '../../config';

// Lightweight Fuzzy Matching Helper (handles typos like 'coka kola' -> 'Coca Cola')
function fuzzyMatch(str = '', query = '') {
  if (!query) return true;
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (cleanStr.includes(cleanQuery)) return true;

  // Phonetic normalization (k <-> c, z <-> s, ph <-> f)
  const norm = s => s.replace(/k/g, 'c').replace(/z/g, 's').replace(/ph/g, 'f').replace(/(.)\1+/g, '$1');
  if (norm(cleanStr).includes(norm(cleanQuery))) return true;

  // Character overlap ratio for general typos
  const queryChars = new Set(cleanQuery);
  let matchCount = 0;
  for (let ch of queryChars) {
    if (cleanStr.includes(ch)) matchCount++;
  }
  return (matchCount / queryChars.size) >= 0.75 && Math.abs(cleanStr.length - cleanQuery.length) <= 5;
}

export default function Shop({ customerAuth, onLogout, cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Array-based filter state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedFestivals, setSelectedFestivals] = useState([]);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  let filteredProducts = products.filter(product => {
    const matchesSearch = fuzzyMatch(product.name, searchTerm) || fuzzyMatch(product.category, searchTerm);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesDiet = selectedDiets.length === 0 || selectedDiets.includes(product.dietary_preference);
    const matchesFestival = selectedFestivals.length === 0 || selectedFestivals.includes(product.festival_need);
    const matchesPrice = product.price <= maxPrice;
    
    return matchesSearch && matchesCategory && matchesDiet && matchesFestival && matchesPrice;
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
      sortBy={sortBy} setSortBy={setSortBy}
      filteredProducts={filteredProducts} products={products}
      customerAuth={customerAuth} onLogout={onLogout}
      cart={cart} setCart={setCart}
    />
  );
}