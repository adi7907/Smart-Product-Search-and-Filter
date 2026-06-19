export default function ProductDetailModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-slate-100 transition z-10">
          ❌
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[80vh] overflow-y-auto">
          <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-100">
            {product.image_url ? (
              <img src={`http://localhost:5000${product.image_url}`} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
            )}
          </div>

          <div className="p-8 w-full md:w-1/2 flex flex-col">
            <span className="text-sm font-bold text-teal-600 bg-teal-50 w-max px-3 py-1 rounded-full mb-4">
              {product.category}
            </span>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">{product.name}</h2>
            <p className="text-2xl font-bold text-teal-700 mb-6">₹{product.price} <span className="text-sm text-slate-500 font-normal">/ {product.weight_g}g</span></p>

            <div className="space-y-6 flex-1">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">Ingredients</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{product.ingredients || "No specific ingredients listed."}</p>
              </div>

              <div className="flex gap-2">
                <span className="text-xs font-bold bg-orange-50 text-orange-600 px-2 py-1 rounded">Diet: {product.dietary_preference}</span>
                <span className="text-xs font-bold bg-pink-50 text-pink-600 px-2 py-1 rounded">Festival: {product.festival_need}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">📦 Stock & Batch Details</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Status: <span className="text-green-600 font-bold">In Stock</span></p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Shelf Life: <span className="font-bold">Estimated 30-60 days remaining</span></p>
                <p className="text-xs text-slate-400 mt-2">* Exact batch details available at checkout.</p>
              </div>
            </div>

            <button onClick={onClose} className="mt-8 w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition">
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
