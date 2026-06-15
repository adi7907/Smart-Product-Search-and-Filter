export default function AdminHeader({ onLogout }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-extrabold text-slate-800">Inventory Operations</h2>
      <button 
        onClick={onLogout} 
        className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg font-bold transition-colors"
      >
        Log Out
      </button>
    </div>
  );
}