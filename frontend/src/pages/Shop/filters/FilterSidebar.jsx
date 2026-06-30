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
    <aside className="w-full flex flex-col gap-3 shrink-0">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FilterIcon className="w-4 h-4 text-stone-700" />
            <h2 className="text-sm font-bold text-slate-800">Filter Products</h2>
            {totalActive > 0 && (
              <span className="w-4 h-4 bg-stone-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalActive}
              </span>
            )}
          </div>
          {totalActive > 0 && (
            <button onClick={clearAll}
              className="text-[11px] font-bold text-stone-700 hover:text-stone-900 cursor-pointer bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200 transition-colors">
              Reset
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* Categories */}
          <div className="border-b border-slate-100 pb-3">
            <CheckboxGroup title="Categories" options={categories} selectedState={selectedCategories} setSelectedState={setSelectedCategories} />
          </div>

          {/* Minimum Rating Filter */}
          <div className="border-b border-slate-100 pb-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1">
                <StarIcon className="w-3.5 h-3.5 text-amber-400" /> Rating
              </h3>
              {minRating > 0 && (
                <button onClick={() => setMinRating(0)} className="text-[10px] font-bold text-stone-600 hover:text-stone-900 cursor-pointer transition-colors">
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-1">
              {ratingOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setMinRating(opt.value)}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 border ${
                    minRating === opt.value
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-stone-400 hover:bg-stone-100'
                  }`}
                >
                  {opt.value > 0 && <StarIcon className="w-3 h-3" filled={true} />}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Needs */}
          <div className="border-b border-slate-100 pb-3">
            <CheckboxGroup title="Dietary Needs" options={diets} selectedState={selectedDiets} setSelectedState={setSelectedDiets} />
          </div>

          {/* Festival / Occasion */}
          <div className="border-b border-slate-100 pb-3">
            <CheckboxGroup title="Occasion" options={festivals} selectedState={selectedFestivals} setSelectedState={setSelectedFestivals} />
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-800 text-xs">Max Price</h3>
              <div className="flex items-center gap-0.5 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-md">
                <span className="text-stone-700 font-bold text-xs">₹</span>
                <input
                  type="number"
                  min="0" max="2000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-12 bg-transparent text-right font-bold text-stone-800 text-xs focus:outline-none appearance-none"
                />
              </div>
            </div>
            <input
              type="range" min="0" max="2000" step="50"
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: '#1c1917' }}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
              <span>₹0</span><span>₹2000</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
