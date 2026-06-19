export default function CheckoutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-bounce-short">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
          ✓
        </div>
        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Order Placed!</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Thank you for shopping at Sharadha Stores. Your delicious items will be ready soon.
        </p>
        <button 
          onClick={onClose}
          className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold rounded-xl transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
