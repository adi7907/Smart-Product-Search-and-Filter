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
      <main className="flex-1 flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-stone-200 text-center shadow-sm">
        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-orange-500 shadow-inner">
          <SearchIcon className="w-8 h-8 text-orange-500" />
        </div>
        <h3 className="text-xl font-bold text-stone-800 mb-2">No items match your filter</h3>
        <p className="text-stone-500 text-sm max-w-md">Try removing selected category or dietary filters, or searching for a different keyword.</p>
      </main>
    );
  }

  return (
    <>
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-white rounded-3xl border border-stone-200/80 shadow-md hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1.5">

            {/* Image */}
            <div className="cursor-pointer overflow-hidden relative h-52 bg-stone-100" onClick={() => setSelectedProduct(p)}>
              {resolveImage(p.image_url) ? (
                <img
                  src={resolveImage(p.image_url)}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={e => { e.target.src = 'https://placehold.co/300x200/fdf4f0/ea580c?text=🍽️'; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400 font-medium text-sm">No Image</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-stone-900 font-bold text-xs px-3 py-1.5 rounded-xl shadow-md border border-stone-200/60 flex items-center gap-1.5">
                <TagIcon className="w-3.5 h-3.5 text-orange-600" />
                {p.category}
              </span>

              {/* Wishlist heart */}
              <button
                onClick={(e) => handleWishlist(e, p)}
                className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${wishlisted(p.id) ? 'bg-red-500 text-white scale-110' : 'bg-white/90 text-stone-400 hover:text-red-500 hover:bg-white'}`}
                title="Add to wishlist"
              >
                <HeartIcon className="w-4.5 h-4.5" filled={wishlisted(p.id)} />
              </button>

              <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white font-extrabold text-xs px-2.5 py-1 rounded-lg opacity-90 flex items-center gap-1">
                <StarIcon className="w-3.5 h-3.5 text-amber-400" filled={true} /> {p.rating || 4.5}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col cursor-pointer" onClick={() => setSelectedProduct(p)}>
              <div className="flex justify-between items-start gap-2 mb-1.5">
                <h3 className="font-black text-base text-stone-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-1">{p.name}</h3>
                <span className="text-xs font-bold px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md shrink-0">{p.weight_g}g</span>
              </div>
              <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mt-0.5 mb-4 font-medium">{p.ingredients || p.description || 'Fresh homemade product'}</p>
              
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {p.dietary_preference && p.dietary_preference !== 'All' && p.dietary_preference !== 'None specified' && (
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    Pure • {p.dietary_preference}
                  </span>
                )}
                {p.festival_need && p.festival_need !== 'All' && p.festival_need !== 'Everyday Use' && (
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    Special • {p.festival_need}
                  </span>
                )}
              </div>
            </div>

            {/* Price & Cart Footer */}
            <div className="p-4 px-5 bg-gradient-to-r from-stone-50 to-orange-50/30 border-t border-stone-100 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs text-stone-400 line-through mr-1 font-semibold">₹{Math.round(p.price * 1.2)}</span>
                <span className="text-xl font-black text-stone-900">₹{p.price}</span>
                <span className="ml-1 text-[11px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded">17% off</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                className="px-4 py-2.5 text-white font-extrabold text-xs rounded-xl shadow-md transition-all duration-200 active:scale-95 flex items-center gap-1.5 cursor-pointer hover:scale-105"
                style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}
              >
                <PlusIcon className="w-3.5 h-3.5 stroke-[3]" /> Add
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