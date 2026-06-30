export default function CheckboxGroup({ title, options, selectedState, setSelectedState }) {
  const toggleOption = (option) => {
    setSelectedState(selectedState.includes(option)
      ? selectedState.filter(o => o !== option)
      : [...selectedState, option]
    );
  };

  const count = selectedState.length;

  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
          {title}
          {count > 0 && (
            <span className="w-4 h-4 bg-stone-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </h3>
        {count > 0 && (
          <button onClick={() => setSelectedState([])}
            className="text-[10px] font-bold text-stone-600 hover:text-stone-900 cursor-pointer transition-colors">
            Clear
          </button>
        )}
      </div>
      <div className="space-y-1 max-h-40 overflow-y-auto pr-1 scrollbar-none">
        {options.map(opt => (
          <label key={opt}
            className={`flex items-center gap-2.5 cursor-pointer px-2.5 py-1.5 rounded-lg transition-all group ${
              selectedState.includes(opt)
                ? 'bg-stone-100 border border-stone-300'
                : 'hover:bg-slate-50 border border-transparent'
            }`}>
            <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
              selectedState.includes(opt)
                ? 'border-stone-900 bg-stone-900'
                : 'border-slate-300 group-hover:border-stone-500 bg-white'
            }`}
              style={{ width: '16px', height: '16px' }}>
              {selectedState.includes(opt) && <span className="text-white text-[9px] font-black">✓</span>}
            </div>
            <span className={`text-xs font-medium transition-colors ${
              selectedState.includes(opt) ? 'text-stone-900 font-bold' : 'text-slate-600 group-hover:text-slate-900'
            }`}>{opt}</span>
            <input type="checkbox" className="hidden" checked={selectedState.includes(opt)} onChange={() => toggleOption(opt)} />
          </label>
        ))}
      </div>
    </div>
  );
}
