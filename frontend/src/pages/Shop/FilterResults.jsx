export default function FilterResults({ 
  filteredProducts = [], 
  searchTerm, setSearchTerm, 
  category, setCategory, 
  dietaryPref, setDietaryPref, 
  festival, setFestival,
  maxPrice, setMaxPrice,
  sortBy, setSortBy
}) {
  
  // A helper function to check if ANY filters are active
  const hasActiveFilters = searchTerm || (category && category !== 'All') || (dietaryPref && dietaryPref !== 'All') || (festival && festival !== 'All') || maxPrice < 2000;

  const clearAllFilters = () => {
    setSearchTerm('');
    setCategory('');
    setDietaryPref('');
    setFestival('');
    setMaxPrice(2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border dark:border-slate-800 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      
      <div className="flex items-center gap-4">
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Showing <span className="font-extrabold text-teal-700 dark:text-teal-400 text-lg">{filteredProducts.length}</span> items
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
        <label htmlFor="sort-select" className="text-xs font-bold text-slate-400 uppercase">Sort:</label>
        <select 
          id="sort-select"
          value={sortBy || 'featured'} 
          onChange={(e) => setSortBy && setSortBy(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="featured">✨ Featured</option>
          <option value="price-asc">💵 Price: Low to High</option>
          <option value="price-desc">💰 Price: High to Low</option>
          <option value="name-asc">🔤 Name: A to Z</option>
        </select>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-slate-400 uppercase mr-2">Active Filters:</span>
          
          {searchTerm && (
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full flex items-center gap-2">
              "{searchTerm}" <button onClick={() => setSearchTerm('')} className="hover:text-indigo-900">✕</button>
            </span>
          )}
          
          {category && category !== 'All' && (
            <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full flex items-center gap-2">
              {category} <button onClick={() => setCategory('')} className="hover:text-teal-900">✕</button>
            </span>
          )}

          {dietaryPref && dietaryPref !== 'All' && (
            <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full flex items-center gap-2">
              {dietaryPref} <button onClick={() => setDietaryPref('')} className="hover:text-orange-900">✕</button>
            </span>
          )}

          {festival && festival !== 'All' && (
            <span className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-bold rounded-full flex items-center gap-2">
              {festival} <button onClick={() => setFestival('')} className="hover:text-pink-900">✕</button>
            </span>
          )}

          <button onClick={clearAllFilters} className="text-xs font-bold text-slate-400 hover:text-slate-700 underline ml-2">
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}