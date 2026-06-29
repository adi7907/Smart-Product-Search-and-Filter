import { useState, useEffect } from 'react';
import { API_URL } from '../../../config';

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = () => {
    fetch(`${API_URL}/api/orders`)
      .then(res => res.json())
      .then(apiData => {
        const localOrders = (() => { try { return JSON.parse(localStorage.getItem('sharadha_orders') || '[]'); } catch { return []; } })();
        const merged = [...localOrders];
        const localIds = new Set(localOrders.map(o => String(o.id)));
        if (Array.isArray(apiData)) {
          apiData.forEach(o => {
            if (!localIds.has(String(o.id))) merged.push(o);
          });
        }
        setOrders(merged);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        const localOrders = (() => { try { return JSON.parse(localStorage.getItem('sharadha_orders') || '[]'); } catch { return []; } })();
        setOrders(localOrders);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const localOrders = JSON.parse(localStorage.getItem('sharadha_orders') || '[]');
      const updatedLocal = localOrders.map(o => String(o.id) === String(id) ? { ...o, status, delivery_status: status } : o);
      localStorage.setItem('sharadha_orders', JSON.stringify(updatedLocal));
    } catch(e){}

    try {
      await fetch(`${API_URL}/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.error(err);
    } finally {
      fetchOrders();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-stone-200 overflow-hidden">
      <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <span className="text-teal-600">📦</span> Live Customer Orders ({orders.length})
        </h3>
        <button onClick={fetchOrders} className="text-[11px] font-bold text-teal-600 hover:text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200/60 cursor-pointer">
          🔄 Sync
        </button>
      </div>
      <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="w-6 h-6 border-2 border-slate-200 border-t-teal-500 rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
             <div className="text-2xl mb-1">📦</div>
             <p className="text-xs">No customer orders placed yet.</p>
          </div>
        ) : orders.map(order => {
          const totalAmt = order.total !== undefined ? order.total : order.total_amount;
          const dateStr = order.date || order.order_date || new Date().toISOString();
          const currStatus = order.status || order.delivery_status || 'placed';
          const itemsList = order.items ? order.items.map(i => `${i.name} (x${i.quantity})`).join(', ') : 'Store product selection';
          
          return (
            <div key={order.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-stone-50/80 transition-colors">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-800">#{order.id}</span>
                  <span className="text-[11px] bg-teal-50 text-teal-700 font-black px-2 py-0.5 rounded-md border border-teal-200/50">₹{totalAmt}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 truncate" title={itemsList}>{itemsList}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{new Date(dateStr).toLocaleString()}</p>
              </div>
              <select 
                value={currStatus.toLowerCase()} 
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className="text-xs p-1.5 border border-slate-200 rounded-xl font-bold bg-white outline-none cursor-pointer text-slate-700 focus:border-teal-500 shadow-2xs"
              >
                <option value="placed">📋 Order Placed</option>
                <option value="processing">⚙️ Processing</option>
                <option value="preparing">👨‍🍳 Preparing</option>
                <option value="out_for_delivery">🚴 Out for Delivery</option>
                <option value="delivered">✅ Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}
