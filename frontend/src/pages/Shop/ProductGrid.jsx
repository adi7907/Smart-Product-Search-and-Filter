export default function ProductGrid({ filteredProducts = [], addToCart }) {
  // ... existing empty check ...
  return (
    <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredProducts.map(p => (
        <div key={p.id} className="bg-white rounded-2xl border shadow-sm flex flex-col overflow-hidden">
          {/* ... existing image and title code ... */}
          <div className="p-6 bg-slate-50 border-t mt-auto">
            <div className="flex justify-between items-center mb-4">
              <p className="text-2xl font-extrabold text-teal-700">₹{p.price}</p>
              <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded border">{p.weight_g}g</span>
            </div>
            {/* The Checkout Trigger */}
            <button 
              onClick={() => addToCart(p)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-xl transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}