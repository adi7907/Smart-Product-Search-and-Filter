import { useState, useEffect } from 'react';

export default function OrderManager() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="text-teal-600">📦</span> Recent Orders
        </h3>
      </div>
      <div className="divide-y max-h-80 overflow-y-auto">
        {orders.length === 0 ? (
          <div className="p-6 text-slate-500 text-sm">No recent orders.</div>
        ) : orders.map(order => (
          <div key={order.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div>
              <p className="font-bold text-slate-800">Order #{order.id}</p>
              <p className="text-sm font-semibold text-teal-600">₹{order.total_amount}</p>
              <p className="text-xs text-slate-400">{new Date(order.order_date).toLocaleString()}</p>
            </div>
            <select 
              value={order.delivery_status} 
              onChange={(e) => updateStatus(order.id, e.target.value)}
              className="text-sm p-2 border rounded-xl font-semibold bg-white outline-none cursor-pointer"
            >
              <option value="Processing">Processing</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
