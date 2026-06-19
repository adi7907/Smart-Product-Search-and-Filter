import CartItem from './CartItem';

export default function CartPanel({ isOpen, onClose, cart, setCart, onCheckout }) {
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) return { ...item, quantity: Math.max(0, item.quantity + delta) };
      return item;
    }).filter(item => item.quantity > 0));
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b dark:border-slate-800">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">Your Cart ({cart.length})</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">✕</button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <span className="text-6xl mb-4">🛒</span>
              <p>Your cart is empty. Start adding some delicious items!</p>
            </div>
          ) : (
            cart.map(item => <CartItem key={item.id} item={item} updateQuantity={updateQuantity} />)
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <div className="flex justify-between mb-4 text-lg font-bold text-slate-800 dark:text-white">
              <span>Total Amount:</span>
              <span className="text-teal-600 dark:text-teal-400">₹{cartTotal}</span>
            </div>
            <button onClick={onCheckout} className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-black text-lg rounded-xl shadow-lg shadow-teal-600/30 transition-all">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
