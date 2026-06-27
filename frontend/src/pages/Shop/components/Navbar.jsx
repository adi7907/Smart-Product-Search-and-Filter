import { Link } from 'react-router-dom';

export default function Navbar({ cartCount, setIsCartOpen, searchTerm, setSearchTerm, isProcessingVision, customerAuth, onLogout }) {
  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-40 px-6 py-3.5 shadow-sm border-b border-orange-100/80 flex flex-wrap justify-between items-center gap-4 transition-all">
      {/* Brand Logo Badge */}
      <Link to="/" className="flex items-center gap-3 group">
        <img 
          src="/logo.png" 
          alt="Sharadha Stores Logo" 
          className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
        />
        <div className="hidden sm:block">
          <h1 className="text-xl font-black tracking-tight text-slate-900 leading-none">
            SHARADHA <span className="text-orange-600">STORES</span>
          </h1>
          <span className="text-[10px] font-extrabold tracking-wider text-emerald-700 uppercase mt-0.5 block">
            Homemade • Traditional • Authentic
          </span>
        </div>
      </Link>
      
      {/* Compact Search Bar */}
      {setSearchTerm && (
        <div className="flex-1 max-w-xl mx-4 relative min-w-[280px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 font-bold text-base">🔍</span>
          <input 
            type="text" 
            placeholder="Search pickles, sweets, snacks..." 
            className="w-full pl-11 pr-11 py-2.5 bg-stone-100 hover:bg-stone-200/60 focus:bg-white text-stone-800 placeholder-stone-400 font-semibold text-sm rounded-2xl border border-transparent focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15 transition-all outline-none shadow-inner"
            value={searchTerm || ''}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={() => {
              const el = document.getElementById('visual-search-upload');
              if (el) el.click();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-stone-400 hover:text-orange-600 transition-colors bg-white rounded-xl shadow-2xs hover:shadow-sm"
            title="Visual Search by Image"
            disabled={isProcessingVision}
          >
            {isProcessingVision ? (
              <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span className="text-sm">📷</span>
            )}
          </button>
        </div>
      )}

      {/* Right Navigation Controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        
        {/* Customer Auth */}
        {customerAuth ? (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-2xl">
              <span className="w-7 h-7 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-black text-xs shadow-sm">
                {customerAuth.name.charAt(0).toUpperCase()}
              </span>
              <span className="text-orange-900 text-xs font-bold max-w-[80px] truncate">
                Hi, {customerAuth.name.split(' ')[0]}!
              </span>
            </div>
            <button
              onClick={onLogout}
              className="px-3 py-2 text-stone-500 hover:text-red-600 text-xs font-bold rounded-xl hover:bg-red-50 transition-all cursor-pointer border border-stone-200 hover:border-red-200"
              title="Sign out"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            to="/customer-login"
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-extrabold text-xs rounded-2xl border border-stone-200 transition-all flex items-center gap-1.5 hover:scale-105"
          >
            <span>👤</span> Sign In
          </Link>
        )}

        {/* Cart */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative px-5 py-2.5 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-sm rounded-2xl shadow-md hover:shadow-orange-500/30 transition-all flex items-center gap-2.5 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="text-base">🛒</span>
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="bg-white text-orange-700 px-2.5 py-0.5 rounded-full text-xs font-black shadow-inner">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
