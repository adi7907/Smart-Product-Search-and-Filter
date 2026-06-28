import { StarIcon } from '../../components/Icons';

export default function FilterResults({
  filteredProducts = [],
  searchTerm, setSearchTerm,
  category, setCategory,
  dietaryPref, setDietaryPref,
  festival, setFestival,
  maxPrice, setMaxPrice,
  minRating, setMinRating,
  sortBy, setSortBy
}) {
  const hasActiveFilters = searchTerm
    || (category && category !== 'All')
    || (dietaryPref && dietaryPref !== 'All')
    || (festival && festival !== 'All')
    || maxPrice < 2000
    || minRating > 0;

  const clearAllFilters = () => {
    setSearchTerm('');
    setCategory('');
    setDietaryPref('');
    setFestival('');
    setMaxPrice(2000);
    if (setMinRating) setMinRating(0);
  };

  const activeTags = [
    searchTerm && { label: `"${searchTerm}"`, onRemove: () => setSearchTerm(''), color: 'bg-stone-100 text-stone-700 border-stone-300' },
    category && category !== 'All' && { label: category, onRemove: () => setCategory(''), color: 'bg-orange-50 text-orange-700 border-orange-200' },
    dietaryPref && dietaryPref !== 'All' && { label: dietaryPref, onRemove: () => setDietaryPref(''), color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    festival && festival !== 'All' && { label: festival, onRemove: () => setFestival(''), color: 'bg-amber-50 text-amber-700 border-amber-200' },
    maxPrice < 2000 && { label: `Under ₹${maxPrice}`, onRemove: () => setMaxPrice(2000), color: 'bg-blue-50 text-blue-700 border-blue-200' },
    minRating > 0 && { label: `${minRating}★ & above`, onRemove: () => setMinRating(0), color: 'bg-amber-100 text-amber-900 border-amber-300' },
  ].filter(Boolean);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm mb-5 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
      {/* Count */}
      <p className="text-stone-600 font-semibold text-sm shrink-0">
        Showing <span className="font-black text-orange-600 text-base">{filteredProducts.length}</span>
        <span className="text-stone-400"> items</span>
      </p>

      {/* Active filter pills */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {activeTags.map((tag, i) => (
            <span key={i} className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-xl border ${tag.color}`}>
              {tag.label}
              <button onClick={tag.onRemove} className="hover:opacity-70 cursor-pointer font-black text-xs leading-none">✕</button>
            </span>
          ))}
          <button onClick={clearAllFilters}
            className="text-xs font-bold text-stone-400 hover:text-orange-600 underline underline-offset-2 transition-colors cursor-pointer">
            Clear all
          </button>
        </div>
      )}

      {/* Sort */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider hidden sm:block">SORT</span>
        <select
          id="sort-select"
          value={sortBy || 'featured'}
          onChange={(e) => setSortBy && setSortBy(e.target.value)}
          className="bg-stone-50 border border-stone-200 text-stone-700 text-sm font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-orange-400 cursor-pointer appearance-none pr-8"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a8a29e' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}>
          <option value="featured">✨ Featured</option>
          <option value="price-asc">↑ Price: Low → High</option>
          <option value="price-desc">↓ Price: High → Low</option>
          <option value="name-asc">A→Z Name</option>
        </select>
      </div>
    </div>
  );
}