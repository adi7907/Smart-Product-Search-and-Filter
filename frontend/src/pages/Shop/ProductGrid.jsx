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
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-gradient-to-b from-white to-slate-50/90 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-teal-500 transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1.5">
            
            {/* Image Header */}
            <div className="cursor-pointer overflow-hidden relative h-52 bg-slate-100" onClick={() => setSelectedProduct(p)}>
              {p.image_url ? (
                <img 
                  src={p.image_url.startsWith('http') ? p.image_url : `${API_URL}${p.image_url}`} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">No Image</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-slate-900 font-bold text-xs px-3 py-1.5 rounded-xl shadow-md border border-slate-100">
                🏷️ {p.category}
              </span>
              <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white font-extrabold text-xs px-2.5 py-1 rounded-lg opacity-90">
                ⭐ 4.8
              </span>
            </div>
            
            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col cursor-pointer bg-white" onClick={() => setSelectedProduct(p)}>
              <div className="flex justify-between items-start gap-2 mb-1.5">
                <h3 className="font-extrabold text-base text-slate-900 leading-snug group-hover:text-teal-600 transition-colors line-clamp-1">
                  {p.name}
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md shrink-0">{p.weight_g}g</span>
              </div>
              
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-0.5 mb-4">{p.ingredients || p.description || "Fresh supermarket household essential"}</p>
              
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {p.dietary_preference && p.dietary_preference !== 'All' && p.dietary_preference !== 'None specified' && (
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 shadow-2xs">
                    🌱 {p.dietary_preference}
                  </span>
                )}
                {p.festival_need && p.festival_need !== 'All' && p.festival_need !== 'Everyday Use' && (
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs">
                    🎉 {p.festival_need}
                  </span>
                )}
              </div>
            </div>

            {/* Price & Cart Footer */}
            <div className="p-4 px-5 bg-gradient-to-r from-slate-50 to-teal-50/30 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
              <div>
                <span className="text-xs text-slate-400 line-through mr-1 font-semibold">₹{Math.round(p.price * 1.2)}</span>
                <span className="text-xl font-black text-slate-900">₹{p.price}</span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(p);
                }} 
                className="px-4 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-teal-500/30 transition-all duration-200 active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <span className="text-sm font-black">+</span> Add
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