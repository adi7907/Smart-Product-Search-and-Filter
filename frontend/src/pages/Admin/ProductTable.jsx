export default function ProductTable({ products }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b">
          <tr><th className="px-6 py-4">Image</th><th className="px-6 py-4">Name</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Price</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map(p => (
            <tr key={p.id}>
              <td className="px-6 py-4">
                {p.image_url ? (
                  <img src={`http://localhost:5000${p.image_url}`} alt={p.name} className="w-12 h-12 object-cover rounded-lg border" />
                ) : (
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400">No Img</div>
                )}
              </td>
              <td className="px-6 py-4 font-bold text-slate-800">{p.name}</td>
              <td className="px-6 py-4">{p.category}</td>
              <td className="px-6 py-4 font-medium">₹{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}