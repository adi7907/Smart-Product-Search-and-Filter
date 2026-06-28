import { useState } from 'react';
import { API_URL } from '../../config';
import { useWishlist } from '../../hooks/useWishlist';
import { useToast } from '../../context/ToastContext';

function resolveImage(url) {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('/')) return url;
  return `${API_URL}${url}`;
}

const REVIEWS = [
  { user: 'Priya M.', rating: 5, text: 'Absolutely love this! Exactly like homemade.', date: '2 days ago' },
  { user: 'Rajan S.', rating: 4, text: 'Great quality and freshness. Will order again.', date: '1 week ago' },
];

export default function ProductDetailModal({ isOpen, onClose, product, addToCart }) {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [wishlisted, setWishlisted] = useState(product ? isWishlisted(product?.id) : false);
  const { showToast } = useToast();

  if (!isOpen || !product) return null;

  const imgSrc = resolveImage(product.image_url);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart && addToCart(product);
    showToast(`${product.name.split(' ')[0]} ×${qty} added to cart! 🛒`);
    onClose();
  };

  const handleWishlist = () => {
    const added = toggleWishlist(product);
    setWishlisted(added);
    showToast(added ? `Added to wishlist ❤️` : `Removed from wishlist`, added ? 'success' : 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-pop border border-stone-100"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        <div className="flex flex-col md:flex-row h-full" style={{ maxHeight: '90vh', overflowY: 'auto' }}>

          {/* Image Panel */}
          <div className="w-full md:w-[45%] shrink-0 relative bg-stone-100" style={{ minHeight: '280px' }}>
            {imgSrc ? (
              <img src={imgSrc} alt={product.name} className="w-full h-full object-cover"
                style={{ minHeight: '280px' }}
                onError={e => { e.target.src = 'https://placehold.co/400x400/fdf4f0/ea580c?text=🍽️'; }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl text-stone-300">🍽️</div>
            )}
            {/* Category badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-orange-700 text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-sm border border-orange-100">
              🏷️ {product.category}
            </div>
            {/* Rating */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
              ⭐ 4.8 <span className="opacity-60 font-normal">({REVIEWS.length} reviews)</span>
            </div>
            {/* Close button */}
            <button onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 transition-all shadow-md cursor-pointer font-bold text-sm">
              ✕
            </button>
          </div>

          {/* Content Panel */}
          <div className="flex-1 flex flex-col p-7">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-2xl font-black text-stone-900 leading-tight mb-1">{product.name}</h2>
              <p className="text-stone-500 text-sm font-medium">{product.weight_g}g · Freshly prepared</p>
              <div className="flex items-center gap-3 mt-3">
                <div>
                  <span className="text-xs text-stone-400 line-through font-semibold">₹{Math.round(product.price * 1.2)}</span>
                  <span className="text-3xl font-black text-stone-900 ml-1">₹{product.price}</span>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-extrabold px-2.5 py-1 rounded-xl">17% OFF</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-stone-100 rounded-2xl p-1 mb-5">
              {[['details', '📝 Details'], ['reviews', '⭐ Reviews']].map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)}
                  className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${activeTab === key ? 'bg-white text-orange-600 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}>
                  {label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-1">
              {activeTab === 'details' && (
                <>
                  {product.ingredients && (
                    <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                      <h4 className="font-extrabold text-stone-800 text-xs uppercase tracking-wider mb-2">🌿 Ingredients</h4>
                      <p className="text-stone-600 text-sm leading-relaxed">{product.ingredients}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {product.dietary_preference && product.dietary_preference !== 'None specified' && (
                      <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl">
                        🌱 {product.dietary_preference}
                      </span>
                    )}
                    {product.festival_need && product.festival_need !== 'Everyday Use' && (
                      <span className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-xl">
                        🎉 {product.festival_need}
                      </span>
                    )}
                  </div>
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-1.5">
                    <h4 className="font-extrabold text-stone-800 text-xs uppercase tracking-wider mb-2">📦 Product Info</h4>
                    <div className="flex justify-between text-sm"><span className="text-stone-500">Status</span><span className="text-green-600 font-bold">✅ In Stock</span></div>
                    <div className="flex justify-between text-sm"><span className="text-stone-500">Shelf Life</span><span className="font-semibold text-stone-800">30–60 days</span></div>
                    <div className="flex justify-between text-sm"><span className="text-stone-500">Weight</span><span className="font-semibold text-stone-800">{product.weight_g}g</span></div>
                    <div className="flex justify-between text-sm"><span className="text-stone-500">Made In</span><span className="font-semibold text-stone-800">🇮🇳 India</span></div>
                  </div>
                </>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  {REVIEWS.map((r, i) => (
                    <div key={i} className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-black text-xs">{r.user.charAt(0)}</span>
                          <span className="font-bold text-stone-900 text-sm">{r.user}</span>
                        </div>
                        <span className="text-stone-400 text-xs">{r.date}</span>
                      </div>
                      <div className="flex gap-0.5 mb-1">{Array.from({ length: r.rating }).map((_, j) => <span key={j} className="text-amber-400 text-sm">★</span>)}</div>
                      <p className="text-stone-600 text-sm italic">"{r.text}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Qty + Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Qty:</span>
                <div className="flex items-center gap-2 bg-stone-100 rounded-2xl p-1">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm text-stone-700 font-black hover:bg-stone-50 cursor-pointer text-lg leading-none">−</button>
                  <span className="font-black text-stone-900 w-6 text-center">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 flex items-center justify-center rounded-xl font-black text-white cursor-pointer text-lg leading-none shadow-sm"
                    style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>+</button>
                </div>
                <span className="text-sm text-stone-500 font-medium">= <strong className="text-stone-900">₹{product.price * qty}</strong></span>
              </div>
              <div className="flex gap-2">
                <button onClick={handleWishlist}
                  className={`w-11 h-11 flex items-center justify-center rounded-2xl border-2 transition-all cursor-pointer shrink-0 ${wishlisted ? 'bg-red-50 border-red-300 text-red-500' : 'bg-stone-50 border-stone-200 text-stone-400 hover:border-red-300 hover:text-red-500'}`}>
                  {wishlisted ? '❤️' : '🤍'}
                </button>
                <button onClick={handleAddToCart}
                  className="flex-1 py-3 rounded-2xl font-black text-white text-sm shadow-lg hover:scale-[1.01] active:scale-100 transition-all cursor-pointer"
                  style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>
                  🛒 Add to Cart · ₹{product.price * qty}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
