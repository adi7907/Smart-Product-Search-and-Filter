import { useState, useEffect } from 'react';
import { API_URL } from '../../../config';

export default function StockAlerts() {
  const [alerts, setAlerts] = useState({ lowStock: [], expiringSoon: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/batches/alerts`)
      .then(res => res.json())
      .then(data => {
        setAlerts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="text-red-500">⚠️</span> Stock & Expiry Alerts
      </h3>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.lowStock.length > 0 && (
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
              <h4 className="font-bold text-orange-800 mb-2">Low Stock (Under 10)</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                {alerts.lowStock.map(b => (
                  <li key={b.id}>• {b.name} (Batch {b.batch_number}) - Only {b.stock_quantity} left</li>
                ))}
              </ul>
            </div>
          )}

          {alerts.expiringSoon.length > 0 && (
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
              <h4 className="font-bold text-red-800 mb-2">Expiring within 30 days</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {alerts.expiringSoon.map(b => (
                  <li key={b.id}>• {b.name} (Batch {b.batch_number}) - Exp: {b.expiry_date}</li>
                ))}
              </ul>
            </div>
          )}

          {alerts.lowStock.length === 0 && alerts.expiringSoon.length === 0 && (
            <p className="text-slate-500 text-sm">All inventory levels and expiry dates are looking healthy!</p>
          )}
        </div>
      )}
    </div>
  );
}
