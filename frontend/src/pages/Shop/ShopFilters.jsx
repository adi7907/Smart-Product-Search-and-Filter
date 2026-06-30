import { useState } from 'react';
import { API_URL } from '../../config';

export default function ShopFilters({ 
  searchTerm, setSearchTerm, 
  category, setCategory, 
  maxPrice, setMaxPrice,
  dietaryPref, setDietaryPref,
  festival, setFestival, 
  products = [] 
}) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_URL}/api/visual-search`, { method: 'POST', body: formData });
      const data = await response.json();
      if (response.ok && data.search_term) setSearchTerm(data.search_term);
      else alert("Could not identify the image. Please try another one.");
    } catch (error) {
      alert("Error connecting to the AI scanner.");
    } finally {
      setIsAnalyzing(false);
      e.target.value = null; 
    }
  };

  return (
    <aside className="w-full md:w-72 shrink-0">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-32">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Smart Filters</h3>
        <div className="space-y-5">
          
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Search Items</label>
            <input type="text" placeholder="e.g., Mango Pickle..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none mb-2" />
            <div className="relative">
              <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload} disabled={isAnalyzing}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer disabled:opacity-50 transition-all" />
              {isAnalyzing && <p className="text-xs font-bold text-indigo-600 mt-2 animate-pulse">🔍 Searching...</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none cursor-pointer">
              {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Dietary Need</label>
            <select value={dietaryPref} onChange={(e) => setDietaryPref(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none cursor-pointer">
              <option value="All">Any</option><option value="Vegan">Vegan</option><option value="Sugar-Free">Sugar-Free</option><option value="Gluten-Free">Gluten-Free</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Festival</label>
            <select value={festival} onChange={(e) => setFestival(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none cursor-pointer">
              <option value="All">Any Time</option><option value="Diwali Special">Diwali Special</option><option value="Navratri Fasting">Navratri Fasting</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Max Price (₹)</label>
            <div className="flex gap-3 items-center">
              <input type="range" min="50" max="2000" step="50" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-stone-900" />
              <input type="number" min="50" max="2000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-20 px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-stone-800 text-center" />
            </div>
          </div>

        </div>
      </div>
    </aside>
  );
}