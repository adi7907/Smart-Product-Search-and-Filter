import { useState } from 'react';
import { StarIcon } from '../../components/Icons';

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
      {/* Name & Category */}
      <div className="md:col-span-2">
        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Product Name</label>
        <input type="text" required placeholder="e.g., Spicy Garlic Pickle" value={newProduct.name || ''} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-orange-500 font-semibold text-sm transition-colors" />
      </div>
      <div>
        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Category</label>
        <select value={isCustom ? 'Custom' : (newProduct.category || 'Pickles')} onChange={handleCategoryChange} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-orange-500 font-semibold text-sm transition-colors cursor-pointer">
          <option value="Pickles">Pickles</option>
          <option value="Sweets">Sweets</option>
          <option value="Snacks">Snacks</option>
          <option value="Beverages">Beverages</option>
          <option value="Pantry">Pantry</option>
          <option value="Spices">Spices</option>
          <option value="Custom">Other (Custom...)</option>
        </select>
        {isCustom && <input type="text" required placeholder="Type category..." value={newProduct.category || ''} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full mt-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-xl outline-none font-bold text-sm text-orange-800" />}
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Price (₹) & Weight (g)</label>
        <div className="flex gap-2">
          <input type="number" required placeholder="Price ₹" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-orange-500 font-semibold text-sm" />
          <input type="number" placeholder="Weight g" value={newProduct.weight_g || ''} onChange={e => setNewProduct({...newProduct, weight_g: e.target.value})} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-orange-500 font-semibold text-sm" />
        </div>
      </div>

      {/* NEW: Rating Input */}
      <div>
        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2 flex items-center gap-1">
          <StarIcon className="w-3.5 h-3.5 text-amber-500" /> Initial Rating (1–5★)
        </label>
        <input 
          type="number" 
          step="0.1" 
          min="1.0" 
          max="5.0" 
          required 
          placeholder="4.8" 
          value={newProduct.rating || ''} 
          onChange={e => setNewProduct({...newProduct, rating: e.target.value})} 
          className="w-full px-4 py-2.5 bg-amber-50/50 border border-amber-200 text-amber-900 font-black rounded-xl outline-none focus:border-amber-500 text-sm" 
        />
      </div>

      {/* Dietary & Festival */}
      <div className="md:col-span-2">
        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Dietary Preference</label>
        <select value={newProduct.dietary_preference || ''} onChange={e => setNewProduct({...newProduct, dietary_preference: e.target.value})} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-orange-500 font-semibold text-sm cursor-pointer">
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Sugar-Free">Sugar-Free</option>
          <option value="Gluten-Free">Gluten-Free</option>
          <option value="None specified">None specified</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Festival / Occasion</label>
        <select value={newProduct.festival_need || ''} onChange={e => setNewProduct({...newProduct, festival_need: e.target.value})} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-orange-500 font-semibold text-sm cursor-pointer">
          <option value="Everyday Use">Everyday Use</option>
          <option value="Diwali Special">Diwali Special</option>
          <option value="Party Need">Party Need</option>
          <option value="Navratri Fasting">Navratri Fasting</option>
        </select>
      </div>
    </>
  );
}