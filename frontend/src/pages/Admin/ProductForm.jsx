import { useState } from 'react';
import ProductDetailsFields from './ProductDetailsFields';
import ImageUpload from './ImageUpload';

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
    if (newProduct.ingredients) formData.append('ingredients', newProduct.ingredients);
    if (newProduct.festival_need) formData.append('festival_need', newProduct.festival_need);
    if (newProduct.dietary_preference) formData.append('dietary_preference', newProduct.dietary_preference);
    if (imageFile) formData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST', body: formData
      });
      if (response.ok) {
        setNewProduct({ name: '', category: 'Pickles', price: '', weight_g: '', ingredients: '', festival_need: '', dietary_preference: '' });
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
        
        {/* 1. Core Input Fields Module */}
        <ProductDetailsFields newProduct={newProduct} setNewProduct={setNewProduct} />
        
        {/* 2. Image Upload Module */}
        <ImageUpload setImageFile={setImageFile} />
        
        {/* 3. Submit Action */}
        <div className="md:col-span-2">
          <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-xl w-full h-10 transition-colors shadow-sm">
            Save Item
          </button>
        </div>
        
      </form>
    </div>
  );
}