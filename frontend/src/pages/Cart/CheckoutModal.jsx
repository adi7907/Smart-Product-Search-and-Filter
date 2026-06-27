export default function CheckoutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-stone-100"
        style={{ animation: 'pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        <style>{`@keyframes pop { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
        
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
          style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
          ✅
        </div>
        
        <h3 className="text-2xl font-black text-stone-900 mb-2">Order Placed! 🎉</h3>
        <p className="text-stone-500 text-sm font-medium mb-1">
          Thank you for shopping at <strong className="text-orange-600">Sharadha Stores</strong>!
        </p>
        <p className="text-stone-400 text-xs mb-8">
          Your delicious homemade items will be freshly prepared and delivered soon.
        </p>

        {/* Decorative order items */}
        <div className="flex justify-center gap-2 mb-8 text-2xl">
          {['🥒', '🍬', '🌶️', '☕', '🥜'].map((e, i) => (
            <span key={i} className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center border border-orange-100">{e}</span>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl font-black text-white text-sm transition-all hover:scale-[1.02] active:scale-100 cursor-pointer shadow-lg"
          style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
        >
          Continue Shopping →
        </button>
      </div>
    </div>
  );
}
