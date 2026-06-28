import { useState } from 'react';
import ProductDetailsFields from './ProductDetailsFields';
import ImageUpload from './ImageUpload';
import { API_URL } from '../../config';
import { PlusIcon } from '../../components/Icons';

export default function ProductForm({ fetchProducts }) {
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Pickles', price: '', weight_g: '', rating: '4.8', dietary_preference: 'Vegan', festival_need: 'Everyday Use' });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('category', newProduct.category);
    formData.append('price', newProduct.price);
    formData.append('weight_g', newProduct.weight_g || 0);
    formData.append('rating', newProduct.rating || 4.5);
    if (newProduct.ingredients) formData.append('ingredients', newProduct.ingredients);
    if (newProduct.festival_need) formData.append('festival_need', newProduct.festival_need);
    if (newProduct.dietary_preference) formData.append('dietary_preference', newProduct.dietary_preference);
    if (imageFile) formData.append('image', imageFile);

    try {
      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST', body: formData
      });
      if (response.ok) {
        setNewProduct({ name: '', category: 'Pickles', price: '', weight_g: '', rating: '4.8', ingredients: '', festival_need: 'Everyday Use', dietary_preference: 'Vegan' });
        setImageFile(null);
        e.target.reset();
        fetchProducts(); 
      }
    } catch (error) {
      console.error("Failed to add product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black">
          <PlusIcon className="w-5 h-5 stroke-[3]" />
        </div>
        <h3 className="text-xl font-black text-stone-900">Add New Inventory Item</h3>
      </div>

      <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <ProductDetailsFields newProduct={newProduct} setNewProduct={setNewProduct} />
        <ImageUpload setImageFile={setImageFile} />
        
        <div className="md:col-span-2">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl font-black text-white text-sm shadow-lg transition-all hover:scale-[1.01] active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}
          >
            {isSubmitting ? (
               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <PlusIcon className="w-4 h-4 stroke-[3]" /> Save Item to Inventory
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}