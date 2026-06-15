import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminScreen({ products, fetchProducts, setIsAuthenticated }) {
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Pickles', price: '', weight_g: '' });
  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (response.ok) {
        setNewProduct({ name: '', category: 'Pickles', price: '', weight_g: '' });
        fetchProducts(); 
      }
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/shop');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800">Inventory Operations</h2>
        <button onClick={handleLogout} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg font-bold transition-colors">
          Log Out
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Add New Inventory Item</h3>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Product Name</label>
            <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-2 border rounded-xl" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Category</label>
            <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-4 py-2 border rounded-xl">
              <option value="Pickles">Pickles</option>
              <option value="Sweets">Sweets</option>
              <option value="Snacks">Snacks</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Price (₹) & Weight (g)</label>
            <div className="flex gap-2">
              <input type="number" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-4 py-2 border rounded-xl" />
              <input type="number" value={newProduct.weight_g} onChange={e => setNewProduct({...newProduct, weight_g: e.target.value})} className="w-full px-4 py-2 border rounded-xl" />
              <button type="submit" className="bg-teal-600 text-white font-bold py-2 px-4 rounded-xl w-full">Save</button>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b">
            <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Price</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map(p => (
              <tr key={p.id}>
                <td className="px-6 py-4 font-bold text-slate-800">{p.name}</td>
                <td className="px-6 py-4">{p.category}</td>
                <td className="px-6 py-4 font-medium">₹{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}