import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../hooks/useWishlist';

function resolveImage(url) {
  if (!url) return 'https://placehold.co/200x200/fdf4f0/ea580c?text=🍽️';
  if (url.startsWith('http') || url.startsWith('/')) return url;
  return url;
}

export default function WishlistPage({ customerAuth, addToCart }) {
  const { getWishlist, toggleWishlist } = useWishlist();
  const [items, setItems] = useState([]);

  useEffect(() => { setItems(getWishlist()); }, []);

  const handleRemove = (product) => {
    toggleWishlist(product);
    setItems(getWishlist());
  };

  if (!customerAuth) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-black text-stone-900 mb-2">Sign in to view wishlist</h2>
          <Link to="/customer-login" className="mt-4 inline-block px-6 py-3 rounded-xl font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="bg-white border-b border-stone-200 px-6 py-5 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/shop" className="text-stone-500 hover:text-orange-600 font-bold text-sm">← Back to Shop</Link>
          <div className="flex-1 text-center">
            <h1 className="font-black text-stone-900 text-xl">❤️ My Wishlist</h1>
          </div>
          <div className="text-stone-400 text-sm font-medium">{items.length} item{items.length !== 1 ? 's' : ''}</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-6">💔</div>
            <h2 className="text-2xl font-black text-stone-900 mb-2">Your wishlist is empty</h2>
            <p className="text-stone-500 mb-8">Tap the ❤️ on any product to save it here.</p>
            <Link to="/shop" className="px-8 py-4 rounded-2xl font-black text-white text-base inline-block shadow-lg"
              style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map(product => (
                <div key={product.id} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <div className="relative" style={{ aspectRatio: '1' }}>
                    <img src={resolveImage(product.image_url)} alt={product.name}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.src = 'https://placehold.co/200x200/fdf4f0/ea580c?text=🍽️'; }} />
                    <button onClick={() => handleRemove(product)}
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-md cursor-pointer">
                      ❤️
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-stone-900 text-sm mb-1 truncate">{product.name}</h3>
                    <p className="text-stone-500 text-xs mb-3">{product.weight_g}g</p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-black text-orange-600 text-base">₹{product.price}</span>
                      <button onClick={() => addToCart && addToCart(product)}
                        className="px-3 py-1.5 rounded-xl font-bold text-white text-xs cursor-pointer shadow-sm"
                        style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>
                        + Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
