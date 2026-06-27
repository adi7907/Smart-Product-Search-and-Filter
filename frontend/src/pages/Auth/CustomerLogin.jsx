import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const DEMO_USERS = [
  { email: 'demo@sharadha.com', password: 'demo123', name: 'Demo Customer' },
];

export default function CustomerLogin({ setCustomerAuth }) {
  const [tab, setTab] = useState('login'); // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('sharadha_users') || '[]');
      const allUsers = [...DEMO_USERS, ...users];
      const user = allUsers.find((u) => u.email === form.email && u.password === form.password);
      if (user) {
        const session = { name: user.name, email: user.email };
        localStorage.setItem('sharadha_customer', JSON.stringify(session));
        setCustomerAuth(session);
        navigate('/shop');
      } else {
        setError('Invalid email or password. Try demo@sharadha.com / demo123');
      }
      setLoading(false);
    }, 800);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (form.password !== form.confirm) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }
      const users = JSON.parse(localStorage.getItem('sharadha_users') || '[]');
      if (users.find((u) => u.email === form.email)) {
        setError('An account with this email already exists.');
        setLoading(false);
        return;
      }
      const newUser = { name: form.name, email: form.email, password: form.password };
      localStorage.setItem('sharadha_users', JSON.stringify([...users, newUser]));
      localStorage.setItem('sharadha_customer', JSON.stringify({ name: form.name, email: form.email }));
      setCustomerAuth({ name: form.name, email: form.email });
      navigate('/shop');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-100/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-orange-900/10 border border-orange-100/80 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-br from-orange-600 via-amber-600 to-orange-500 p-8 text-center relative">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }}
            />
            <div className="flex items-center justify-center gap-3 mb-3 relative z-10">
              <img src="/logo.png" alt="Sharadha" className="w-12 h-12 object-contain drop-shadow-lg" />
              <div className="text-left">
                <h1 className="text-white font-black text-2xl leading-tight tracking-tight">SHARADHA</h1>
                <p className="text-orange-100 text-[11px] font-bold tracking-widest">STORES & SAVORIES</p>
              </div>
            </div>
            <p className="text-orange-100/90 text-sm font-medium relative z-10">
              {tab === 'login' ? 'Welcome back! Sign in to your account.' : 'Join us for authentic homemade goodness.'}
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex border-b border-stone-200 bg-stone-50/50">
            <button
              onClick={() => { setTab('login'); setError(''); }}
              className={`flex-1 py-3.5 text-sm font-extrabold transition-all cursor-pointer ${
                tab === 'login'
                  ? 'text-orange-600 border-b-2 border-orange-600 bg-white'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              🔑 Sign In
            </button>
            <button
              onClick={() => { setTab('signup'); setError(''); }}
              className={`flex-1 py-3.5 text-sm font-extrabold transition-all cursor-pointer ${
                tab === 'signup'
                  ? 'text-orange-600 border-b-2 border-orange-600 bg-white'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              ✨ Create Account
            </button>
          </div>

          {/* Form */}
          <div className="p-8">
            {tab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-base">📧</span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Password</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-base">🔒</span>
                    <input
                      type="password"
                      required
                      value={form.password}
                      onChange={update('password')}
                      placeholder="Your password"
                      className="w-full pl-10 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 flex items-start gap-2">
                    <span className="text-red-500 text-sm mt-0.5">⚠️</span>
                    <p className="text-red-600 text-xs font-semibold leading-snug">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-700 hover:to-amber-700 disabled:opacity-70 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {loading ? (
                    <><span className="animate-spin text-lg">⏳</span> Signing in...</>
                  ) : (
                    <><span>🚀</span> Sign In to Shop</>
                  )}
                </button>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-center">
                  <p className="text-amber-800 text-xs font-semibold">🎁 Demo: <span className="font-black">demo@sharadha.com</span> / <span className="font-black">demo123</span></p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-base">👤</span>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-base">📧</span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Password</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-base">🔒</span>
                    <input
                      type="password"
                      required
                      value={form.password}
                      onChange={update('password')}
                      placeholder="Min. 6 characters"
                      className="w-full pl-10 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Confirm Password</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-base">✅</span>
                    <input
                      type="password"
                      required
                      value={form.confirm}
                      onChange={update('confirm')}
                      placeholder="Re-enter password"
                      className="w-full pl-10 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 flex items-start gap-2">
                    <span className="text-red-500 text-sm mt-0.5">⚠️</span>
                    <p className="text-red-600 text-xs font-semibold leading-snug">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 disabled:opacity-70 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {loading ? (
                    <><span className="animate-spin text-lg">⏳</span> Creating account...</>
                  ) : (
                    <><span>🎉</span> Create My Account</>
                  )}
                </button>
              </form>
            )}

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-stone-100 text-center">
              <Link
                to="/shop"
                className="text-stone-500 hover:text-orange-600 text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                ← Continue shopping as guest
              </Link>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex items-center justify-center gap-6">
          {['🔐 Secure', '🏠 Homemade', '🚚 Fast Delivery'].map((badge) => (
            <span key={badge} className="text-xs font-bold text-stone-500 flex items-center gap-1">{badge}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
