import { useState } from 'react';

export default function ProductDetailsFields({ newProduct, setNewProduct }) {
  const [isCustom, setIsCustom] = useState(false);

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    if (val === 'Custom') {
      setIsCustom(true);
      setNewProduct({ ...newProduct, category: '' });
    } else {
      setIsCustom(false);
      setNewProduct({ ...newProduct, category: val });
    }
  };

  return (
    <>
      {/* Existing Name & Category */}
      <div className="md:col-span-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Product Name</label>
        <input type="text" required value={newProduct.name || ''} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Category</label>
        <select value={isCustom ? 'Custom' : (newProduct.category || 'Pickles')} onChange={handleCategoryChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none">
          <option value="Pickles">Pickles</option>
          <option value="Sweets">Sweets</option>
          <option value="Snacks">Snacks</option>
          <option value="Custom">Other (Custom...)</option>
        </select>
        {isCustom && <input type="text" required placeholder="Type category..." value={newProduct.category || ''} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full mt-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-xl outline-none text-sm" />}
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Price (₹) & Weight (g)</label>
        <div className="flex gap-2">
          <input type="number" required placeholder="₹" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none" />
          <input type="number" placeholder="g" value={newProduct.weight_g || ''} onChange={e => setNewProduct({...newProduct, weight_g: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none" />
        </div>
      </div>

      {/* NEW: The Advanced Day 13 Filters */}
      <div className="md:col-span-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Dietary Preference</label>
        <select value={newProduct.dietary_preference || ''} onChange={e => setNewProduct({...newProduct, dietary_preference: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none">
          <option value="">None specified</option>
          <option value="Vegan">Vegan</option>
          <option value="Sugar-Free">Sugar-Free</option>
          <option value="Gluten-Free">Gluten-Free</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Festival Need</label>
        <select value={newProduct.festival_need || ''} onChange={e => setNewProduct({...newProduct, festival_need: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none">
          <option value="">Everyday Use</option>
          <option value="Diwali Special">Diwali Special</option>
          <option value="Navratri Fasting">Navratri Fasting</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Ingredients Note</label>
        <input type="text" placeholder="e.g., Contains Nuts" value={newProduct.ingredients || ''} onChange={e => setNewProduct({...newProduct, ingredients: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none" />
      </div>
    </>
  );
}