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

  const [tab, setTab] = useState('profile');
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center max-w-sm w-full shadow-sm">
          <div className="text-4xl mb-3">🔒</div>
          <h2 className="text-base font-bold text-slate-800 mb-1">Sign in required</h2>
          <p className="text-slate-500 text-xs mb-4">Please log in to manage your profile and addresses.</p>
          <Link to="/customer-login" className="block w-full py-2.5 rounded-xl font-bold text-xs text-white bg-teal-600 hover:bg-teal-700 transition-colors">Sign In</Link>
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
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link to="/shop" className="text-slate-500 hover:text-teal-600 font-bold text-xs flex items-center gap-1">
            <span>←</span> Shop
          </Link>
          <h1 className="font-bold text-slate-800 text-sm">Account Overview</h1>
          <button onClick={handleLogout} className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors cursor-pointer">Sign Out</button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 flex items-center gap-4 bg-gradient-to-r from-teal-800 to-slate-900 text-white">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-xl font-black text-teal-200 shrink-0">
              {customerAuth.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-bold text-white truncate">{customerAuth.name}</h2>
              <p className="text-teal-200/80 text-xs truncate">{customerAuth.email}</p>
              <div className="mt-1.5 inline-block bg-teal-500/20 border border-teal-400/30 text-teal-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                ⭐ Verified Member
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 divide-x divide-slate-100 bg-slate-50/50">
            {[
              { label: 'Orders', value: orders.length, link: '/orders' },
              { label: 'Wishlist', value: wishlistCount, link: '/wishlist' },
              { label: 'Saved', value: `₹${orders.reduce((s, o) => s + (o.discount || 0), 0)}`, link: null },
            ].map(stat => (
              <div key={stat.label} className="p-3 text-center">
                {stat.link ? (
                  <Link to={stat.link} className="block hover:opacity-80 transition-opacity">
                    <div className="font-extrabold text-slate-800 text-base leading-tight">{stat.value}</div>
                    <div className="text-slate-400 text-[11px] font-medium">{stat.label}</div>
                  </Link>
                ) : (
                  <div>
                    <div className="font-extrabold text-teal-700 text-base leading-tight">{stat.value}</div>
                    <div className="text-slate-400 text-[11px] font-medium">{stat.label}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-200/60 p-1 rounded-xl gap-1">
          {[['profile', 'Personal Details'], ['addresses', 'Saved Addresses']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${tab === key ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Profile Info Tab */}
        {tab === 'profile' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Contact Details</h3>
              <button onClick={() => setEditing(!editing)} className="text-xs font-bold text-teal-600 hover:text-teal-700 cursor-pointer">
                {editing ? 'Cancel' : 'Edit Details'}
              </button>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Full Name', field: 'name' },
                { label: 'Email Address', field: 'email' },
                { label: 'Phone Number', field: 'phone', placeholder: 'Add phone number' },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">{label}</label>
                  {editing ? (
                    <input value={form[field]} onChange={e => setForm(f => ({...f, [field]: e.target.value}))} placeholder={placeholder || label}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:border-teal-500 outline-none" />
                  ) : (
                    <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-100 text-xs font-medium text-slate-800">
                      {form[field] || <span className="text-slate-400 italic">Not specified</span>}
                    </div>
                  )}
                </div>
              ))}
              {editing && (
                <button onClick={saveProfile} className="w-full mt-2 py-2.5 rounded-xl font-bold text-white text-xs bg-teal-600 hover:bg-teal-700 transition-colors cursor-pointer shadow-xs">
                  Save Changes
                </button>
              )}
            </div>
          </div>
        )}

        {/* Addresses Tab */}
        {tab === 'addresses' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Delivery Addresses</h3>
              <button onClick={() => setShowAddrForm(!showAddrForm)}
                className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 cursor-pointer transition-colors">
                + Add New
              </button>
            </div>

            {showAddrForm && (
              <div className="p-4 border-b border-slate-100 bg-slate-50 space-y-2.5">
                <h4 className="font-bold text-slate-700 text-xs">New Address</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="Full Name" value={newAddr.name} onChange={e => setNewAddr(a => ({...a, name: e.target.value}))} className="px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-teal-500" />
                  <input placeholder="Phone" value={newAddr.phone} onChange={e => setNewAddr(a => ({...a, phone: e.target.value}))} className="px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-teal-500" />
                </div>
                <input placeholder="Street Address / Flat No." value={newAddr.line1} onChange={e => setNewAddr(a => ({...a, line1: e.target.value}))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-teal-500" />
                <input placeholder="Landmark / Area (optional)" value={newAddr.line2} onChange={e => setNewAddr(a => ({...a, line2: e.target.value}))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-teal-500" />
                <div className="grid grid-cols-3 gap-2">
                  <input placeholder="City" value={newAddr.city} onChange={e => setNewAddr(a => ({...a, city: e.target.value}))} className="px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-teal-500" />
                  <input placeholder="Pincode" value={newAddr.pincode} onChange={e => setNewAddr(a => ({...a, pincode: e.target.value}))} className="px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-teal-500" />
                  <input placeholder="State" value={newAddr.state} onChange={e => setNewAddr(a => ({...a, state: e.target.value}))} className="px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-teal-500" />
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={saveNewAddress} className="flex-1 py-2 rounded-lg font-bold text-white text-xs bg-teal-600 hover:bg-teal-700 cursor-pointer">Save Address</button>
                  <button onClick={() => setShowAddrForm(false)} className="px-4 py-2 rounded-lg font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 text-xs cursor-pointer">Cancel</button>
                </div>
              </div>
            )}

            <div className="divide-y divide-slate-100">
              {addrs.length === 0 && !showAddrForm ? (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No saved addresses yet. Click "+ Add New" above.
                </div>
              ) : addrs.map((a, i) => (
                <div key={i} className="px-5 py-3.5 flex items-start justify-between gap-3 hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="font-bold text-slate-800 text-xs">{a.name} · <span className="font-normal text-slate-500">{a.phone}</span></div>
                    <div className="text-slate-600 text-xs mt-0.5">{a.line1}{a.line2 ? `, ${a.line2}` : ''}</div>
                    <div className="text-slate-400 text-[11px]">{a.city} - {a.pincode} ({a.state})</div>
                  </div>
                  <button onClick={() => deleteAddress(i)} className="text-slate-400 hover:text-red-600 transition-colors text-xs font-bold cursor-pointer">Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Order History', link: '/orders', desc: `${orders.length} orders` },
            { label: 'Wishlist Items', link: '/wishlist', desc: `${wishlistCount} saved` },
          ].map(item => (
            <Link key={item.label} to={item.link}
              className="bg-white rounded-xl border border-slate-200 p-3.5 flex items-center justify-between hover:border-teal-400 transition-colors">
              <div>
                <div className="font-bold text-slate-800 text-xs">{item.label}</div>
                <div className="text-slate-400 text-[11px]">{item.desc}</div>
              </div>
              <span className="text-slate-400 text-xs">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
