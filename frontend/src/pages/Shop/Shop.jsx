import { useState } from 'react';
import ShopLayout from './ShopLayout';

export default function ShopScreen({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000);
  
  // New States for Advanced Filters
  const [dietaryPref, setDietaryPref] = useState('All');
  const [festival, setFestival] = useState('All');
  
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
  setCart([...cart, product]);
  alert(`${product.name} added to cart!`); // Simple feedback for now
  };
  
  const safeProducts = Array.isArray(products) ? products : [];
  
  const filteredProducts = safeProducts.filter(p => {
    const matchesSearch = (p.name || '').toLowerCase().includes((searchTerm || '').toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    const matchesPrice = (p.price || 0) <= maxPrice;
    
    // Day 13 Processing Logic
    const matchesDietary = dietaryPref === 'All' || p.dietary_preference === dietaryPref;
    const matchesFestival = festival === 'All' || p.festival_need === festival;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesDietary && matchesFestival;
  });

  return (
    <ShopLayout 
      searchTerm={searchTerm} setSearchTerm={setSearchTerm}
      category={category} setCategory={setCategory}
      maxPrice={maxPrice} setMaxPrice={setMaxPrice}
      dietaryPref={dietaryPref} setDietaryPref={setDietaryPref}
      festival={festival} setFestival={setFestival}
      filteredProducts={filteredProducts}
      products={safeProducts} 
    />
  );
}