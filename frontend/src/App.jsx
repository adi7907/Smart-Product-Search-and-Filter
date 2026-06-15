import { useState, useEffect } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000);
  
  const [activeTab, setActiveTab] = useState('customer');
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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (response.ok) {
        setNewProduct({ name: '', category: 'Pickles', price: '', weight_g: '' });
        fetchProducts(); 
      }
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-200">
      
      {/* --- PREMIUM NAVIGATION BAR --- */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-teal-800 tracking-tight">Sharadha Stores</h1>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Smart Search Portal</p>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shadow-inner">
            <button 
              onClick={() => setActiveTab('customer')} 
              className={`px-5 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${activeTab === 'customer' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Shop
            </button>
            <button 
              onClick={() => setActiveTab('admin')} 
              className={`px-5 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${activeTab === 'admin' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* === CUSTOMER VIEW === */}
        {activeTab === 'customer' && (
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <aside className="w-full md:w-72 shrink-0">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-32">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                  Smart Filters
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Search Items</label>
                    <input type="text" placeholder="e.g., Mango Pickle..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none appearance-none cursor-pointer">
                      <option value="All">All Categories</option>
                      <option value="Pickles">Pickles</option>
                      <option value="Sweets">Sweets</option>
                      <option value="Snacks">Snacks</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex justify-between">
                      Budget 
                      <span className="text-teal-700 font-bold">₹{maxPrice}</span>
                    </label>
                    <input type="range" min="50" max="1000" step="50" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} 
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600" />
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <main className="flex-1">
              {products.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                  <p className="text-slate-500 text-lg font-medium">No products found matching your filters.</p>
                  <button onClick={() => {setSearchTerm(''); setCategory('All'); setMaxPrice(1000);}} className="mt-4 text-teal-600 hover:text-teal-800 font-semibold underline underline-offset-4">Reset Filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map(p => (
                    <div key={p.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full">{p.category}</span>
                          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{p.weight_g}g</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2">{p.name}</h3>
                      </div>
                      <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center mt-auto">
                        <p className="text-2xl font-extrabold text-teal-700">₹{p.price}</p>
                        <button className="bg-slate-800 hover:bg-slate-900 text-white p-2 rounded-xl transition-colors shadow-sm">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        )}

        {/* === ADMIN VIEW === */}
        {activeTab === 'admin' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            
            {/* Data Entry Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Add New Inventory Item</h3>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Product Name</label>
                  <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                  <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer">
                    <option value="Pickles">Pickles</option>
                    <option value="Sweets">Sweets</option>
                    <option value="Snacks">Snacks</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Price & Weight</label>
                  <div className="flex gap-2">
                    <input type="number" placeholder="₹" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} 
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
                    <input type="number" placeholder="g" value={newProduct.weight_g} onChange={e => setNewProduct({...newProduct, weight_g: e.target.value})} 
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
                  </div>
                </div>
                <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-sm transition-colors w-full h-fit">
                  Save Item
                </button>
              </form>
            </div>

            {/* Database Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-xl font-bold text-slate-800">Live Database Records</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Item Name</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4 text-right">Price</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 font-mono text-slate-400">#{p.id}</td>
                        <td className="px-6 py-4 font-bold text-slate-800">{p.name}</td>
                        <td className="px-6 py-4"><span className="px-2.5 py-1 bg-slate-100 rounded-md text-xs font-medium">{p.category}</span></td>
                        <td className="px-6 py-4 text-right font-medium text-slate-800">₹{p.price}</td>
                        <td className="px-6 py-4 text-center">
                          {p.is_available 
                            ? <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active</span>
                            : <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Out</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}