import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center pointer-events-none">
        {toasts.map(t => (
          <div key={t.id}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border text-sm font-bold pointer-events-auto
              ${t.type === 'success' ? 'bg-stone-900 border-stone-700 text-white' : ''}
              ${t.type === 'error' ? 'bg-red-600 border-red-500 text-white' : ''}
              ${t.type === 'info' ? 'bg-blue-600 border-blue-500 text-white' : ''}
              ${t.type === 'warning' ? 'bg-amber-500 border-amber-400 text-white' : ''}
            `}
            style={{ animation: 'toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <style>{`@keyframes toastIn { from { transform: translateY(20px); opacity:0 } to { transform: translateY(0); opacity:1 } }`}</style>
            <span className="text-base">{
              t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : t.type === 'warning' ? '⚠️' : 'ℹ️'
            }</span>
            {t.message}
            <button onClick={() => removeToast(t.id)} className="ml-2 opacity-60 hover:opacity-100 cursor-pointer">✕</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
};
