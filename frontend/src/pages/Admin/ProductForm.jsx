import { useState } from 'react';

export default function ProductForm({ fetchProducts }) {
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Pickles', price: '', weight_g: '' });
  const [imageFile, setImageFile] = useState(null);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('category', newProduct.category);
    formData.append('price', newProduct.price);
    formData.append('weight_g', newProduct.weight_g);
    if (imageFile) formData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST', body: formData
      });
      if (response.ok) {
        setNewProduct({ name: '', category: 'Pickles', price: '', weight_g: '' });
        setImageFile(null);
        e.target.reset();
        fetchProducts(); 
      }
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
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
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Price & Weight</label>
          <div className="flex gap-2">
            <input type="number" required placeholder="₹" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-4 py-2 border rounded-xl" />
            <input type="number" placeholder="g" value={newProduct.weight_g} onChange={e => setNewProduct({...newProduct, weight_g: e.target.value})} className="w-full px-4 py-2 border rounded-xl" />
          </div>
        </div>
        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Product Image</label>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-xl w-full h-10 transition-colors">Save Item</button>
        </div>
      </form>
    </div>
  );
}