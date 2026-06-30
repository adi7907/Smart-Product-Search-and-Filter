import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders';

const COUPONS = {
  SHARADHA10: { discount: 0.10, label: '10% OFF', desc: '10% off on all orders' },
  WELCOME20:  { discount: 0.20, label: '20% OFF', desc: '20% off for new customers' },
  FREESHIP:   { discount: 0, freeShipping: true, label: 'FREE SHIP', desc: 'Free delivery' },
};

const STEPS = ['Address', 'Payment', 'Review & Pay'];
const STATUS_MAP = { placed: '🟡 Order Placed', preparing: '🟠 Preparing', out_for_delivery: '🚴 Out for Delivery', delivered: '✅ Delivered' };

export default function CheckoutFlow({ cart, setCart, customerAuth }) {
  const navigate = useNavigate();
  const { saveOrder } = useOrders();
  const [step, setStep] = useState(0);
  const [placedOrder, setPlacedOrder] = useState(null);

  // Address state
  const savedAddresses = (() => { try { return JSON.parse(localStorage.getItem('sharadha_addresses') || '[]'); } catch { return []; } })();
  const [selectedAddr, setSelectedAddr] = useState(savedAddresses[0] || null);
  const [showAddrForm, setShowAddrForm] = useState(savedAddresses.length === 0);
  const [addr, setAddr] = useState({ name: customerAuth?.name || '', phone: '', line1: '', line2: '', city: '', pincode: '', state: 'Tamil Nadu' });

  // Payment state
  const [payment, setPayment] = useState('cod');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  if (!customerAuth) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-black text-stone-900 mb-2">Please sign in to checkout</h2>
          <p className="text-stone-500 mb-6">You need an account to place an order.</p>
          <Link to="/customer-login" className="px-6 py-3 rounded-xl font-bold text-white" style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)' }}>Sign In</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && !placedOrder) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-black text-stone-900 mb-2">Your cart is empty</h2>
          <Link to="/shop" className="px-6 py-3 rounded-xl font-bold text-white" style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)' }}>Shop Now</Link>
        </div>
      </div>
    );
  }

  // Calculations
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const freeShipping = appliedCoupon?.freeShipping || subtotal >= 300;
  const deliveryFee = freeShipping ? 0 : 40;
  const discountAmt = appliedCoupon ? Math.round(subtotal * (appliedCoupon.discount || 0)) : 0;
  const taxableAmount = subtotal - discountAmt;
  const gst = Math.round(taxableAmount * 0.05);
  const total = taxableAmount + deliveryFee + gst;

  const applyCoupon = () => {
    const c = COUPONS[couponCode.toUpperCase().trim()];
    if (!c) { setCouponError('Invalid coupon code.'); return; }
    setAppliedCoupon(c);
    setCouponError('');
  };

  const saveAddress = () => {
    const list = JSON.parse(localStorage.getItem('sharadha_addresses') || '[]');
    const updated = [addr, ...list.filter(a => a.line1 !== addr.line1)];
    localStorage.setItem('sharadha_addresses', JSON.stringify(updated));
    setSelectedAddr(addr);
    setShowAddrForm(false);
  };

  const handlePlaceOrder = () => {
    const address = selectedAddr || addr;
    const order = saveOrder(cart, total, address, payment, couponCode, discountAmt);
    setPlacedOrder(order);
    setCart([]);
  };

  // ─── ORDER CONFIRMATION SCREEN ───
  if (placedOrder) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center shadow-2xl border border-stone-100"
          style={{ animation: 'pop 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
          <style>{`@keyframes pop { from { transform:scale(0.8);opacity:0 } to { transform:scale(1);opacity:1 } }`}</style>
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl"
            style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)' }}>🎉</div>
          <h2 className="text-3xl font-black text-stone-900 mb-1">Order Placed!</h2>
          <p className="text-stone-500 text-sm mb-4">Your homemade goodies are being prepared.</p>
          <div className="bg-teal-50 border border-teal-200 rounded-2xl px-6 py-3 mb-6">
            <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">Order ID</div>
            <div className="font-black text-stone-900 text-lg">{placedOrder.id}</div>
            <div className="text-stone-500 text-xs mt-1">Estimated delivery: 30–45 minutes</div>
          </div>
          <div className="flex items-center justify-between bg-stone-50 rounded-2xl px-5 py-3 mb-6 border border-stone-200">
            <div className="text-left">
              <div className="text-xs text-stone-500 font-medium">Total Paid</div>
              <div className="font-black text-teal-600 text-xl">₹{placedOrder.total}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-stone-500 font-medium">Payment</div>
              <div className="font-bold text-stone-800 text-sm capitalize">{placedOrder.paymentMethod.toUpperCase()}</div>
            </div>
          </div>
          <div className="space-y-3">
            <Link to="/orders" className="block w-full py-3.5 rounded-2xl font-black text-white text-sm shadow-lg"
              style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)' }}>
              Track My Order 📦
            </Link>
            <Link to="/shop" className="block w-full py-3 rounded-2xl font-bold text-stone-700 text-sm bg-stone-100 hover:bg-stone-200 transition-colors border border-stone-200">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-6 py-3 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/shop" className="flex items-center gap-2 text-stone-500 hover:text-teal-600 font-bold text-sm transition-colors">
            ← Back to Shop
          </Link>
          <div className="flex items-center gap-1">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${i <= step ? 'text-white' : 'bg-stone-200 text-stone-500'}`}
                  style={i <= step ? { background: 'linear-gradient(135deg,#0d9488,#0f766e)' } : {}}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-bold hidden sm:block ${i <= step ? 'text-teal-600' : 'text-stone-400'}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`h-0.5 w-8 rounded ${i < step ? 'bg-teal-500' : 'bg-stone-200'}`} />}
              </div>
            ))}
          </div>
          <div className="text-sm font-black text-stone-900">Checkout</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ─── Left Column: Steps ─── */}
        <div className="lg:col-span-2 space-y-4">

          {/* STEP 0: Address */}
          {step === 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-stone-100">
                <h2 className="font-black text-stone-900 text-lg">📍 Delivery Address</h2>
              </div>
              <div className="p-6">
                {savedAddresses.length > 0 && !showAddrForm && (
                  <div className="space-y-3 mb-4">
                    {savedAddresses.map((a, i) => (
                      <label key={i} className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedAddr === a ? 'border-teal-500 bg-teal-50' : 'border-stone-200 hover:border-stone-300'}`}>
                        <input type="radio" className="mt-1 accent-teal-500" checked={selectedAddr === a} onChange={() => setSelectedAddr(a)} />
                        <div>
                          <div className="font-bold text-stone-900">{a.name}</div>
                          <div className="text-stone-600 text-sm">{a.line1}, {a.line2 && `${a.line2}, `}{a.city} - {a.pincode}</div>
                          <div className="text-stone-500 text-xs">📞 {a.phone}</div>
                        </div>
                      </label>
                    ))}
                    <button onClick={() => setShowAddrForm(true)} className="w-full py-3 border-2 border-dashed border-teal-300 rounded-2xl text-teal-600 font-bold text-sm hover:bg-teal-50 transition-colors">
                      + Add New Address
                    </button>
                  </div>
                )}

                {showAddrForm && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Full Name" value={addr.name} onChange={v => setAddr(a => ({...a, name: v}))} placeholder="John Doe" />
                      <Field label="Phone Number" value={addr.phone} onChange={v => setAddr(a => ({...a, phone: v}))} placeholder="10-digit number" type="tel" />
                    </div>
                    <Field label="Address Line 1" value={addr.line1} onChange={v => setAddr(a => ({...a, line1: v}))} placeholder="Flat/House no, Street" />
                    <Field label="Address Line 2 (Optional)" value={addr.line2} onChange={v => setAddr(a => ({...a, line2: v}))} placeholder="Landmark, Area" required={false} />
                    <div className="grid grid-cols-3 gap-3">
                      <Field label="City" value={addr.city} onChange={v => setAddr(a => ({...a, city: v}))} placeholder="Chennai" />
                      <Field label="Pincode" value={addr.pincode} onChange={v => setAddr(a => ({...a, pincode: v}))} placeholder="600001" />
                      <Field label="State" value={addr.state} onChange={v => setAddr(a => ({...a, state: v}))} placeholder="Tamil Nadu" />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={saveAddress} className="flex-1 py-3 rounded-2xl font-black text-white text-sm" style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)' }}>
                        Save & Use This Address
                      </button>
                      {savedAddresses.length > 0 && (
                        <button onClick={() => setShowAddrForm(false)} className="px-5 py-3 rounded-2xl font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors text-sm">
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {!showAddrForm && (
                  <button disabled={!selectedAddr}
                    onClick={() => setStep(1)}
                    className="w-full mt-4 py-3 rounded-2xl font-black text-white text-sm disabled:opacity-50 cursor-pointer shadow-lg"
                    style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)' }}>
                    Continue to Payment →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 1: Payment */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-stone-100">
                <h2 className="font-black text-stone-900 text-lg">💳 Payment Method</h2>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives' },
                  { id: 'upi', label: 'UPI (GPay / PhonePe / Paytm)', icon: '📱', desc: 'Instant payment via UPI' },
                  { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                  { id: 'wallet', label: 'Sharadha Wallet', icon: '👛', desc: 'Balance: ₹0 — Add money' },
                ].map(opt => (
                  <label key={opt.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${payment === opt.id ? 'border-teal-500 bg-teal-50' : 'border-stone-200 hover:border-stone-300'}`}>
                    <input type="radio" className="accent-teal-500" checked={payment === opt.id} onChange={() => setPayment(opt.id)} />
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <div className="font-bold text-stone-900 text-sm">{opt.label}</div>
                      <div className="text-stone-500 text-xs">{opt.desc}</div>
                    </div>
                  </label>
                ))}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(0)} className="px-5 py-3 rounded-2xl font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors text-sm">← Back</button>
                  <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-2xl font-black text-white text-sm shadow-lg" style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)' }}>
                    Review Order →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Review */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Items */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-stone-100">
                  <h2 className="font-black text-stone-900 text-lg">🛍️ Your Items ({cart.length})</h2>
                </div>
                <div className="divide-y divide-stone-100">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 px-6 py-3">
                      <img src={item.image_url?.startsWith('/') || item.image_url?.startsWith('http') ? item.image_url : '/placeholder.png'}
                        alt={item.name}
                        className="w-14 h-14 rounded-2xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                        onError={e => { e.target.src = 'https://placehold.co/56x56/fdf4f0/0f766e?text=🍽️'; }} />
                      <div className="flex-1">
                        <div className="font-bold text-stone-900 text-sm">{item.name}</div>
                        <div className="text-stone-500 text-xs">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-black text-stone-900">₹{item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-5 py-3 rounded-2xl font-bold text-stone-700 bg-white hover:bg-stone-100 transition-colors text-sm border border-stone-200">← Back</button>
                <button onClick={handlePlaceOrder}
                  className="flex-1 py-3 rounded-2xl font-black text-white text-base shadow-xl cursor-pointer"
                  style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)' }}>
                  🚀 Place Order · ₹{total}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ─── Right: Order Summary ─── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sticky top-24">
            <h3 className="font-black text-stone-900 mb-4">Bill Summary</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-stone-600"><span>Subtotal ({cart.reduce((s,i)=>s+i.quantity,0)} items)</span><span>₹{subtotal}</span></div>
              {discountAmt > 0 && <div className="flex justify-between text-green-600 font-bold"><span>Discount ({appliedCoupon?.label})</span><span>−₹{discountAmt}</span></div>}
              <div className="flex justify-between text-stone-600"><span>Delivery Fee</span><span className={freeShipping ? 'text-green-600 font-bold' : ''}>{freeShipping ? 'FREE 🎉' : `₹${deliveryFee}`}</span></div>
              <div className="flex justify-between text-stone-600"><span>GST (5%)</span><span>₹{gst}</span></div>
              <div className="border-t border-stone-200 pt-3 flex justify-between font-black text-stone-900 text-base">
                <span>Total</span><span className="text-teal-600">₹{total}</span>
              </div>
            </div>
            {!freeShipping && subtotal < 300 && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3 text-xs text-blue-700 font-semibold">
                💡 Add ₹{300 - subtotal} more for FREE delivery!
              </div>
            )}
            <div className="mt-4 bg-stone-50 rounded-2xl p-3 text-center">
              <div className="text-xs text-stone-500 font-medium">🔒 Secure Checkout · 100% Safe</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', required = true }) {
  return (
    <div>
      <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">{label}</label>
      <input type={type} required={required} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 outline-none transition-all" />
    </div>
  );
}

