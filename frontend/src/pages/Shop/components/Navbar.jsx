import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../../hooks/useWishlist';

export default function Navbar({ cartCount, setIsCartOpen, searchTerm, setSearchTerm, isProcessingVision, customerAuth, onLogout }) {
  const { getCount } = useWishlist();
  const [wishlistCount, setWishlistCount] = useState(getCount());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { setWishlistCount(getCount()); }, [customerAuth]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => { onLogout(); setDropdownOpen(false); navigate('/'); };

  return (
    <nav className="bg-white/98 backdrop-blur-md sticky top-0 z-40 border-b border-stone-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img src="/logo.png" alt="Sharadha Stores Logo"
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm" />
          <div className="hidden sm:block">
            <h1 className="text-xl font-black tracking-tight text-stone-900 leading-none">
              SHARADHA <span className="text-orange-600">STORES</span>
            </h1>
            <span className="text-[10px] font-extrabold tracking-wider text-emerald-700 uppercase mt-0.5 block">
              Homemade • Traditional • Authentic
            </span>
          </div>
        </Link>

        {/* Search bar */}
        {setSearchTerm && (
          <div className="flex-1 max-w-xl mx-4 relative min-w-[200px] hidden sm:block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 font-bold text-base pointer-events-none">🔍</span>
            <input
              type="text"
              placeholder="Search pickles, sweets, snacks..."
              className="w-full pl-11 pr-11 py-2.5 bg-stone-100 hover:bg-stone-200/60 focus:bg-white text-stone-800 placeholder-stone-400 font-semibold text-sm rounded-2xl border border-transparent focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15 transition-all outline-none"
              value={searchTerm || ''}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => { const el = document.getElementById('visual-search-upload'); if (el) el.click(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-stone-400 hover:text-orange-600 transition-colors bg-white rounded-xl shadow-sm hover:shadow cursor-pointer"
              title="Visual Search" disabled={isProcessingVision}>
              {isProcessingVision
                ? <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                : <span className="text-sm">📷</span>}
            </button>
          </div>
        )}

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Wishlist */}
          <Link to="/wishlist" className="relative p-2.5 rounded-xl text-stone-600 hover:text-red-500 hover:bg-red-50 transition-all hidden sm:flex items-center" title="Wishlist">
            <span className="text-xl">❤️</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] px-1">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Customer Auth */}
          {customerAuth ? (
            <div ref={dropRef} className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-orange-50 border border-orange-200 hover:border-orange-400 px-3 py-2 rounded-2xl transition-all cursor-pointer">
                <span className="w-7 h-7 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-black text-xs shadow-sm">
                  {customerAuth.name.charAt(0).toUpperCase()}
                </span>
                <span className="text-orange-900 text-xs font-bold max-w-[70px] truncate hidden sm:block">
                  {customerAuth.name.split(' ')[0]}
                </span>
                <span className="text-stone-400 text-xs">{dropdownOpen ? '▲' : '▼'}</span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-stone-100 py-2 z-50"
                  style={{ animation: 'menuIn 0.15s ease' }}>
                  <style>{`@keyframes menuIn { from { transform:translateY(-8px);opacity:0 } to { transform:translateY(0);opacity:1 } }`}</style>

                  <div className="px-4 py-3 border-b border-stone-100">
                    <div className="font-black text-stone-900 text-sm truncate">{customerAuth.name}</div>
                    <div className="text-stone-400 text-xs truncate">{customerAuth.email}</div>
                  </div>

                  {[
                    { icon: '👤', label: 'My Profile', to: '/profile' },
                    { icon: '📦', label: 'My Orders', to: '/orders' },
                    { icon: '❤️', label: 'Wishlist', to: '/wishlist' },
                    { icon: '🏠', label: 'Home', to: '/' },
                  ].map(item => (
                    <Link key={item.to} to={item.to} onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm font-semibold">
                      <span>{item.icon}</span>{item.label}
                    </Link>
                  ))}

                  <div className="border-t border-stone-100 mt-1 pt-1">
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-sm font-bold cursor-pointer">
                      <span>🚪</span>Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/customer-login"
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-extrabold text-xs rounded-2xl border border-stone-200 transition-all flex items-center gap-1.5 hover:scale-105">
              <span>👤</span> Sign In
            </Link>
          )}

          {/* Cart */}
          <button onClick={() => setIsCartOpen(true)}
            className="relative px-4 py-2.5 text-white font-extrabold text-sm rounded-2xl shadow-md hover:shadow-orange-500/30 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>
            <span className="text-base">🛒</span>
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-white text-orange-700 px-2 py-0.5 rounded-full text-xs font-black shadow-inner">{cartCount}</span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-xl bg-stone-100 text-stone-700 font-bold cursor-pointer">
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-stone-200 px-5 py-4 space-y-3">
          {setSearchTerm && (
            <input type="text" placeholder="Search products..." value={searchTerm || ''} onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 bg-stone-100 rounded-2xl text-sm font-semibold text-stone-800 placeholder-stone-400 outline-none focus:border-orange-400 border border-transparent focus:border" />
          )}
          <div className="grid grid-cols-2 gap-2">
            {customerAuth ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-3 bg-stone-50 rounded-2xl text-sm font-bold text-stone-700">👤 Profile</Link>
                <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-3 bg-stone-50 rounded-2xl text-sm font-bold text-stone-700">📦 Orders</Link>
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-3 bg-stone-50 rounded-2xl text-sm font-bold text-stone-700">❤️ Wishlist ({wishlistCount})</Link>
                <button onClick={handleLogout} className="flex items-center gap-2 p-3 bg-red-50 rounded-2xl text-sm font-bold text-red-600 cursor-pointer">🚪 Sign Out</button>
              </>
            ) : (
              <Link to="/customer-login" onClick={() => setMobileMenuOpen(false)} className="col-span-2 flex items-center justify-center gap-2 p-3 rounded-2xl text-sm font-black text-white" style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>
                👤 Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
