import { API_URL } from '../../config';

function resolveImageUrl(url) {
  if (!url) return '/placeholder.png';
  // Already absolute (http/https) or a public asset (/products/...)
  if (url.startsWith('http') || url.startsWith('/')) return url;
  // Legacy API upload path e.g. "/uploads/..."
  return `${API_URL}${url}`;
}

export default function CartItem({ item, updateQuantity }) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-stone-100 hover:bg-orange-50/40 transition-colors">
      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 shrink-0 shadow-sm border border-stone-200/60">
        <img
          src={resolveImageUrl(item.image_url)}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = 'https://placehold.co/64x64/fdf4f0/ea580c?text=🍽️'; }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-stone-900 text-sm truncate">{item.name}</h4>
        <p className="text-orange-600 font-extrabold text-sm">₹{item.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className="w-7 h-7 flex items-center justify-center bg-stone-100 hover:bg-orange-100 rounded-lg text-stone-700 font-black transition-colors cursor-pointer text-sm border border-stone-200"
          >−</button>
          <span className="font-black text-sm w-5 text-center text-stone-800">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className="w-7 h-7 flex items-center justify-center bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-black transition-colors cursor-pointer text-sm shadow-sm"
          >+</button>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="font-black text-stone-900 text-base">₹{item.price * item.quantity}</p>
      </div>
    </div>
  );
}
