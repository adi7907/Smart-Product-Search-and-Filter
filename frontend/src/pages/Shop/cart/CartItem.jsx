export default function CartItem({ item, updateQuantity }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-slate-100 dark:border-slate-700">
      <img 
        src={item.image_url ? `http://localhost:5000${item.image_url}` : "/placeholder.png"} 
        alt={item.name} 
        className="w-16 h-16 object-cover rounded-xl bg-slate-100 dark:bg-slate-800"
      />
      <div className="flex-1">
        <h4 className="font-bold text-slate-800 dark:text-white">{item.name}</h4>
        <p className="text-teal-600 dark:text-teal-400 font-bold">₹{item.price}</p>
        <div className="flex items-center gap-3 mt-2 bg-slate-50 dark:bg-slate-800 w-fit rounded-lg p-1">
          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center bg-white dark:bg-slate-700 rounded shadow-sm text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 font-bold">-</button>
          <span className="font-bold text-sm w-4 text-center dark:text-white">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center bg-white dark:bg-slate-700 rounded shadow-sm text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 font-bold">+</button>
        </div>
      </div>
      <p className="font-bold text-slate-800 dark:text-white">₹{item.price * item.quantity}</p>
    </div>
  );
}
