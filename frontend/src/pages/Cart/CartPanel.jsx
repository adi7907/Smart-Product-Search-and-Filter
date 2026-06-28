import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const COUPONS = {
  SHARADHA10: { discount: 0.10, label: '10% OFF' },
  WELCOME20: { discount: 0.20, label: '20% OFF' },
  FREESHIP: { discount: 0, freeShipping: true, label: 'FREE SHIP' },
};

import { useState } from 'react';

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
      {isOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#fdfbf7] shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-center bg-white border-b border-stone-200">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛒</span>
            <div>
              <h2 className="text-lg font-black text-stone-900 leading-none">Your Cart</h2>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                {cart.length === 0 ? 'Empty' : `${cart.reduce((s, i) => s + i.quantity, 0)} items`}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold text-lg cursor-pointer">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 p-8 text-center gap-4">
              <span className="text-7xl">🛒</span>
              <div>
                <p className="font-bold text-stone-600 text-lg">Your cart is empty</p>
                <p className="text-stone-400 text-sm mt-1">Add some delicious items!</p>
              </div>
            </div>
          ) : (
            <div className="py-2">
              {cart.map(item => <CartItem key={item.id} item={item} updateQuantity={updateQuantity} />)}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="bg-white border-t border-stone-200">
            {/* Delivery hint */}
            {!freeShipping && subtotal < 300 && (
              <div className="px-5 py-3 bg-blue-50 border-b border-blue-100 text-xs text-blue-700 font-semibold text-center">
                💡 Add ₹{300 - subtotal} more for FREE delivery!
              </div>
            )}

            {/* Coupon */}
            <div className="px-5 py-3 border-b border-stone-100">
              <div className="flex gap-2">
                <input value={couponCode} onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponError(''); }}
                  placeholder="Coupon code (WELCOME20)"
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-800 outline-none focus:border-orange-400" />
                <button onClick={applyCoupon} className="px-3 py-2 rounded-xl text-white text-xs font-extrabold cursor-pointer"
                  style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>Apply</button>
              </div>
              {couponError && <p className="text-red-500 text-xs mt-1 font-semibold">⚠️ {couponError}</p>}
              {appliedCoupon && (
                <div className="mt-2 flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-1.5">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-green-700 text-xs font-bold flex-1">{couponCode} — {appliedCoupon.label}</span>
                  <button onClick={() => { setAppliedCoupon(null); setCouponCode(''); }} className="text-stone-400 text-xs hover:text-red-500 cursor-pointer">✕</button>
                </div>
              )}
            </div>

            {/* Bill */}
            <div className="px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm text-stone-600 font-medium"><span>Subtotal</span><span>₹{subtotal}</span></div>
              {discountAmt > 0 && <div className="flex justify-between text-sm text-green-600 font-bold"><span>Discount</span><span>−₹{discountAmt}</span></div>}
              <div className="flex justify-between text-sm text-stone-600 font-medium">
                <span>Delivery</span>
                <span className={freeShipping ? 'text-green-600 font-bold' : ''}>{freeShipping ? 'FREE 🎉' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-600 font-medium"><span>GST (5%)</span><span>₹{gst}</span></div>
              <div className="border-t border-stone-200 pt-2 flex justify-between font-black text-stone-900 text-base">
                <span>Total</span><span className="text-orange-600">₹{total}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="px-5 pb-5">
              {subtotal < 99 ? (
                <div className="w-full py-3.5 rounded-2xl text-center text-sm font-black text-stone-400 bg-stone-100 border border-stone-200">
                  Min. order ₹99 required
                </div>
              ) : (
                <button onClick={handleCheckout}
                  className="w-full py-4 rounded-2xl font-black text-white text-base shadow-lg cursor-pointer hover:scale-[1.01] active:scale-100 transition-all"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
                  🚀 Proceed to Checkout →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
