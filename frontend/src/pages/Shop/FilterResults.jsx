export default function FilterResults({ 
  filteredProducts = [], 
  searchTerm, setSearchTerm, 
  category, setCategory, 
  dietaryPref, setDietaryPref, 
  festival, setFestival,
  maxPrice, setMaxPrice
}) {
  
  // A helper function to check if ANY filters are active
  const hasActiveFilters = searchTerm || category !== 'All' || dietaryPref !== 'All' || festival !== 'All' || maxPrice < 2000;

  const clearAllFilters = () => {
    setSearchTerm('');
    setCategory('All');
    setDietaryPref('All');
    setFestival('All');
    setMaxPrice(2000); // Assuming 2000 is your max default
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      
      <p className="text-slate-500 font-medium">
        Showing <span className="font-extrabold text-teal-700 text-lg">{filteredProducts.length}</span> products
      </p>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-slate-400 uppercase mr-2">Active Filters:</span>
          
          {searchTerm && (
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full flex items-center gap-2">
              "{searchTerm}" <button onClick={() => setSearchTerm('')} className="hover:text-indigo-900">✕</button>
            </span>
          )}
          
          {category !== 'All' && (
            <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full flex items-center gap-2">
              {category} <button onClick={() => setCategory('All')} className="hover:text-teal-900">✕</button>
            </span>
          )}

          {dietaryPref !== 'All' && (
            <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full flex items-center gap-2">
              {dietaryPref} <button onClick={() => setDietaryPref('All')} className="hover:text-orange-900">✕</button>
            </span>
          )}

          {festival !== 'All' && (
            <span className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-bold rounded-full flex items-center gap-2">
              {festival} <button onClick={() => setFestival('All')} className="hover:text-pink-900">✕</button>
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