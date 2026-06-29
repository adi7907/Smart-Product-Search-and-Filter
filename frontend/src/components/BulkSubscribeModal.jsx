import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';

export default function BulkSubscribeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState('bulk'); // 'bulk' or 'subscribe'
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    itemPreference: 'Assorted Homemade Pickles & Sweets',
    quantity: '50 Kg / Boxes',
    frequency: 'Monthly (Every 30 Days)',
    notes: ''
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-bulk-modal', handleOpen);
    return () => window.removeEventListener('open-bulk-modal', handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(tab === 'bulk' ? `📦 Bulk inquiry submitted! We will contact you via WhatsApp shortly.` : `🔁 Subscription activated successfully! Confirmation sent to email & SMS.`, 'success');
    
    // Simulate WhatsApp Business API Trigger
    const waText = encodeURIComponent(
      tab === 'bulk'
        ? `*New Bulk Order Inquiry* 📦\nName: ${formData.name}\nPhone: ${formData.phone}\nRequirement: ${formData.quantity} of ${formData.itemPreference}\nNotes: ${formData.notes}`
        : `*New Subscription Activated* 🔁\nName: ${formData.name}\nPhone: ${formData.phone}\nPlan: ${formData.itemPreference}\nFrequency: ${formData.frequency}`
    );
    
    setTimeout(() => {
      if (window.confirm("📲 Open WhatsApp Chat to send instant alert to Sharadha Stores dispatch team?")) {
        window.open(`https://wa.me/919876543210?text=${waText}`, '_blank');
      }
    }, 500);

    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-lg overflow-hidden animate-pop">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-teal-600 to-emerald-700 text-white flex items-center justify-between">
          <div>
            <h3 className="font-black text-lg flex items-center gap-2">
              <span>📦</span> Bulk Orders & Subscription Portal
            </h3>
            <p className="text-xs text-teal-100">Corporate gifting, wedding boxes, and automated monthly deliveries</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center font-bold text-sm cursor-pointer transition-colors">
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            onClick={() => setTab('bulk')}
            className={`flex-1 py-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
              tab === 'bulk' ? 'border-teal-600 text-teal-700 bg-white' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            📦 Corporate & Bulk Inquiry
          </button>
          <button
            onClick={() => setTab('subscribe')}
            className={`flex-1 py-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
              tab === 'subscribe' ? 'border-teal-600 text-teal-700 bg-white' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            🔁 Monthly Auto-Subscribe (15% Off)
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Your Full Name *</label>
              <input type="text" required placeholder="e.g. Ayush Sharma" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-stone-200 rounded-xl outline-none focus:border-teal-600 font-semibold text-stone-800" />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">WhatsApp / Phone *</label>
              <input type="tel" required placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border border-stone-200 rounded-xl outline-none focus:border-teal-600 font-semibold text-stone-800" />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Email Address (For SMS/Email Alerts) *</label>
            <input type="email" required placeholder="ayush@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border border-stone-200 rounded-xl outline-none focus:border-teal-600 font-semibold text-stone-800" />
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Select Product Category / Plan *</label>
            <select value={formData.itemPreference} onChange={e => setFormData({...formData, itemPreference: e.target.value})} className="w-full p-2 border border-stone-200 rounded-xl outline-none focus:border-teal-600 font-bold text-stone-800 bg-white cursor-pointer">
              <option value="Assorted Homemade Pickles (Mango, Garlic, Lemon)">Assorted Homemade Pickles (Mango, Garlic, Lemon)</option>
              <option value="Traditional Sweets Gift Boxes (Kaju Katli, Ladoo)">Traditional Sweets Gift Boxes (Kaju Katli, Ladoo)</option>
              <option value="South Indian Savories & Snacks Combo">South Indian Savories & Snacks Combo</option>
              <option value="Organic Spices & Masala Powder Pack">Organic Spices & Masala Powder Pack</option>
            </select>
          </div>

          {tab === 'bulk' ? (
            <div>
              <label className="font-bold text-stone-700 block mb-1">Estimated Quantity Requirement *</label>
              <input type="text" required placeholder="e.g. 50 Boxes / 25 Kg for Wedding" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} className="w-full p-2 border border-stone-200 rounded-xl outline-none focus:border-teal-600 font-semibold text-stone-800" />
            </div>
          ) : (
            <div>
              <label className="font-bold text-stone-700 block mb-1">Delivery Frequency *</label>
              <select value={formData.frequency} onChange={e => setFormData({...formData, frequency: e.target.value})} className="w-full p-2 border border-stone-200 rounded-xl outline-none focus:border-teal-600 font-bold text-stone-800 bg-white cursor-pointer">
                <option value="Every 15 Days (Bi-Weekly)">Every 15 Days (Bi-Weekly)</option>
                <option value="Every 30 Days (Monthly)">Every 30 Days (Monthly)</option>
                <option value="Every 60 Days (Bi-Monthly)">Every 60 Days (Bi-Monthly)</option>
              </select>
            </div>
          )}

          <div>
            <label className="font-bold text-stone-700 block mb-1">Special Instructions / Festival Customization</label>
            <textarea rows="2" placeholder="Any custom packaging or diet preferences..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full p-2 border border-stone-200 rounded-xl outline-none focus:border-teal-600 font-semibold text-stone-800 resize-none"></textarea>
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm">
              <span>{tab === 'bulk' ? '📨 Submit Bulk Order Request' : '⚡ Activate Auto-Subscription'}</span>
            </button>
            <p className="text-[10px] text-center text-stone-400 mt-2 flex items-center justify-center gap-1">
              <span>📲</span> Instant WhatsApp Business API notification will be generated upon submission.
            </p>
          </div>
        </form>

      </div>
    </div>
  );
}
