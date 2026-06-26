import { useState } from 'react';
import ProductDetailModal from './ProductDetailModal';
import { API_URL } from '../../config';

export default function ProductGrid({ filteredProducts = [], addToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (filteredProducts.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-slate-200 text-center shadow-xs">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl mb-4 text-slate-400">
          🔍
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No items match your filter</h3>
        <p className="text-slate-500 text-sm max-w-md">Try removing selected category or dietary filters, or searching for a different product keyword.</p>
      </main>
    );
  }

  return (
    <>
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-600/40 transition-all duration-200 flex flex-col overflow-hidden group">
            
            {/* Image Header */}
            <div className="cursor-pointer overflow-hidden relative h-48 bg-slate-100" onClick={() => setSelectedProduct(p)}>
              {p.image_url ? (
                <img 
                  src={p.image_url.startsWith('http') ? p.image_url : `${API_URL}${p.image_url}`} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">No Image</div>
              )}
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 font-semibold text-[11px] px-2.5 py-1 rounded-md shadow-2xs">
                {p.category}
              </span>
            </div>
            
            {/* Card Body */}
            <div className="p-4 flex-1 flex flex-col cursor-pointer" onClick={() => setSelectedProduct(p)}>
              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className="font-bold text-base text-slate-900 leading-snug group-hover:text-teal-600 transition-colors line-clamp-1">
                  {p.name}
                </h3>
                <span className="text-xs font-semibold text-slate-500 shrink-0">{p.weight_g}g</span>
              </div>
              
              <p className="text-xs text-slate-500 line-clamp-2 mt-1 mb-3">{p.ingredients || p.description || "Traditional homemade specialty"}</p>
              
              <div className="flex flex-wrap gap-1 mt-auto">
                {p.dietary_preference && p.dietary_preference !== 'All' && p.dietary_preference !== 'None specified' && (
                  <span className="text-[10px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                    {p.dietary_preference}
                  </span>
                )}
                {p.festival_need && p.festival_need !== 'All' && p.festival_need !== 'Everyday Use' && (
                  <span className="text-[10px] font-medium text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {p.festival_need}
                  </span>
                )}
              </div>
            </div>

            {/* Price & Cart Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
              <span className="text-lg font-extrabold text-slate-900">₹{p.price}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(p);
                }} 
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors active:scale-95 flex items-center gap-1.5"
              >
                <span>+</span> Add to Cart
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