import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginScreen({ setIsAuthenticated }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthenticated(true);
      navigate('/admin'); 
    } else {
      setError('Invalid password. Access denied.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-teal-800">Admin Portal</h2>
          <p className="text-slate-500 text-sm mt-2">Authorized Personnel Only</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Master Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors">
            Secure Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/shop" className="text-teal-600 hover:text-teal-800 text-sm font-semibold underline underline-offset-4">← Back to Store</Link>
        </div>
      </div>
    </div>
  );
}
