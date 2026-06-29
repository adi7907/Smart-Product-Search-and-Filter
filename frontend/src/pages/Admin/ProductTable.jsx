import { useState } from 'react';
import { API_URL } from '../../config';
import { StarIcon, PackageIcon } from '../../components/Icons';

export default function ProductTable({ products, fetchProducts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-stone-200 overflow-hidden">
      {/* Search & Filter Header Bar */}
      <div className="p-4 border-b border-stone-100 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h4 className="font-bold text-stone-800 text-sm flex items-center gap-2">
          <PackageIcon className="w-4 h-4 text-orange-600" /> Inventory Catalogue ({filteredProducts.length} / {products.length})
        </h4>
        
        <div className="flex items-center gap-2 flex-wrap">
          <input 
            type="text" 
            placeholder="Search items..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl outline-none focus:border-orange-500 font-semibold w-44"
          />
          <select 
            value={selectedCat} 
            onChange={e => setSelectedCat(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-xl outline-none focus:border-orange-500 font-bold text-stone-700 cursor-pointer"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-stone-600">
          <thead className="bg-stone-100/70 text-[10px] uppercase tracking-wider text-stone-500 font-bold border-b border-stone-200">
            <tr>
              <th className="px-4 py-2.5">Image</th>
              <th className="px-4 py-2.5">Name</th>
              <th className="px-4 py-2.5">Category</th>
              <th className="px-4 py-2.5">Rating</th>
              <th className="px-4 py-2.5">Price</th>
              <th className="px-4 py-2.5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-stone-400">
                  <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center mx-auto mb-2 text-stone-400">
                    <PackageIcon className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-xs text-stone-500">No matching items found.</p>
                </td>
              </tr>
            ) : (
              filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="px-4 py-2">
                    {p.image_url ? (
                      <img src={p.image_url.startsWith('http') ? p.image_url : `${API_URL}${p.image_url}`} alt={p.name} className="w-9 h-9 object-cover rounded-lg border border-stone-200 shadow-2xs" />
                    ) : (
                      <div className="w-9 h-9 bg-stone-100 rounded-lg flex items-center justify-center text-[9px] font-bold text-stone-400 border border-stone-200">No Img</div>
                    )}
                  </td>
                  <td className="px-4 py-2 font-bold text-stone-800 text-xs">{p.name}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-0.5 bg-stone-100 text-stone-700 font-bold text-[10px] rounded-md border border-stone-200/60">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 font-bold text-[10px] px-2 py-0.5 rounded-md border border-amber-200">
                      <StarIcon className="w-3 h-3 text-amber-500" filled={true} /> {p.rating || 4.5}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-bold text-stone-900 text-xs">₹{p.price}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 font-bold text-[11px] bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-red-200/60">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}