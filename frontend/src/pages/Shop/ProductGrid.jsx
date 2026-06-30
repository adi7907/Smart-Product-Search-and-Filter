import { useState } from 'react';
import ProductDetailModal from './ProductDetailModal';
import { API_URL } from '../../config';
import { useWishlist } from '../../hooks/useWishlist';
import { TagIcon, StarIcon, HeartIcon, PlusIcon, SearchIcon } from '../../components/Icons';

function resolveImage(url) {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('/')) return url;
  return `${API_URL}${url}`;
}

export default function ProductGrid({ filteredProducts = [], addToCart, customerAuth, showToast }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [wishlistState, setWishlistState] = useState({});

  const handleWishlist = (e, product) => {
    e.stopPropagation();
    const added = toggleWishlist(product);
    setWishlistState(prev => ({ ...prev, [product.id]: added }));
    if (showToast) showToast(added ? `${product.name.split(' ')[0]} added to wishlist ❤️` : `Removed from wishlist`, added ? 'success' : 'info');
  };

  const wishlisted = (id) => wishlistState[id] !== undefined ? wishlistState[id] : isWishlisted(id);

  if (filteredProducts.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
        <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-3 text-teal-600 shadow-inner">
          <SearchIcon className="w-6 h-6 text-teal-600" />
        </div>
        <h3 className="text-base font-bold text-slate-800 mb-1">No items match your filters</h3>
        <p className="text-slate-500 text-xs max-w-sm">Try resetting filters or searching for a different item.</p>
      </main>
    );
  }

  return (
    <>
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-1">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-teal-400 transition-all duration-200 flex flex-col overflow-hidden group hover:-translate-y-1">

            {/* Image */}
            <div className="cursor-pointer overflow-hidden relative h-40 bg-slate-100" onClick={() => setSelectedProduct(p)}>
              {resolveImage(p.image_url) ? (
                <img
                  src={resolveImage(p.image_url)}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={e => { e.target.src = 'https://placehold.co/300x200/f8fafc/0d9488?text=🍽️'; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-xs">No Image</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-md text-slate-800 font-bold text-[10px] px-2.5 py-1 rounded-lg shadow-xs border border-slate-200/60 flex items-center gap-1">
                <TagIcon className="w-3 h-3 text-teal-600" />
                {p.category}
              </span>

              {/* Wishlist heart */}
              <button
                onClick={(e) => handleWishlist(e, p)}
                className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer ${wishlisted(p.id) ? 'bg-red-500 text-white scale-105' : 'bg-white/90 text-slate-400 hover:text-red-500 hover:bg-white'}`}
                title="Add to wishlist"
              >
                <HeartIcon className="w-3.5 h-3.5" filled={wishlisted(p.id)} />
              </button>

              <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white font-bold text-[10px] px-2 py-0.5 rounded opacity-90 flex items-center gap-1">
                <StarIcon className="w-3 h-3 text-amber-400" filled={true} /> {p.rating || 4.5}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-3.5 flex-1 flex flex-col cursor-pointer" onClick={() => setSelectedProduct(p)}>
              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className="font-bold text-sm text-slate-800 leading-snug group-hover:text-teal-600 transition-colors line-clamp-1">{p.name}</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded shrink-0">{p.weight_g}g</span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3 font-medium">{p.ingredients || p.description || 'Authentic traditional recipe'}</p>
              
              <div className="flex flex-wrap gap-1 mt-auto">
                {p.dietary_preference && p.dietary_preference !== 'All' && p.dietary_preference !== 'None specified' && (
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    Pure • {p.dietary_preference}
                  </span>
                )}
                {p.festival_need && p.festival_need !== 'All' && p.festival_need !== 'Everyday Use' && (
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {p.festival_need}
                  </span>
                )}
              </div>
            </div>

            {/* Price & Cart Footer */}
            <div className="p-3 px-3.5 bg-gradient-to-r from-slate-50 to-teal-50/30 border-t border-slate-100 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] text-slate-400 line-through mr-1 font-semibold">₹{Math.round(p.price * 1.2)}</span>
                <span className="text-base font-extrabold text-slate-900">₹{p.price}</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                className="px-3 py-1.5 text-white font-bold text-xs rounded-lg shadow-xs transition-all duration-200 active:scale-95 flex items-center gap-1 cursor-pointer hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)' }}
              >
                <PlusIcon className="w-3 h-3 stroke-[3]" /> Add
              </button>
            </div>

          </div>
        ))}
      </main>

      <ProductDetailModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
        addToCart={addToCart}
      />
    </>
  );
}