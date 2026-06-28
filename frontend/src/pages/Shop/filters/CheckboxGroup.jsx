export default function CheckboxGroup({ title, options, selectedState, setSelectedState }) {
  const toggleOption = (option) => {
    setSelectedState(selectedState.includes(option)
      ? selectedState.filter(o => o !== option)
      : [...selectedState, option]
    );
  };

  const count = selectedState.length;

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-extrabold text-stone-800 text-sm flex items-center gap-2">
          {title}
          {count > 0 && (
            <span className="w-5 h-5 bg-orange-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </h3>
        {count > 0 && (
          <button onClick={() => setSelectedState([])}
            className="text-[11px] font-bold text-orange-500 hover:text-orange-700 cursor-pointer transition-colors">
            Clear
          </button>
        )}
      </div>
      <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1 scrollbar-none">
        {options.map(opt => (
          <label key={opt}
            className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-xl transition-all group ${
              selectedState.includes(opt)
                ? 'bg-orange-50 border border-orange-200'
                : 'hover:bg-stone-50 border border-transparent'
            }`}>
            <div className={`w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
              selectedState.includes(opt)
                ? 'border-orange-500 bg-orange-500'
                : 'border-stone-300 group-hover:border-orange-400 bg-white'
            }`}
              style={{ width: '18px', height: '18px' }}>
              {selectedState.includes(opt) && <span className="text-white text-[10px] font-black">✓</span>}
            </div>
            <span className={`text-sm font-medium transition-colors ${
              selectedState.includes(opt) ? 'text-orange-700 font-bold' : 'text-stone-600 group-hover:text-stone-900'
            }`}>{opt}</span>
            <input type="checkbox" className="hidden" checked={selectedState.includes(opt)} onChange={() => toggleOption(opt)} />
          </label>
        ))}
      </div>
    </div>
  );
}
