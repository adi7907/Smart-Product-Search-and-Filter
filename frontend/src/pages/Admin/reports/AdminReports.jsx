import StockAlerts from './StockAlerts';
import OrderManager from './OrderManager';

export default function AdminReports() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-black text-slate-800 mb-6">Dashboard Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StockAlerts />
        <OrderManager />
      </div>
    </div>
  );
}
