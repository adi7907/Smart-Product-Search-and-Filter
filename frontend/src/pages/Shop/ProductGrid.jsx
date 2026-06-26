import { useState } from 'react';
import ProductDetailModal from './ProductDetailModal';
import { API_URL } from '../../config';

export default function ProductGrid({ filteredProducts = [], addToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (filteredProducts.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-slate-200/80 text-center shadow-xs">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-4xl mb-4">
          🔍
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">No delicious items found</h3>
        <p className="text-slate-500 text-sm max-w-md">We couldn't find anything matching your current filters. Try removing some filters or searching for something else!</p>
      </main>
    );
  }

  return (
    <>
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p, idx) => {
          const rating = (4.4 + ((p.id || idx) % 6) * 0.1).toFixed(1);
          const reviewCount = ((p.id || idx) * 123 + 45) % 900 + 100;
          const origPrice = Math.round(p.price * 1.25);
          const deliveryMins = 12 + ((p.id || idx) % 15);

          return (
            <div key={p.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200/60 transition-all duration-300 flex flex-col overflow-hidden group">
              
              {/* Image Header with Promos */}
              <div className="cursor-pointer overflow-hidden relative h-48 bg-slate-100" onClick={() => setSelectedProduct(p)}>
                <img 
                  src={p.image_url.startsWith('http') ? p.image_url : `${API_URL}${p.image_url}`} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                
                {/* Discount Banner Bottom Left */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <span className="bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wider">
                    20% OFF
                  </span>
                  {idx % 3 === 0 && (
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-tight shadow-md">
                      ✨ Bestseller
                    </span>
                  )}
                </div>

                {/* Delivery Time Top Right */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-black text-slate-800 shadow-sm flex items-center gap-1">
                  <span>⚡</span>
                  <span>{deliveryMins} mins</span>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col cursor-pointer" onClick={() => setSelectedProduct(p)}>
                
                {/* Veg Dot + Rating Star */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-emerald-600 p-0.5 rounded-xs flex items-center justify-center shrink-0" title="100% Vegetarian">
                      <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                    </span>
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">{p.category}</span>
                  </div>
                  <div className="bg-emerald-700 text-white px-2 py-0.5 rounded-lg text-xs font-black flex items-center gap-1 shadow-2xs">
                    <span>★</span>
                    <span>{rating}</span>
                    <span className="text-[9px] font-normal opacity-80">({reviewCount})</span>
                  </div>
                </div>

                <h3 className="font-black text-base text-slate-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                  {p.name}
                </h3>
                
                <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">{p.ingredients || "Handcrafted traditional family recipe"}</p>
              </div>

              {/* Pricing & Add Button Footer */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-4 mt-auto">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-slate-400 line-through font-bold">₹{origPrice}</span>
                    <span className="text-lg font-black text-slate-900">₹{p.price}</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-600">{p.weight_g}g pack</span>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                  }} 
                  className="px-6 py-2.5 bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white font-black text-xs rounded-xl border border-orange-200 hover:border-transparent transition-all shadow-xs hover:shadow-lg hover:shadow-orange-500/20 active:scale-95 uppercase tracking-wider"
                >
                  ADD
                </button>
              </div>

            </div>
          );
        })}
      </main>

      <ProductDetailModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
    </>
  );
}