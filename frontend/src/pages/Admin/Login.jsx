import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginScreen({ setIsAuthenticated }) {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password === '1234') {
        setIsAuthenticated(true);
        navigate('/admin');
      } else {
        setError('Invalid password. Access denied.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative w-full max-w-sm animate-fade-up">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100">
          {/* Top accent */}
          <div className="h-2" style={{ background: 'linear-gradient(90deg, #f97316, #ea580c, #c2410c)' }} />

          <div className="p-8">
            {/* Logo + title */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1c1917, #292524)' }}>
                <span className="text-2xl">🔐</span>
              </div>
              <h1 className="text-2xl font-black text-stone-900 mb-1">Admin Portal</h1>
              <p className="text-stone-500 text-sm font-medium">Sharadha Stores Management</p>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full">
                <span>⚠️</span> Authorized Personnel Only
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-stone-500 uppercase tracking-wider mb-2">Master Password</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">🔑</span>
                  <input
                    type={show ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    placeholder="Enter admin password"
                    className="w-full pl-10 pr-12 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 outline-none transition-all"
                  />
                  <button type="button" onClick={() => setShow(s => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-orange-600 text-xs font-bold cursor-pointer">
                    {show ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <span className="text-red-500">⚠️</span>
                  <p className="text-red-600 text-sm font-semibold">{error}</p>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-2xl font-black text-white text-sm shadow-lg transition-all hover:scale-[1.01] active:scale-100 cursor-pointer disabled:opacity-70"
                style={{ background: 'linear-gradient(135deg, #1c1917, #292524)' }}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-smooth" />
                    Verifying...
                  </span>
                ) : '🔐 Secure Login'}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-stone-100 text-center">
              <Link to="/shop" className="text-stone-400 hover:text-orange-600 text-xs font-bold transition-colors">
                ← Back to Sharadha Store
              </Link>
            </div>
          </div>
        </div>

        <p className="text-stone-500 text-xs text-center mt-4 font-medium">
          Demo password: <strong className="text-stone-300">1234</strong>
        </p>
      </div>
    </div>
  );
}
