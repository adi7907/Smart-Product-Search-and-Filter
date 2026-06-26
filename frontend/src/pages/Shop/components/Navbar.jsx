import { Link } from 'react-router-dom';

export default function Navbar({ cartCount, setIsCartOpen, searchTerm, setSearchTerm, isProcessingVision }) {
  return (
    <nav className="bg-white sticky top-0 z-40 px-6 py-3.5 shadow-md border-b border-orange-100 flex flex-wrap justify-between items-center gap-4">
      {/* Brand Logo Badge */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-11 h-11 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
          <span className="text-2xl">🏺</span>
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
            Sharadha <span className="text-orange-600">Stores</span>
          </h1>
          <p className="text-[10px] font-extrabold text-orange-500 uppercase tracking-widest -mt-1">Handcrafted Heritage</p>
        </div>
      </Link>
      
      {/* Compact Zomato/Swiggy Search Bar */}
      {setSearchTerm && (
        <div className="flex-1 max-w-xl mx-4 relative min-w-[280px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
          <input 
            type="text" 
            placeholder="Search for traditional pickles, sweets, filter coffee..." 
            className="w-full pl-12 pr-12 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 font-medium text-sm rounded-2xl border border-transparent focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none shadow-inner"
            value={searchTerm || ''}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={() => {
              const el = document.getElementById('visual-search-upload');
              if (el) el.click();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-orange-600 transition-colors"
            title="Search by image picture"
            disabled={isProcessingVision}
          >
            {isProcessingVision ? (
              <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span className="text-lg">📷</span>
            )}
          </button>
        </div>
      )}

      {/* Right Navigation Controls */}
      <div className="flex items-center gap-4 shrink-0">
        <Link 
          to="/admin" 
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-600 font-bold text-xs rounded-xl transition-all border border-slate-200 hover:border-orange-200 flex items-center gap-1.5"
        >
          <span>⚙️</span> Admin Panel
        </Link>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <span>🛒</span>
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="bg-white text-orange-600 px-2 py-0.5 rounded-full text-xs font-black shadow-sm">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
