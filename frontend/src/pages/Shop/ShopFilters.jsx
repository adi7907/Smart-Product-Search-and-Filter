export default function ShopFilters({ searchTerm, setSearchTerm, category, setCategory, maxPrice, setMaxPrice }) {
  return (
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
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Max Price (₹)</label>
            <div className="flex gap-3 items-center">
              {/* The Slider */}
              <input type="range" min="50" max="2000" step="50" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} 
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600" />
              {/* Your New Custom Number Input */}
              <input type="number" min="50" max="2000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} 
                className="w-20 px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-bold text-teal-700 text-center" />
            </div>
          </div>

        </div>
      </div>
    </aside>
  );
}