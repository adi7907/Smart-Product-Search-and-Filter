import CheckboxGroup from './CheckboxGroup';

export default function FilterSidebar({
  searchTerm, setSearchTerm,
  selectedCategories, setSelectedCategories,
  selectedDiets, setSelectedDiets,
  selectedFestivals, setSelectedFestivals,
  maxPrice, setMaxPrice, products
}) {
  const categories = [...new Set([
    ...products.map(p => p.category), 
    "Spices", "Flours", "Grains", "Ready to Eat", "Dairy", "Bakery", 
    "Condiments", "Sauces", "Dry Fruits", "Herbs", "Nuts", "Breakfast", 
    "Desserts", "Oils", "Jams"
  ])];
  const diets = [...new Set(products.map(p => p.dietary_preference).filter(Boolean))];
  const festivals = [...new Set(products.map(p => p.festival_need).filter(Boolean))];

  return (
    <aside className="w-full md:w-64 flex flex-col gap-6 shrink-0">
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border dark:border-slate-800 shadow-sm transition-colors sticky top-4">
        <h2 className="text-lg font-black text-slate-800 dark:text-white mb-4">Filters</h2>
        
        <CheckboxGroup title="Categories" options={categories} selectedState={selectedCategories} setSelectedState={setSelectedCategories} />
        <CheckboxGroup title="Dietary Needs" options={diets} selectedState={selectedDiets} setSelectedState={setSelectedDiets} />
        <CheckboxGroup title="Festival Needs" options={festivals} selectedState={selectedFestivals} setSelectedState={setSelectedFestivals} />

        <div>
          <label className="font-bold text-slate-800 dark:text-white flex justify-between mb-3">
            <span>Max Price</span>
            <span className="text-teal-600 dark:text-teal-400">₹{maxPrice}</span>
          </label>
          <input 
            type="range" min="0" max="2000" step="50"
            className="w-full accent-teal-600"
            value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
    </aside>
  );
}
