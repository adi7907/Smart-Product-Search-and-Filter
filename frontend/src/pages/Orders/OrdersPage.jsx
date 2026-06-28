import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders';

const STATUS_STEPS = ['placed', 'preparing', 'out_for_delivery', 'delivered'];
const STATUS_LABELS = {
  placed: { label: 'Order Placed', icon: '📋', color: 'text-blue-600' },
  preparing: { label: 'Preparing', icon: '👨‍🍳', color: 'text-amber-600' },
  out_for_delivery: { label: 'Out for Delivery', icon: '🚴', color: 'text-orange-600' },
  delivered: { label: 'Delivered', icon: '✅', color: 'text-green-600' },
};

function resolveImage(url) {
  if (!url) return 'https://placehold.co/48x48/fdf4f0/ea580c?text=🍽️';
  if (url.startsWith('http') || url.startsWith('/')) return url;
  return url;
}

export default function OrdersPage({ customerAuth }) {
  const { getOrders } = useOrders();
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  if (!customerAuth) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-black text-stone-900 mb-2">Sign in to view orders</h2>
          <Link to="/customer-login" className="mt-4 inline-block px-6 py-3 rounded-xl font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-6 py-5 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link to="/shop" className="text-stone-500 hover:text-orange-600 font-bold text-sm">← Back to Shop</Link>
          <div className="flex-1 text-center">
            <h1 className="font-black text-stone-900 text-xl">My Orders</h1>
          </div>
          <div className="text-stone-400 text-sm font-medium">{orders.length} order{orders.length !== 1 ? 's' : ''}</div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-6">📦</div>
            <h2 className="text-2xl font-black text-stone-900 mb-2">No orders yet</h2>
            <p className="text-stone-500 mb-8">Start shopping and your orders will appear here.</p>
            <Link to="/shop" className="px-8 py-4 rounded-2xl font-black text-white text-base inline-block shadow-lg"
              style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>
              Shop Now 🛒
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => {
              const statusIdx = STATUS_STEPS.indexOf(order.status);
              const isExpanded = expanded === order.id;
              const statusInfo = STATUS_LABELS[order.status];

              return (
                <div key={order.id} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                  {/* Order Header */}
                  <div className="px-6 py-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-stone-900">{order.id}</span>
                        <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full bg-stone-100 ${statusInfo.color}`}>
                          {statusInfo.icon} {statusInfo.label}
                        </span>
                      </div>
                      <div className="text-stone-500 text-xs font-medium">
                        {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5">{order.items.length} item{order.items.length !== 1 ? 's' : ''} · {order.paymentMethod?.toUpperCase()}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-black text-orange-600 text-lg">₹{order.total}</div>
                      <button onClick={() => setExpanded(isExpanded ? null : order.id)}
                        className="text-xs font-bold text-stone-500 hover:text-orange-600 transition-colors cursor-pointer mt-1">
                        {isExpanded ? 'Hide ▲' : 'Details ▼'}
                      </button>
                    </div>
                  </div>

                  {/* Item thumbnails (always visible) */}
                  <div className="px-6 pb-4 flex gap-2 overflow-x-auto">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex-shrink-0 text-center">
                        <img src={resolveImage(item.image_url)} alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover bg-stone-100 border border-stone-200"
                          onError={e => { e.target.src = 'https://placehold.co/48x48/fdf4f0/ea580c?text=🍽️'; }} />
                        <div className="text-[9px] font-bold text-stone-500 mt-1 max-w-[48px] truncate">{item.name.split(' ')[0]}</div>
                      </div>
                    ))}
                  </div>

                  {/* Status Progress Bar */}
                  <div className="px-6 pb-5">
                    <div className="flex items-center gap-1">
                      {STATUS_STEPS.map((s, i) => (
                        <div key={s} className="flex items-center flex-1">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${i <= statusIdx ? 'text-white' : 'bg-stone-200 text-stone-400'}`}
                            style={i <= statusIdx ? { background: 'linear-gradient(135deg,#f97316,#ea580c)' } : {}}>
                            {i < statusIdx ? '✓' : i + 1}
                          </div>
                          {i < STATUS_STEPS.length - 1 && (
                            <div className={`h-0.5 flex-1 mx-1 rounded ${i < statusIdx ? 'bg-orange-500' : 'bg-stone-200'}`} />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-1">
                      {STATUS_STEPS.map(s => (
                        <div key={s} className="text-[9px] font-bold text-stone-400 text-center flex-1">{STATUS_LABELS[s].label}</div>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-stone-100 px-6 py-5 bg-stone-50 space-y-4">
                      {/* Items detail */}
                      <div>
                        <h4 className="font-bold text-stone-700 text-xs uppercase tracking-wider mb-3">Items Ordered</h4>
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                            <div className="flex items-center gap-3">
                              <img src={resolveImage(item.image_url)} alt={item.name}
                                className="w-10 h-10 rounded-xl object-cover bg-stone-100 border border-stone-200"
                                onError={e => { e.target.src = 'https://placehold.co/40x40/fdf4f0/ea580c?text=🍽️'; }} />
                              <div>
                                <div className="font-bold text-stone-900 text-sm">{item.name}</div>
                                <div className="text-stone-500 text-xs">₹{item.price} × {item.quantity}</div>
                              </div>
                            </div>
                            <div className="font-black text-stone-900 text-sm">₹{item.price * item.quantity}</div>
                          </div>
                        ))}
                      </div>

                      {/* Address */}
                      {order.address && (
                        <div>
                          <h4 className="font-bold text-stone-700 text-xs uppercase tracking-wider mb-2">Delivery Address</h4>
                          <p className="text-stone-600 text-sm">{order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ''}, {order.address.city} - {order.address.pincode}</p>
                        </div>
                      )}

                      {/* Bill */}
                      <div>
                        <h4 className="font-bold text-stone-700 text-xs uppercase tracking-wider mb-2">Bill Details</h4>
                        <div className="space-y-1 text-sm text-stone-600">
                          <div className="flex justify-between"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
                          {order.discount > 0 && <div className="flex justify-between text-green-600 font-bold"><span>Discount ({order.coupon})</span><span>−₹{order.discount}</span></div>}
                          <div className="flex justify-between"><span>Delivery</span><span>{order.deliveryFee === 0 ? 'Free' : `₹${order.deliveryFee}`}</span></div>
                          <div className="flex justify-between"><span>GST (5%)</span><span>₹{order.gst}</span></div>
                          <div className="flex justify-between font-black text-stone-900 text-base pt-1 border-t border-stone-200"><span>Total</span><span className="text-orange-600">₹{order.total}</span></div>
                        </div>
                      </div>

                      {/* Reorder */}
                      <Link to="/shop" className="block w-full py-3 text-center rounded-2xl font-black text-white text-sm cursor-pointer"
                        style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>
                        🔁 Reorder
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
