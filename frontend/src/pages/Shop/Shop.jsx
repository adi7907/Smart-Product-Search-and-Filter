import { useState } from 'react';
import ShopLayout from './ShopLayout';

export default function ShopScreen({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000);
  
  const safeProducts = Array.isArray(products) ? products : [];
  
  const filteredProducts = safeProducts.filter(p => {
    const matchesSearch = (p.name || '').toLowerCase().includes((searchTerm || '').toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    const matchesPrice = (p.price || 0) <= maxPrice;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <ShopLayout 
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      category={category}
      setCategory={setCategory}
      maxPrice={maxPrice}
      setMaxPrice={setMaxPrice}
      filteredProducts={filteredProducts}
      products={safeProducts} 
    />
  );
}