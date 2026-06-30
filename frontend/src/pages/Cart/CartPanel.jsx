import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const COUPONS = {
  SHARADHA10: { discount: 0.10, label: '10% OFF' },
  WELCOME20: { discount: 0.20, label: '20% OFF' },
  FREESHIP: { discount: 0, freeShipping: true, label: 'FREE SHIP' },
};

export default function CartPanel({ isOpen, onClose, cart, setCart, customerAuth }) {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShipping = appliedCoupon?.freeShipping || subtotal >= 300;
  const deliveryFee = freeShipping ? 0 : 40;
  const discountAmt = appliedCoupon ? Math.round(subtotal * (appliedCoupon.discount || 0)) : 0;
  const gst = Math.round((subtotal - discountAmt) * 0.05);
  const total = subtotal - discountAmt + deliveryFee + gst;

  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item)
        .filter(item => item.quantity > 0)
    );
  };

  const applyCoupon = () => {
    const c = COUPONS[couponCode.toUpperCase().trim()];
    if (!c) { setCouponError('Invalid coupon code'); return; }
    setAppliedCoupon(c);
    setCouponError('');
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-slate-50 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="px-4 py-3 flex justify-between items-center bg-white border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <div>
              <h2 className="text-sm font-bold text-slate-800 leading-none">Your Cart</h2>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                {cart.length === 0 ? 'Empty' : `${cart.reduce((s, i) => s + i.quantity, 0)} items`}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm cursor-pointer">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center gap-2">
              <span className="text-5xl">🛒</span>
              <div>
                <p className="font-bold text-slate-600 text-sm">Your cart is empty</p>
                <p className="text-slate-400 text-xs mt-0.5">Add items from the catalog!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map(item => <CartItem key={item.id} item={item} updateQuantity={updateQuantity} />)}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="bg-white border-t border-slate-200">
            {/* Delivery hint */}
            {!freeShipping && subtotal < 300 && (
              <div className="px-4 py-2 bg-teal-50 border-b border-teal-100 text-[11px] text-teal-800 font-semibold text-center">
                💡 Add ₹{300 - subtotal} more for FREE delivery!
              </div>
            )}

            {/* Bill */}
            <div className="px-4 py-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600 font-medium"><span>Subtotal</span><span>₹{subtotal}</span></div>
              {discountAmt > 0 && <div className="flex justify-between text-teal-600 font-bold"><span>Discount</span><span>−₹{discountAmt}</span></div>}
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Delivery</span>
                <span className={freeShipping ? 'text-teal-600 font-bold' : ''}>{freeShipping ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium"><span>GST (5%)</span><span>₹{gst}</span></div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900 text-sm">
                <span>Total Amount</span><span className="text-teal-700">₹{total}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="px-4 pb-4">
              <button onClick={handleCheckout}
                className="w-full py-3 rounded-xl font-bold text-white text-xs shadow-md cursor-pointer hover:opacity-95 active:scale-98 transition-all"
                style={{ background: 'linear-gradient(135deg, #0d9488, #0f766e)' }}>
                Proceed to Checkout →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
