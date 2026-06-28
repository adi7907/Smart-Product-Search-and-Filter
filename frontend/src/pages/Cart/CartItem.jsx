import { API_URL } from '../../config';

function resolveImageUrl(url) {
  if (!url) return '/placeholder.png';
  if (url.startsWith('http') || url.startsWith('/')) return url;
  return `${API_URL}${url}`;
}

export default function CartItem({ item, updateQuantity }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 bg-white rounded-xl border border-slate-100 hover:border-teal-200 transition-colors shadow-2xs">
      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200/60">
        <img
          src={resolveImageUrl(item.image_url)}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = 'https://placehold.co/64x64/f8fafc/0d9488?text=🍽️'; }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-800 text-xs truncate">{item.name}</h4>
        <p className="text-teal-700 font-bold text-xs">₹{item.price}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className="w-6 h-6 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-bold transition-colors cursor-pointer text-xs border border-slate-200"
          >−</button>
          <span className="font-bold text-xs w-4 text-center text-slate-800">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className="w-6 h-6 flex items-center justify-center bg-teal-600 hover:bg-teal-700 rounded text-white font-bold transition-colors cursor-pointer text-xs shadow-2xs"
          >+</button>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="font-bold text-slate-900 text-xs">₹{item.price * item.quantity}</p>
      </div>
    </div>
  );
}
