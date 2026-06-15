import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000);
  
  // View Toggle State
  const [activeTab, setActiveTab] = useState('customer');

  // New Product Form State
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Pickles', price: '', weight_g: '' });

  const fetchProducts = async () => {
    try {
      const url = new URL('http://localhost:5000/api/products');
      if (searchTerm) url.searchParams.append('search', searchTerm);
      if (category !== 'All') url.searchParams.append('category', category);
      if (maxPrice) url.searchParams.append('maxPrice', maxPrice);

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => { fetchProducts(); }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, category, maxPrice, activeTab]);

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      
      if (response.ok) {
        alert("Product Added Successfully!");
        setNewProduct({ name: '', category: 'Pickles', price: '', weight_g: '' });
        fetchProducts(); // Refresh the list
      }
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Sharadha Stores</h1>
        <div className="tabs">
          <button onClick={() => setActiveTab('customer')} className={activeTab === 'customer' ? 'active-tab' : ''}>Customer Search</button>
          <button onClick={() => setActiveTab('admin')} className={activeTab === 'admin' ? 'active-tab' : ''}>Admin Dashboard</button>
        </div>
      </header>

      {/* --- CUSTOMER VIEW --- */}
      {activeTab === 'customer' && (
        <div className="main-content">
          <aside className="filters">
            <h3>Filters</h3>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Pickles">Pickles</option>
              <option value="Sweets">Sweets</option>
              <option value="Snacks">Snacks</option>
            </select>
            <label>Max Price: ₹{maxPrice}</label>
            <input type="range" min="50" max="1000" step="50" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </aside>

          <main className="product-grid">
            {products.length === 0 ? <p>No products found.</p> : products.map(p => (
              <div key={p.id} className="product-card">
                <h3>{p.name}</h3>
                <span className="category-badge">{p.category}</span>
                <p className="price">₹{p.price}</p>
                <p className="weight">{p.weight_g}g</p>
              </div>
            ))}
          </main>
        </div>
      )}

      {/* --- ADMIN VIEW --- */}
      {activeTab === 'admin' && (
        <div className="admin-content">
          <div className="admin-form-card">
            <h3>Add New Product</h3>
            <form onSubmit={handleAddProduct} className="admin-form">
              <input type="text" placeholder="Product Name" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
              <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                <option value="Pickles">Pickles</option>
                <option value="Sweets">Sweets</option>
                <option value="Snacks">Snacks</option>
              </select>
              <input type="number" placeholder="Price (₹)" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
              <input type="number" placeholder="Weight (g)" value={newProduct.weight_g} onChange={e => setNewProduct({...newProduct, weight_g: e.target.value})} />
              <button type="submit" className="submit-btn">Save Product</button>
            </form>
          </div>

          <div className="admin-table-card">
            <h3>Inventory Table</h3>
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td><td>{p.name}</td><td>{p.category}</td><td>₹{p.price}</td>
                    <td>{p.is_available ? '🟢 In Stock' : '🔴 Out'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}