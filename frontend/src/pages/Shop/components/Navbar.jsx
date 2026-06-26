import { Link } from 'react-router-dom';

export default function Navbar({ cartCount, setIsCartOpen, searchTerm, setSearchTerm, isProcessingVision }) {
  return (
    <nav className="bg-white sticky top-0 z-40 px-6 py-3.5 shadow-sm border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
      {/* Brand Logo Badge */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-md text-white group-hover:scale-105 transition-transform">
          <span className="text-xl">🏺</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
            Sharadha <span className="text-teal-600">Stores</span>
          </h1>
        </div>
      </Link>
      
      {/* Compact Search Bar */}
      {setSearchTerm && (
        <div className="flex-1 max-w-xl mx-4 relative min-w-[280px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base">🔍</span>
          <input 
            type="text" 
            placeholder="Search products by name or category..." 
            className="w-full pl-11 pr-11 py-2 bg-slate-100 hover:bg-slate-200/60 focus:bg-white text-slate-800 placeholder-slate-400 font-medium text-sm rounded-xl border border-transparent focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all outline-none"
            value={searchTerm || ''}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={() => {
              const el = document.getElementById('visual-search-upload');
              if (el) el.click();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-teal-600 transition-colors"
            title="Visual Search by Image"
            disabled={isProcessingVision}
          >
            {isProcessingVision ? (
              <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span className="text-base">📷</span>
            )}
          </button>
        </div>
      )}

      {/* Right Navigation Controls */}
      <div className="flex items-center gap-3 shrink-0">
        <Link 
          to="/admin" 
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-all border border-slate-200 flex items-center gap-1.5"
        >
          <span>⚙️</span> Admin Panel
        </Link>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <span>🛒</span>
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="bg-white text-teal-700 px-2 py-0.5 rounded-full text-xs font-bold shadow-2xs">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
