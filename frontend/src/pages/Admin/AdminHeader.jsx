export default function AdminHeader({ onLogout }) {
  return (
    <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
      <div className="flex items-center gap-2.5">
        <span className="text-xl">⚙️</span>
        <div>
          <h2 className="text-base font-bold text-slate-800">Inventory & Operations Panel</h2>
          <p className="text-xs text-slate-500">Manage store inventory, batch alerts, and live customer orders</p>
        </div>
      </div>
      <button 
        onClick={onLogout} 
        className="bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors border border-slate-200 cursor-pointer"
      >
        Log Out
      </button>
    </div>
  );
}