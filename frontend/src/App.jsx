import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ToastProvider } from './context/ToastContext';
import HomePage from './pages/Home/HomePage';
import ShopScreen from './pages/Shop/Shop';
import AdminScreen from './pages/Admin/Admin';
import LoginScreen from './pages/Admin/Login';
import CustomerLogin from './pages/Auth/CustomerLogin';
import CheckoutFlow from './pages/Checkout/CheckoutFlow';
import OrdersPage from './pages/Orders/OrdersPage';
import ProfilePage from './pages/Profile/ProfilePage';
import WishlistPage from './pages/Wishlist/WishlistPage';
import { API_URL } from './config';

export default function App() {
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerAuth, setCustomerAuth] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sharadha_customer')) || null; } catch { return null; }
  });
  // Cart is lifted to App so CheckoutFlow can access it
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
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
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage customerAuth={customerAuth} />} />
          <Route path="/shop" element={
            <ShopScreen
              products={products}
              customerAuth={customerAuth}
              onLogout={handleCustomerLogout}
              cart={cart}
              setCart={setCart}
            />}
          />
          <Route path="/checkout" element={
            <CheckoutFlow
              cart={cart}
              setCart={setCart}
              customerAuth={customerAuth}
            />}
          />
          <Route path="/orders" element={<OrdersPage customerAuth={customerAuth} />} />
          <Route path="/profile" element={<ProfilePage customerAuth={customerAuth} onLogout={handleCustomerLogout} />} />
          <Route path="/wishlist" element={<WishlistPage customerAuth={customerAuth} />} />
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
    </ToastProvider>
  );
}