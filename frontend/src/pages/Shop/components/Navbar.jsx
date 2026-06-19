import { Link } from 'react-router-dom';

export default function Navbar({ cartCount, isDarkMode, setIsDarkMode, setIsCartOpen }) {
  return (
    <nav className="bg-white dark:bg-slate-900 p-4 shadow-sm border-b dark:border-slate-800 flex justify-between items-center transition-colors">
      <h1 className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">Sharadha Stores</h1>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xl"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
        >
          <span className="text-2xl">🛒</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1 -translate-y-1">
              {cartCount}
            </span>
          )}
        </button>

        <Link to="/admin" className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">
          Admin
        </Link>
      </div>
    </nav>
  );
}
