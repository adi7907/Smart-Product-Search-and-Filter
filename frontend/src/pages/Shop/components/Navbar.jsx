import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../../../hooks/useWishlist';
import { API_URL } from '../../../config';
import { useToast } from '../../../context/ToastContext';
import { ScanSearchIcon, SearchIcon, HeartIcon, CartIcon, UserIcon, PackageIcon, HomeIcon, LogOutIcon, MenuIcon, CloseIcon, SettingsIcon } from '../../../components/Icons';

export default function Navbar({ cartCount, setIsCartOpen, searchTerm, setSearchTerm, isProcessingVision, customerAuth, onLogout }) {
  const { getCount } = useWishlist();
  const [wishlistCount, setWishlistCount] = useState(getCount());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [scanMode, setScanMode] = useState('choice');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [urlLoading, setUrlLoading] = useState(false);
  const { showToast } = useToast();
  const dropRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const i = setInterval(() => setWishlistCount(getCount()), 600);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => { onLogout(); setDropdownOpen(false); navigate('/'); };

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <img src="/logo.png" alt="Sharadha Stores Logo"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          <div className="hidden sm:block">
            <h1 className="text-base font-extrabold tracking-tight text-slate-900 leading-none">
              SHARADHA <span className="text-teal-600">STORES</span>
            </h1>
            <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase mt-0.5 block">
              Traditional • Authentic
            </span>
          </div>
        </Link>

        {/* Search bar */}
        {setSearchTerm && (
          <div className="flex-1 max-w-lg mx-3 relative min-w-[180px] hidden sm:block">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <SearchIcon className="w-3.5 h-3.5 text-teal-600" />
            </span>
            <input
              type="text"
              placeholder="Search spices, savories, snacks..."
              className="w-full pl-9 pr-10 py-1.5 bg-slate-100 hover:bg-slate-200/60 focus:bg-white text-slate-800 placeholder-slate-400 font-medium text-xs rounded-xl border border-transparent focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15 transition-all outline-none"
              value={searchTerm || ''}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => setShowScanModal(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-teal-600 hover:bg-teal-50 transition-all bg-white rounded-lg shadow-xs cursor-pointer flex items-center justify-center border border-slate-200/60"
              title="Scan / Visual Search" disabled={isProcessingVision || urlLoading}>
              {isProcessingVision
                ? <div className="w-3.5 h-3.5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                : <ScanSearchIcon className="w-3.5 h-3.5 text-slate-600 hover:text-teal-600" />}
            </button>
          </div>
        )}

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Wishlist */}
          <Link to="/wishlist" className="relative p-2 rounded-xl text-slate-600 hover:text-red-500 hover:bg-red-50 transition-all hidden sm:flex items-center" title="Wishlist">
            <HeartIcon className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center min-w-[16px] px-1 shadow-xs">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Customer Auth */}
          {customerAuth ? (
            <div className="relative" ref={dropRef}>
              <button onClick={() => setDropdownOpen(o => !o)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 transition-all cursor-pointer border border-slate-200/60">
                <span className="w-5 h-5 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-[10px]">
                  {customerAuth.name.charAt(0).toUpperCase()}
                </span>
                <span className="font-bold text-slate-700 text-xs hidden md:inline max-w-[100px] truncate">
                  {customerAuth.name.split(' ')[0]}
                </span>
                <span className="text-slate-400 text-[10px]">{dropdownOpen ? '▲' : '▼'}</span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-pop">
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <div className="font-bold text-slate-900 text-xs truncate">{customerAuth.name}</div>
                    <div className="text-slate-400 text-[11px] truncate">{customerAuth.email}</div>
                  </div>

                  {[
                    { icon: <UserIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-600" />, label: 'My Profile', to: '/profile' },
                    { icon: <PackageIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-600" />, label: 'My Orders', to: '/orders' },
                    { icon: <HeartIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-600" />, label: 'Wishlist', to: '/wishlist' },
                    { icon: <SettingsIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-600" />, label: 'App Settings', to: '/settings' },
                    { icon: <HomeIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-600" />, label: 'Home', to: '/' },
                  ].map(item => (
                    <Link key={item.to} to={item.to} onClick={() => setDropdownOpen(false)}
                      className="group flex items-center gap-2.5 px-3.5 py-2 text-slate-700 hover:bg-teal-50 hover:text-teal-600 transition-colors text-xs font-semibold">
                      {item.icon}{item.label}
                    </Link>
                  ))}

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button onClick={handleLogout}
                      className="group w-full flex items-center gap-2.5 px-3.5 py-2 text-red-600 hover:bg-red-50 transition-colors text-xs font-bold cursor-pointer">
                      <LogOutIcon className="w-3.5 h-3.5 text-red-500 group-hover:text-red-600" />Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/customer-login"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-all flex items-center gap-1.5">
              <UserIcon className="w-3.5 h-3.5 text-slate-600" /> Sign In
            </Link>
          )}

          {/* Cart */}
          <button onClick={() => setIsCartOpen(true)}
            className="relative px-3.5 py-1.5 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow-teal-600/20 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)' }}>
            <CartIcon className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-white text-teal-800 px-1.5 py-0.5 rounded-full text-[10px] font-black shadow-inner">{cartCount}</span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer hover:bg-slate-200 transition-colors">
            {mobileMenuOpen ? <CloseIcon className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2.5 animate-fade-in">
          {setSearchTerm && (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <SearchIcon className="w-3.5 h-3.5 text-teal-600" />
              </span>
              <input type="text" placeholder="Search products..." value={searchTerm || ''} onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-9 py-2 bg-slate-100 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 border border-transparent" />
              <button
                onClick={() => { setShowScanModal(true); setMobileMenuOpen(false); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-600 hover:text-teal-600 bg-white rounded-lg shadow-xs cursor-pointer flex items-center justify-center">
                <ScanSearchIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {customerAuth ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl text-xs font-bold text-slate-700"><UserIcon className="w-3.5 h-3.5 text-slate-500" /> Profile</Link>
                <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl text-xs font-bold text-slate-700"><PackageIcon className="w-3.5 h-3.5 text-slate-500" /> Orders</Link>
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl text-xs font-bold text-slate-700"><HeartIcon className="w-3.5 h-3.5 text-slate-500" /> Wishlist ({wishlistCount})</Link>
                <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl text-xs font-bold text-slate-700"><SettingsIcon className="w-3.5 h-3.5 text-slate-500" /> Settings</Link>
                <button onClick={handleLogout} className="col-span-2 flex items-center justify-center gap-2 p-2.5 bg-red-50 rounded-xl text-xs font-bold text-red-600 cursor-pointer"><LogOutIcon className="w-3.5 h-3.5 text-red-500" /> Sign Out</button>
              </>
            ) : (
              <Link to="/customer-login" onClick={() => setMobileMenuOpen(false)} className="col-span-2 flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)' }}>
                <UserIcon className="w-3.5 h-3.5 text-white" /> Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Choice Modal for Scan or Link */}
      {showScanModal && (
        <div 
          onClick={(e) => { if (e.target === e.currentTarget) { setShowScanModal(false); setScanMode('choice'); } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200 animate-pop max-h-[90vh] flex flex-col">
            <div className="bg-stone-900 p-4 sm:p-5 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📸</span>
                <div>
                  <h3 className="font-black text-base">Visual & Image Search</h3>
                  <p className="text-stone-300 text-xs">Search homemade sweets, pickles & snacks</p>
                </div>
              </div>
              <button 
                onClick={() => { setShowScanModal(false); setScanMode('choice'); }} 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold cursor-pointer transition-colors"
                title="Close"
              >✕</button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto">
              {scanMode === 'choice' ? (
                <div className="space-y-3">
                  <p className="text-slate-600 text-xs font-medium text-center mb-1">Choose how you want to provide the food image:</p>
                  
                  {/* Option 1: Native file input label (works on desktop & phone library) */}
                  <label className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-stone-200 hover:border-stone-800 hover:bg-stone-50 transition-all group cursor-pointer text-left shadow-xs block">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setShowScanModal(false);
                        const formData = new FormData();
                        formData.append('image', file);
                        showToast('Scanning image with AI Vision... 📸', 'info');
                        try {
                          const res = await fetch(`${API_URL}/api/visual-search`, { method: 'POST', body: formData });
                          const data = await res.json();
                          if (data.search_term) {
                            if (setSearchTerm) setSearchTerm(data.search_term);
                            showToast(`Identified "${data.search_term}"! 🔍`, 'success');
                            navigate('/shop');
                          }
                        } catch (err) {
                          console.error(err);
                          showToast('Visual search failed. Try again.', 'error');
                        }
                      }}
                    />
                    <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform font-bold">
                      📁
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm group-hover:text-stone-900">Upload / Browse Photo</div>
                      <div className="text-slate-500 text-xs">Choose image from gallery or device</div>
                    </div>
                  </label>

                  {/* Option 2: Native direct phone camera input */}
                  <label className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-stone-200 hover:border-stone-800 hover:bg-stone-50 transition-all group cursor-pointer text-left shadow-xs block sm:hidden">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setShowScanModal(false);
                        const formData = new FormData();
                        formData.append('image', file);
                        showToast('Scanning live photo with AI Vision... 📸', 'info');
                        try {
                          const res = await fetch(`${API_URL}/api/visual-search`, { method: 'POST', body: formData });
                          const data = await res.json();
                          if (data.search_term) {
                            if (setSearchTerm) setSearchTerm(data.search_term);
                            showToast(`Identified "${data.search_term}"! 🔍`, 'success');
                            navigate('/shop');
                          }
                        } catch (err) {
                          console.error(err);
                          showToast('Visual search failed. Try again.', 'error');
                        }
                      }}
                    />
                    <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform font-bold">
                      📷
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm group-hover:text-stone-900">Take Live Camera Photo</div>
                      <div className="text-slate-500 text-xs">Scan food dish directly using phone camera</div>
                    </div>
                  </label>

                  {/* Option 3: Paste Image URL */}
                  <button
                    onClick={() => setScanMode('url')}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-stone-200 hover:border-stone-800 hover:bg-stone-50 transition-all group cursor-pointer text-left shadow-xs">
                    <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform font-bold">
                      🔗
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm group-hover:text-stone-900">Paste Image URL / Link</div>
                      <div className="text-slate-500 text-xs">Search using web link of any food dish</div>
                    </div>
                  </button>

                  {/* Bottom Close Button / Cross Option */}
                  <button
                    type="button"
                    onClick={() => { setShowScanModal(false); setScanMode('choice'); }}
                    className="w-full mt-3 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors border border-stone-300"
                  >
                    ✕ Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!imageUrlInput.trim()) return;
                  setUrlLoading(true);
                  showToast('Analyzing image web link... 🔍', 'info');
                  try {
                    const res = await fetch(`${API_URL}/api/visual-search`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ image_url: imageUrlInput.trim() })
                    });
                    const data = await res.json();
                    if (data.search_term) {
                      if (setSearchTerm) setSearchTerm(data.search_term);
                      showToast(`Identified "${data.search_term}"! 🔍`, 'success');
                      setShowScanModal(false);
                      setScanMode('choice');
                      setImageUrlInput('');
                      navigate('/shop');
                    }
                  } catch (err) {
                    console.error(err);
                    showToast('Failed to analyze image link.', 'error');
                  } finally {
                    setUrlLoading(false);
                  }
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Paste Image Web Link</label>
                    <input
                      type="url"
                      required
                      placeholder="https://example.com/images/samosa.jpg"
                      value={imageUrlInput}
                      onChange={e => setImageUrlInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-stone-800 focus:ring-2 focus:ring-stone-800/20 text-xs font-medium outline-none text-slate-800"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setScanMode('choice')}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-bold text-xs hover:bg-slate-100 cursor-pointer">
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={urlLoading}
                      className="flex-1 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-md cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2">
                      {urlLoading ? 'Analyzing AI Vision...' : 'Search Food by Link 🔍'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
