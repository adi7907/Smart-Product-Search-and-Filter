import { useState } from 'react';
import ProductDetailModal from './ProductDetailModal';

export default function ProductGrid({ filteredProducts = [], addToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (filteredProducts.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-100 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
        <p className="text-slate-500">Try adjusting your filters or search term to find what you're looking for.</p>
      </main>
    );
  }

  return (
    <>
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border shadow-sm flex flex-col overflow-hidden transition-shadow hover:shadow-md">
            <div className="cursor-pointer" onClick={() => setSelectedProduct(p)}>
              {p.image_url ? (
                <img src={`http://localhost:5000${p.image_url}`} alt={p.name} className="w-full h-32 object-cover" />
              ) : (
                <div className="w-full h-32 bg-slate-100 flex items-center justify-center text-slate-400">No Image</div>
              )}
            </div>
            
            <div className="p-6 flex-1 flex flex-col cursor-pointer" onClick={() => setSelectedProduct(p)}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-slate-800">{p.name}</h3>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-full">{p.category}</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2 mb-4">
                {p.dietary_preference && p.dietary_preference !== 'All' && p.dietary_preference !== 'None specified' && (
                  <span className="text-[10px] font-bold uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                    {p.dietary_preference}
                  </span>
                )}
                {p.festival_need && p.festival_need !== 'All' && p.festival_need !== 'Everyday Use' && (
                  <span className="text-[10px] font-bold uppercase text-pink-600 bg-pink-50 px-2 py-0.5 rounded border border-pink-100">
                    {p.festival_need}
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t mt-auto">
              <div className="flex justify-between items-center mb-4">
                <p className="text-2xl font-extrabold text-teal-700">₹{p.price}</p>
                <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded border">{p.weight_g}g</span>
              </div>
              <button onClick={() => addToCart(p)} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-xl transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </main>

      <ProductDetailModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
    </>
  );
}