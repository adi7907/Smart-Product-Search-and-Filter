import { useState, useEffect } from 'react';
import ShopLayout from './ShopLayout';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // NEW Array-based state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedFestivals, setSelectedFestivals] = useState([]);
  const [maxPrice, setMaxPrice] = useState(2000);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesDiet = selectedDiets.length === 0 || selectedDiets.includes(product.dietary_preference);
    const matchesFestival = selectedFestivals.length === 0 || selectedFestivals.includes(product.festival_need);
    const matchesPrice = product.price <= maxPrice;
    
    return matchesSearch && matchesCategory && matchesDiet && matchesFestival && matchesPrice;
  });

  return (
    <ShopLayout
      searchTerm={searchTerm} setSearchTerm={setSearchTerm}
      selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
      selectedDiets={selectedDiets} setSelectedDiets={setSelectedDiets}
      selectedFestivals={selectedFestivals} setSelectedFestivals={setSelectedFestivals}
      maxPrice={maxPrice} setMaxPrice={setMaxPrice}
      filteredProducts={filteredProducts} products={products}
    />
  );
}