import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders';
import { useWishlist } from '../../hooks/useWishlist';

export default function ProfilePage({ customerAuth, onLogout }) {
  const navigate = useNavigate();
  const { getOrders } = useOrders();
  const { getCount } = useWishlist();
  const orders = getOrders();
  const wishlistCount = getCount();

  const [tab, setTab] = useState('profile'); // profile | addresses
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: customerAuth?.name || '',
    email: customerAuth?.email || '',
    phone: customerAuth?.phone || '',
  });

  const addresses = (() => { try { return JSON.parse(localStorage.getItem('sharadha_addresses') || '[]'); } catch { return []; } })();
  const [addrs, setAddrs] = useState(addresses);
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [newAddr, setNewAddr] = useState({ name: '', phone: '', line1: '', line2: '', city: '', pincode: '', state: 'Tamil Nadu' });

  if (!customerAuth) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-black text-stone-900 mb-2">Sign in to view profile</h2>
          <Link to="/customer-login" className="mt-4 inline-block px-6 py-3 rounded-xl font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>Sign In</Link>
        </div>
      </div>
    );
  }

  const saveProfile = () => {
    const session = { ...customerAuth, ...form };
    localStorage.setItem('sharadha_customer', JSON.stringify(session));
    setEditing(false);
  };

  const saveNewAddress = () => {
    const updated = [...addrs, newAddr];
    localStorage.setItem('sharadha_addresses', JSON.stringify(updated));
    setAddrs(updated);
    setShowAddrForm(false);
    setNewAddr({ name: '', phone: '', line1: '', line2: '', city: '', pincode: '', state: 'Tamil Nadu' });
  };

  const deleteAddress = (i) => {
    const updated = addrs.filter((_, idx) => idx !== i);
    localStorage.setItem('sharadha_addresses', JSON.stringify(updated));
    setAddrs(updated);
  };

  const handleLogout = () => { onLogout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-stone-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-6 py-5 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link to="/shop" className="text-stone-500 hover:text-orange-600 font-bold text-sm">← Shop</Link>
          <div className="flex-1 text-center"><h1 className="font-black text-stone-900 text-xl">My Profile</h1></div>
          <button onClick={handleLogout} className="text-sm font-bold text-red-500 hover:text-red-700 cursor-pointer">Sign Out</button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-8 flex items-center gap-6 border-b border-stone-100"
            style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fdfbf7 100%)' }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-black text-white shadow-xl shrink-0"
              style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>
              {customerAuth.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-black text-stone-900">{customerAuth.name}</h2>
              <p className="text-stone-500 text-sm">{customerAuth.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">⭐ Valued Customer</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 divide-x divide-stone-100">
            {[
              { label: 'Orders', value: orders.length, icon: '📦', link: '/orders' },
              { label: 'Wishlist', value: wishlistCount, icon: '❤️', link: '/wishlist' },
              { label: 'Savings', value: `₹${orders.reduce((s, o) => s + (o.discount || 0), 0)}`, icon: '💰', link: null },
            ].map(stat => (
              <div key={stat.label} className="p-5 text-center hover:bg-stone-50 transition-colors">
                {stat.link ? (
                  <Link to={stat.link} className="block">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="font-black text-stone-900 text-xl">{stat.value}</div>
                    <div className="text-stone-500 text-xs font-medium">{stat.label}</div>
                  </Link>
                ) : (
                  <>
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="font-black text-stone-900 text-xl">{stat.value}</div>
                    <div className="text-stone-500 text-xs font-medium">{stat.label}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-2xl border border-stone-200 p-1 gap-1">
          {[['profile', '👤 Profile Info'], ['addresses', '📍 Saved Addresses']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${tab === key ? 'text-orange-600 bg-orange-50' : 'text-stone-500 hover:text-stone-700'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Profile Info Tab */}
        {tab === 'profile' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-stone-900">Personal Information</h3>
              <button onClick={() => setEditing(!editing)} className={`px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-all ${editing ? 'bg-stone-100 text-stone-600' : 'text-orange-600 bg-orange-50 border border-orange-200'}`}>
                {editing ? 'Cancel' : '✏️ Edit'}
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Full Name', field: 'name', icon: '👤' },
                { label: 'Email Address', field: 'email', icon: '✉️' },
                { label: 'Phone Number', field: 'phone', icon: '📞', placeholder: 'Add phone number' },
              ].map(({ label, field, icon, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">{label}</label>
                  {editing ? (
                    <input value={form[field]} onChange={e => setForm(f => ({...f, [field]: e.target.value}))} placeholder={placeholder || label}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400 outline-none" />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 rounded-xl border border-stone-100">
                      <span>{icon}</span>
                      <span className="text-stone-700 text-sm font-medium">{form[field] || <span className="text-stone-400 italic">Not set</span>}</span>
                    </div>
                  )}
                </div>
              ))}
              {editing && (
                <button onClick={saveProfile} className="w-full py-3.5 rounded-2xl font-black text-white text-sm cursor-pointer shadow-lg"
                  style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>
                  Save Changes ✓
                </button>
              )}
            </div>
          </div>
        )}

        {/* Addresses Tab */}
        {tab === 'addresses' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
              <h3 className="font-black text-stone-900">Saved Addresses</h3>
              <button onClick={() => setShowAddrForm(!showAddrForm)}
                className="px-4 py-2 rounded-xl text-sm font-bold text-orange-600 bg-orange-50 border border-orange-200 cursor-pointer hover:bg-orange-100 transition-colors">
                + Add New
              </button>
            </div>

            {showAddrForm && (
              <div className="p-6 border-b border-stone-100 bg-stone-50 space-y-3">
                <h4 className="font-bold text-stone-800 text-sm">New Address</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Name" value={newAddr.name} onChange={e => setNewAddr(a => ({...a, name: e.target.value}))} className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:border-orange-400" />
                  <input placeholder="Phone" value={newAddr.phone} onChange={e => setNewAddr(a => ({...a, phone: e.target.value}))} className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:border-orange-400" />
                </div>
                <input placeholder="Address Line 1" value={newAddr.line1} onChange={e => setNewAddr(a => ({...a, line1: e.target.value}))} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:border-orange-400" />
                <input placeholder="Area / Landmark (optional)" value={newAddr.line2} onChange={e => setNewAddr(a => ({...a, line2: e.target.value}))} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:border-orange-400" />
                <div className="grid grid-cols-3 gap-3">
                  <input placeholder="City" value={newAddr.city} onChange={e => setNewAddr(a => ({...a, city: e.target.value}))} className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:border-orange-400" />
                  <input placeholder="Pincode" value={newAddr.pincode} onChange={e => setNewAddr(a => ({...a, pincode: e.target.value}))} className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:border-orange-400" />
                  <input placeholder="State" value={newAddr.state} onChange={e => setNewAddr(a => ({...a, state: e.target.value}))} className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:border-orange-400" />
                </div>
                <div className="flex gap-3">
                  <button onClick={saveNewAddress} className="flex-1 py-3 rounded-2xl font-black text-white text-sm cursor-pointer" style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>Save Address</button>
                  <button onClick={() => setShowAddrForm(false)} className="px-5 py-3 rounded-2xl font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors text-sm cursor-pointer">Cancel</button>
                </div>
              </div>
            )}

            <div className="divide-y divide-stone-100">
              {addrs.length === 0 && !showAddrForm ? (
                <div className="p-8 text-center text-stone-400">
                  <div className="text-4xl mb-2">📍</div>
                  <p className="font-semibold">No saved addresses yet.</p>
                </div>
              ) : addrs.map((a, i) => (
                <div key={i} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-stone-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5">📍</div>
                    <div>
                      <div className="font-bold text-stone-900 text-sm">{a.name}</div>
                      <div className="text-stone-600 text-sm">{a.line1}{a.line2 ? `, ${a.line2}` : ''}</div>
                      <div className="text-stone-500 text-xs">{a.city} - {a.pincode} · 📞 {a.phone}</div>
                    </div>
                  </div>
                  <button onClick={() => deleteAddress(i)} className="text-stone-400 hover:text-red-500 transition-colors font-bold text-sm cursor-pointer">🗑️</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'My Orders', icon: '📦', link: '/orders', desc: `${orders.length} past orders` },
            { label: 'Wishlist', icon: '❤️', link: '/wishlist', desc: `${wishlistCount} saved items` },
          ].map(item => (
            <Link key={item.label} to={item.link}
              className="bg-white rounded-2xl border border-stone-200 p-5 flex items-center gap-4 hover:border-orange-300 hover:shadow-md transition-all">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <div className="font-bold text-stone-900">{item.label}</div>
                <div className="text-stone-500 text-xs">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
