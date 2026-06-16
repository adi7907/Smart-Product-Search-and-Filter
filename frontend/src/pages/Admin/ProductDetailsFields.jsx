import { useState } from 'react';

export default function ProductDetailsFields({ newProduct, setNewProduct }) {
  // 1. Track if the user wants to type a brand new category
  const [isCustom, setIsCustom] = useState(false);

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    if (val === 'Custom') {
      setIsCustom(true);
      setNewProduct({ ...newProduct, category: '' }); // Clear it so they can type
    } else {
      setIsCustom(false);
      setNewProduct({ ...newProduct, category: val });
    }
  };

  return (
    <>
      <div className="md:col-span-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Product Name</label>
        <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
      </div>
      
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Category</label>
        <div className="flex flex-col gap-2">
          {/* Default Dropdown */} 
          <select value={isCustom ? 'Custom' : newProduct.category} onChange={handleCategoryChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer">
            <option value="Pickles">Pickles</option>
            <option value="Sweets">Sweets</option>
            <option value="Snacks">Snacks</option>
            <option value="Spices">Spices</option>
            <option value="Beverages">Beverages</option>
            <option value="Custom">Other (Custom...)</option>
          </select>
          
          {/* Conditional Text Box */}
          {isCustom && (
            <input type="text" required placeholder="Type category..." value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-4 py-2 bg-teal-50 border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-sm font-semibold text-teal-800" />
          )}
        </div>
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Price (₹) & Weight (g)</label>
        <div className="flex gap-2">
          <input type="number" required placeholder="₹" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
          <input type="number" placeholder="g" value={newProduct.weight_g} onChange={e => setNewProduct({...newProduct, weight_g: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
        </div>
      </div>
    </>
  );
}