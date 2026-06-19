import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

export default function AdminScreen({ products, fetchProducts, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/shop');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 1. Render the top bar */}
      <AdminHeader onLogout={handleLogout} />
      
      {/* 2. Render the data entry form */}
      <ProductForm fetchProducts={fetchProducts} />
      
      {/* 3. Render the dynamic inventory table */}
      <ProductTable products={products} fetchProducts={fetchProducts} />
    </div>
  );
}