import CartItem from './CartItem';

export default function CartPanel({ isOpen, onClose, cart, setCart, onCheckout }) {
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleCheckout = () => {
    // Pass total to parent handler
    onCheckout(cartTotal);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#fdfbf7] shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-center border-b border-stone-200 bg-white">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛒</span>
            <div>
              <h2 className="text-lg font-black text-stone-900 leading-none">Your Cart</h2>
              <p className="text-xs text-stone-500 font-medium mt-0.5">{cart.length === 0 ? 'Empty' : `${cart.reduce((s, i) => s + i.quantity, 0)} items`}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer font-bold text-lg"
          >✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 p-8 text-center gap-4">
              <span className="text-7xl">🛒</span>
              <div>
                <p className="font-bold text-stone-600 text-lg">Your cart is empty</p>
                <p className="text-stone-400 text-sm mt-1">Add some delicious items to get started!</p>
              </div>
            </div>
          ) : (
            <div className="py-2">
              {cart.map(item => <CartItem key={item.id} item={item} updateQuantity={updateQuantity} />)}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-stone-200 bg-white">
            {/* Price breakdown */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-stone-600 font-medium">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-600 font-medium">
                <span>Delivery</span>
                <span className="text-emerald-600 font-bold">Free 🎉</span>
              </div>
              <div className="border-t border-stone-200 pt-2 flex justify-between font-black text-stone-900 text-base">
                <span>Total</span>
                <span className="text-orange-600">₹{cartTotal}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-4 rounded-2xl font-black text-white text-base shadow-lg transition-all hover:scale-[1.01] active:scale-100 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
            >
              🚀 Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
