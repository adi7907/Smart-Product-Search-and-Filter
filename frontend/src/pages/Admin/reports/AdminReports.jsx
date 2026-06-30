import { useState, useEffect } from 'react';
import StockAlerts from './StockAlerts';
import OrderManager from './OrderManager';

export default function AdminReports() {
  const [stats, setStats] = useState({ revenue: 0, count: 0 });

  useEffect(() => {
    const calc = () => {
      try {
        const localOrders = JSON.parse(localStorage.getItem('sharadha_orders') || '[]');
        let rev = 0;
        localOrders.forEach(o => { rev += (o.total || o.total_amount || 0); });
        setStats({ revenue: rev, count: localOrders.length });
      } catch(e){}
    };
    calc();
    const i = setInterval(calc, 2000);
    return () => clearInterval(i);
  }, []);

  const handleExportCSV = () => {
    try {
      const localOrders = JSON.parse(localStorage.getItem('sharadha_orders') || '[]');
      let csv = "Order ID,Order Date,Total Amount (INR),Delivery Status,Items\n";
      localOrders.forEach(o => {
        const items = (o.items || []).map(i => `${i.name} (x${i.quantity})`).join('; ');
        csv += `"${o.id}","${o.date || new Date().toISOString()}","${o.total || o.total_amount || 0}","${o.status || o.delivery_status || 'Placed'}","${items}"\n`;
      });
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Sharadha_Stores_Operations_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch(e) {
      alert("No data available to export.");
    }
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex justify-end">
        <button 
          onClick={handleExportCSV}
          className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
          title="Download Operations Report as Excel/CSV"
        >
          <span>📥</span> Export CSV Report
        </button>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-lg font-bold">💰</div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase">Total Sales</div>
            <div className="text-base font-black text-slate-800">₹{stats.revenue.toLocaleString()}</div>
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold">📦</div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase">Total Orders</div>
            <div className="text-base font-black text-slate-800">{stats.count} orders</div>
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg font-bold">⚡</div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase">Order Status</div>
            <div className="text-base font-black text-slate-800">Live Sync</div>
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-lg font-bold">🌱</div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase">Store Health</div>
            <div className="text-base font-black text-green-600">Optimal</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StockAlerts />
        <OrderManager />
      </div>
    </div>
  );
}
