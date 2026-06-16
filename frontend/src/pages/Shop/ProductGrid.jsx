export default function ProductGrid({ filteredProducts = [] }) {
  if (filteredProducts.length === 0) {
    return (
      <main className="flex-1 bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
        <p className="text-slate-500 text-lg font-medium">No products found matching your filters.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredProducts.map(p => (
        <div key={p.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:-translate-y-1 transition-all flex flex-col overflow-hidden">
          <div className="h-48 bg-slate-100 w-full">
            {p.image_url ? (
              <img src={`http://localhost:5000${p.image_url}`} alt={p.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">No Image</div>
            )}
          </div>
          
          <div className="p-6 flex-1">
            <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full mb-3">{p.category}</span>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{p.name}</h3>
          </div>
          
          <div className="p-6 bg-slate-50 border-t flex justify-between items-center mt-auto">
            <p className="text-2xl font-extrabold text-teal-700">₹{p.price}</p>
            <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded border">{p.weight_g}g</span>
          </div>
        </div>
      ))}
    </main>
  );
}