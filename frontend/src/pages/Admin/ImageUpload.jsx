export default function ImageUpload({ setImageFile }) {
  return (
    <div className="md:col-span-3">
      <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
        Product Image
      </label>
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setImageFile(e.target.files[0])} 
        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-colors" 
      />
    </div>
  );
}