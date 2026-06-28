import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const DEMO_USERS = [
  { email: 'demo@sharadha.com', password: 'demo123', name: 'Demo Customer' },
];

export default function CustomerLogin({ setCustomerAuth }) {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
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
        setError('Invalid email or password.');
      }
      setLoading(false);
    }, 700);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (form.password !== form.confirm) { setError('Passwords do not match.'); setLoading(false); return; }
      if (form.password.length < 6) { setError('Password must be at least 6 characters.'); setLoading(false); return; }
      const users = JSON.parse(localStorage.getItem('sharadha_users') || '[]');
      if (users.find((u) => u.email === form.email)) { setError('Account already exists with this email.'); setLoading(false); return; }
      const newUser = { name: form.name, email: form.email, password: form.password };
      localStorage.setItem('sharadha_users', JSON.stringify([...users, newUser]));
      const session = { name: form.name, email: form.email };
      localStorage.setItem('sharadha_customer', JSON.stringify(session));
      setCustomerAuth(session);
      navigate('/shop');
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-col justify-between w-[46%] relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #0d9488 0%, #0f766e 40%, #c2410c 100%)' }}>
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
        
        <div className="relative z-10 p-8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Sharadha" className="w-14 h-14 object-contain drop-shadow-lg" />
            <div>
              <div className="text-white font-black text-2xl tracking-tight leading-none">SHARADHA</div>
              <div className="text-teal-200 text-xs font-bold tracking-widest">STORES & SAVORIES</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 p-8">
          <blockquote className="text-white/90 text-3xl font-black leading-snug mb-6">
            Authentic flavors,<br />crafted with love.
          </blockquote>
          <p className="text-teal-100/80 text-sm font-medium leading-relaxed max-w-xs">
            From our kitchen to your table — traditional pickles, handcrafted sweets, and aromatic spices made the authentic way.
          </p>
        </div>

        <div className="relative z-10 p-8">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <span className="text-3xl">🎁</span>
            <div>
              <div className="text-white font-bold text-sm">Demo account available</div>
              <div className="text-teal-100 text-xs font-medium">demo@sharadha.com · demo123</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 bg-[#fafaf8] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <img src="/logo.png" alt="Sharadha" className="w-10 h-10 object-contain" />
            <div>
              <div className="font-black text-lg text-stone-900 leading-none">SHARADHA</div>
              <div className="text-teal-600 text-[10px] font-bold tracking-widest">STORES & SAVORIES</div>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-stone-900 mb-1">
              {tab === 'login' ? 'Welcome back 👋' : 'Create account ✨'}
            </h1>
            <p className="text-stone-500 text-sm font-medium">
              {tab === 'login'
                ? 'Sign in to access your account and orders.'
                : 'Join Sharadha Stores for an authentic experience.'}
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-stone-100 rounded-2xl p-1 mb-8 gap-1">
            {[['login', '🔑 Sign In'], ['signup', '✨ Register']].map(([key, label]) => (
              <button
                key={key}
                onClick={() => { setTab(key); setError(''); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                  tab === key
                    ? 'bg-white text-teal-600 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Form */}
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <InputField label="Email" type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" icon="✉️" />
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none">🔒</span>
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={update('password')}
                    placeholder="Your password"
                    className="w-full pl-9 pr-12 py-3 bg-white border border-stone-200 rounded-xl text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 outline-none transition-all shadow-sm"
                  />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-teal-600 text-xs font-bold cursor-pointer">
                    {showPass ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {error && <ErrorBox msg={error} />}

              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl font-black text-sm text-white transition-all hover:scale-[1.01] active:scale-100 cursor-pointer disabled:opacity-70 shadow-lg mt-2"
                style={{ background: 'linear-gradient(135deg, #0d9488, #0f766e)' }}>
                {loading ? <Spinner label="Signing in..." /> : '→ Sign In'}
              </button>

              <div className="bg-amber-50 border border-amber-200/80 rounded-xl px-4 py-2.5 text-center">
                <p className="text-amber-700 text-xs font-semibold">
                  Try demo: <strong>demo@sharadha.com</strong> / <strong>demo123</strong>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <InputField label="Full Name" type="text" value={form.name} onChange={update('name')} placeholder="Your name" icon="👤" />
              <InputField label="Email" type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" icon="✉️" />
              <div className="grid grid-cols-2 gap-3">
                <PasswordField label="Password" value={form.password} onChange={update('password')} placeholder="Min. 6 chars" />
                <PasswordField label="Confirm" value={form.confirm} onChange={update('confirm')} placeholder="Re-enter" />
              </div>

              {error && <ErrorBox msg={error} />}

              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl font-black text-sm text-white transition-all hover:scale-[1.01] active:scale-100 cursor-pointer disabled:opacity-70 shadow-lg mt-2"
                style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>
                {loading ? <Spinner label="Creating account..." /> : '→ Create Account'}
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-stone-200 text-center">
            <Link to="/shop" className="text-stone-400 hover:text-teal-600 text-xs font-bold transition-colors">
              ← Continue as guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, type, value, onChange, placeholder, icon }) {
  return (
    <div>
      <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none">{icon}</span>
        <input type={type} required value={value} onChange={onChange} placeholder={placeholder}
          className="w-full pl-9 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 outline-none transition-all shadow-sm" />
      </div>
    </div>
  );
}

function PasswordField({ label, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        <input type={show ? 'text' : 'password'} required value={value} onChange={onChange} placeholder={placeholder}
          className="w-full pl-3 pr-10 py-3 bg-white border border-stone-200 rounded-xl text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 outline-none transition-all shadow-sm" />
        <button type="button" onClick={() => setShow(s => !s)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-teal-600 text-[10px] font-bold cursor-pointer">
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
}

function ErrorBox({ msg }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
      <span className="text-red-500 text-sm">⚠️</span>
      <p className="text-red-600 text-xs font-semibold">{msg}</p>
    </div>
  );
}

function Spinner({ label }) {
  return (
    <span className="flex items-center justify-center gap-2">
      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
      {label}
    </span>
  );
}

