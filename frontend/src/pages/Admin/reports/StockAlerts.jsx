import { useState, useEffect } from 'react';
import { API_URL } from '../../../config';

export default function StockAlerts() {
  const [alerts, setAlerts] = useState({ lowStock: [], expiringSoon: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newBatch, setNewBatch] = useState({
    name: 'Spicy Mango Pickle',
    batch_number: `BATCH-${Math.floor(1000 + Math.random() * 9000)}`,
    expiry_date: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
    stock_quantity: 8
  });

  const fetchAlerts = () => {
    fetch(`${API_URL}/api/batches/alerts`)
      .then(res => res.json())
      .then(data => {
        const localBatches = (() => { try { return JSON.parse(localStorage.getItem('sharadha_batches') || '[]'); } catch { return []; } })();
        const today = new Date().toISOString().split('T')[0];
        const limitDate = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

        const mergedLow = [...(data.lowStock || [])];
        const mergedExp = [...(data.expiringSoon || [])];

        localBatches.forEach(b => {
          if (b.stock_quantity < 10) mergedLow.push(b);
          if (b.expiry_date <= limitDate) mergedExp.push(b);
        });

        setAlerts({ lowStock: mergedLow, expiringSoon: mergedExp });
        setIsLoading(false);
      })
      .catch(err => {
        const localBatches = (() => { try { return JSON.parse(localStorage.getItem('sharadha_batches') || '[]'); } catch { return []; } })();
        const limitDate = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];
        setAlerts({
          lowStock: localBatches.filter(b => b.stock_quantity < 10),
          expiringSoon: localBatches.filter(b => b.expiry_date <= limitDate)
        });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleAddBatch = async (e) => {
    e.preventDefault();
    try {
      const localBatches = JSON.parse(localStorage.getItem('sharadha_batches') || '[]');
      const created = { id: Date.now(), ...newBatch };
      localBatches.push(created);
      localStorage.setItem('sharadha_batches', JSON.stringify(localBatches));
    } catch(e){}

    try {
      await fetch(`${API_URL}/api/batches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBatch)
      });
    } catch(e){}

    setShowForm(false);
    setNewBatch({
      name: 'Special Kaju Katli',
      batch_number: `BATCH-${Math.floor(1000 + Math.random() * 9000)}`,
      expiry_date: new Date(Date.now() + 20 * 86400000).toISOString().split('T')[0],
      stock_quantity: 5
    });
    fetchAlerts();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-stone-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <span className="text-red-500">⚠️</span> Stock & Expiry Management
        </h3>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="text-[11px] font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200/60 cursor-pointer hover:bg-teal-100 transition-colors"
        >
          {showForm ? '❌ Close' : '➕ Add Batch Expiry'}
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleAddBatch} className="bg-stone-50 p-3 rounded-xl border border-stone-200 mb-4 space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-stone-600">Product Item</label>
              <input type="text" value={newBatch.name} onChange={e => setNewBatch({...newBatch, name: e.target.value})} className="w-full p-1.5 border rounded-lg bg-white font-semibold mt-0.5" required />
            </div>
            <div>
              <label className="font-bold text-stone-600">Batch Code</label>
              <input type="text" value={newBatch.batch_number} onChange={e => setNewBatch({...newBatch, batch_number: e.target.value})} className="w-full p-1.5 border rounded-lg bg-white font-semibold mt-0.5" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-stone-600">Expiry Date</label>
              <input type="date" value={newBatch.expiry_date} onChange={e => setNewBatch({...newBatch, expiry_date: e.target.value})} className="w-full p-1.5 border rounded-lg bg-white font-semibold mt-0.5" required />
            </div>
            <div>
              <label className="font-bold text-stone-600">Stock Qty</label>
              <input type="number" value={newBatch.stock_quantity} onChange={e => setNewBatch({...newBatch, stock_quantity: Number(e.target.value)})} className="w-full p-1.5 border rounded-lg bg-white font-semibold mt-0.5" required />
            </div>
          </div>
          <button type="submit" className="w-full py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors cursor-pointer mt-2">
            Save Batch Expiry Record
          </button>
        </form>
      )}

      {isLoading ? (
        <div className="flex justify-center py-6">
          <div className="w-6 h-6 border-2 border-slate-200 border-t-teal-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.lowStock.length > 0 && (
            <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl">
              <h4 className="font-bold text-xs text-orange-800 mb-1">Low Stock Alerts (Under 10 units)</h4>
              <ul className="text-xs text-orange-700 space-y-0.5">
                {alerts.lowStock.map((b, i) => (
                  <li key={b.id || i}>• {b.name} (Batch {b.batch_number}) - Only <span className="font-black">{b.stock_quantity}</span> left</li>
                ))}
              </ul>
            </div>
          )}

          {alerts.expiringSoon.length > 0 && (
            <div className="bg-red-50 border border-red-100 p-3 rounded-xl">
              <h4 className="font-bold text-xs text-red-800 mb-1">Expiry Warnings (within 30 days)</h4>
              <ul className="text-xs text-red-700 space-y-0.5">
                {alerts.expiringSoon.map((b, i) => (
                  <li key={b.id || i}>• {b.name} (Batch {b.batch_number}) - Exp: <span className="font-black">{b.expiry_date}</span></li>
                ))}
              </ul>
            </div>
          )}

          {alerts.lowStock.length === 0 && alerts.expiringSoon.length === 0 && (
            <p className="text-slate-500 text-xs py-2">All inventory levels and expiry dates are looking healthy!</p>
          )}
        </div>
      )}
    </div>
  );
}
