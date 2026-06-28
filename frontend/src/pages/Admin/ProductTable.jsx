import { API_URL } from '../../config';
import { StarIcon, PackageIcon } from '../../components/Icons';

export default function ProductTable({ products, fetchProducts }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50 flex items-center justify-between">
        <h4 className="font-extrabold text-stone-800 text-sm flex items-center gap-2">
          <PackageIcon className="w-4 h-4 text-orange-600" /> Current Inventory ({products.length} items)
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-stone-600">
          <thead className="bg-stone-100/70 text-[11px] uppercase tracking-wider text-stone-500 font-extrabold border-b border-stone-200">
            <tr>
              <th className="px-6 py-3.5">Image</th>
              <th className="px-6 py-3.5">Name</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Rating</th>
              <th className="px-6 py-3.5">Price</th>
              <th className="px-6 py-3.5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-stone-400">
                  <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-stone-400">
                    <PackageIcon className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-stone-600">No products found in inventory.</p>
                </td>
              </tr>
            ) : (
              products.map(p => (
                <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="px-6 py-3.5">
                    {p.image_url ? (
                      <img src={p.image_url.startsWith('http') ? p.image_url : `${API_URL}${p.image_url}`} alt={p.name} className="w-12 h-12 object-cover rounded-xl border border-stone-200 shadow-xs" />
                    ) : (
                      <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-[10px] font-bold text-stone-400 border border-stone-200">No Img</div>
                    )}
                  </td>
                  <td className="px-6 py-3.5 font-black text-stone-900">{p.name}</td>
                  <td className="px-6 py-3.5">
                    <span className="px-2.5 py-1 bg-stone-100 text-stone-700 font-bold text-xs rounded-lg border border-stone-200/60">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 font-black text-xs px-2.5 py-1 rounded-lg border border-amber-200">
                      <StarIcon className="w-3.5 h-3.5 text-amber-500" filled={true} /> {p.rating || 4.5}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 font-black text-stone-900 text-base">₹{p.price}</td>
                  <td className="px-6 py-3.5">
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer border border-red-200/60">
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