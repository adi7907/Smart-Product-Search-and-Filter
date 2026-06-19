import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import AdminReports from './reports/AdminReports';

export default function AdminScreen({ products, fetchProducts, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/shop');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <AdminHeader onLogout={handleLogout} />
      <AdminReports />
      <ProductForm fetchProducts={fetchProducts} />
      <ProductTable products={products} fetchProducts={fetchProducts} />
    </div>
  );
}