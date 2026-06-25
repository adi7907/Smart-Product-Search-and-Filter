import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import ShopScreen from './pages/Shop/Shop';
import AdminScreen from './pages/Admin/Admin';
import LoginScreen from './pages/Admin/Login';
import { API_URL } from './config';

export default function App() {
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/shop" replace />} />
          <Route path="/shop" element={<ShopScreen products={products} />} />
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