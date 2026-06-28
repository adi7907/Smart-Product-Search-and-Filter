import CheckboxGroup from './CheckboxGroup';
import { FilterIcon, StarIcon } from '../../../components/Icons';

export default function FilterSidebar({
  searchTerm, setSearchTerm,
  selectedCategories, setSelectedCategories,
  selectedDiets, setSelectedDiets,
  selectedFestivals, setSelectedFestivals,
  maxPrice, setMaxPrice,
  minRating, setMinRating,
  products
}) {
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const diets = [...new Set(products.map(p => p.dietary_preference).filter(Boolean))];
  const festivals = [...new Set(products.map(p => p.festival_need).filter(Boolean))];

  const totalActive = selectedCategories.length + selectedDiets.length + selectedFestivals.length + (maxPrice < 2000 ? 1 : 0) + (minRating > 0 ? 1 : 0);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedDiets([]);
    setSelectedFestivals([]);
    setMaxPrice(2000);
    if (setMinRating) setMinRating(0);
  };

  const ratingOptions = [
    { label: 'All Ratings', value: 0 },
    { label: '4.5★ & above', value: 4.5 },
    { label: '4.0★ & above', value: 4.0 },
    { label: '3.5★ & above', value: 3.5 },
  ];

  return (
    <aside className="w-full flex flex-col gap-4 shrink-0">
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <FilterIcon className="w-5 h-5 text-orange-600" />
            <h2 className="text-base font-black text-stone-900">Filters</h2>
            {totalActive > 0 && (
              <span className="w-5 h-5 bg-orange-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {totalActive}
              </span>
            )}
          </div>
          {totalActive > 0 && (
            <button onClick={clearAll}
              className="text-xs font-bold text-orange-500 hover:text-orange-700 cursor-pointer bg-orange-50 px-3 py-1 rounded-xl border border-orange-200 transition-colors">
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-1">
          {/* Categories */}
          <div className="border-b border-stone-100 pb-4 mb-4">
            <CheckboxGroup title="Categories" options={categories} selectedState={selectedCategories} setSelectedState={setSelectedCategories} />
          </div>

          {/* NEW: Minimum Rating Filter */}
          <div className="border-b border-stone-100 pb-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-extrabold text-stone-800 text-sm flex items-center gap-1.5">
                <StarIcon className="w-4 h-4 text-amber-500" /> Minimum Rating
              </h3>
              {minRating > 0 && (
                <button onClick={() => setMinRating(0)} className="text-[11px] font-bold text-orange-500 hover:text-orange-700 cursor-pointer transition-colors">
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {ratingOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setMinRating(opt.value)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1 border ${
                    minRating === opt.value
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-amber-300 hover:bg-amber-50/50'
                  }`}
                >
                  {opt.value > 0 && <StarIcon className="w-3.5 h-3.5" filled={true} />}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Needs */}
          <div className="border-b border-stone-100 pb-4 mb-4">
            <CheckboxGroup title="Dietary Needs" options={diets} selectedState={selectedDiets} setSelectedState={setSelectedDiets} />
          </div>

          {/* Festival / Occasion */}
          <div className="border-b border-stone-100 pb-4 mb-4">
            <CheckboxGroup title="Festival / Occasion" options={festivals} selectedState={selectedFestivals} setSelectedState={setSelectedFestivals} />
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-stone-800 text-sm">Max Price</h3>
              <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 px-3 py-1 rounded-xl">
                <span className="text-orange-600 font-black text-sm">₹</span>
                <input
                  type="number"
                  min="0" max="2000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-14 bg-transparent text-right font-black text-orange-700 text-sm focus:outline-none appearance-none"
                />
              </div>
            </div>
            <input
              type="range" min="0" max="2000" step="50"
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: '#f97316' }}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs text-stone-400 font-medium mt-1">
              <span>₹0</span><span>₹2000</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
