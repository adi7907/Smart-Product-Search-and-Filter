import { useState } from 'react';

export default function ShopScreen({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000);
  
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    const matchesPrice = p.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div>
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-teal-800">Sharadha Stores</h1>
            <p className="text-xs text-slate-500 uppercase font-bold mt-1">Smart Search Portal</p>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-72 shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-32">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Smart Filters</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Search Items</label>
                <input type="text" placeholder="e.g., Mango Pickle..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                  <option value="All">All Categories</option>
                  <option value="Pickles">Pickles</option>
                  <option value="Sweets">Sweets</option>
                  <option value="Snacks">Snacks</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2 flex justify-between">
                  Budget <span className="text-teal-700 font-bold">₹{maxPrice}</span>
                </label>
                <input type="range" min="50" max="1000" step="50" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} 
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600" />
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <p className="text-slate-500 text-lg font-medium">No products found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(p => (
                <div key={p.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:-translate-y-1 transition-all flex flex-col">
                  <div className="p-6 flex-1">
                    <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full mb-4">{p.category}</span>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{p.name}</h3>
                  </div>
                  <div className="p-6 bg-slate-50 border-t flex justify-between items-center mt-auto">
                    <p className="text-2xl font-extrabold text-teal-700">₹{p.price}</p>
                    <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded border">{p.weight_g}g</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}