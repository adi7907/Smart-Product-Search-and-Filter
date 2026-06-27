import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ShopScreen from './pages/Shop/Shop';
import AdminScreen from './pages/Admin/Admin';
import LoginScreen from './pages/Admin/Login';
import CustomerLogin from './pages/Auth/CustomerLogin';
import { API_URL } from './config';

export default function App() {
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerAuth, setCustomerAuth] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sharadha_customer')) || null; } catch { return null; }
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleCustomerLogout = () => {
    localStorage.removeItem('sharadha_customer');
    setCustomerAuth(null);
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-800 font-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/shop" replace />} />
          <Route path="/shop" element={<ShopScreen products={products} customerAuth={customerAuth} onLogout={handleCustomerLogout} />} />
          <Route path="/customer-login" element={<CustomerLogin setCustomerAuth={setCustomerAuth} />} />
          <Route path="/login" element={<LoginScreen setIsAuthenticated={setIsAuthenticated} />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminScreen products={products} fetchProducts={fetchProducts} setIsAuthenticated={setIsAuthenticated} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}