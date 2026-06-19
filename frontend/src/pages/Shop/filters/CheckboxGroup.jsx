export default function CheckboxGroup({ title, options, selectedState, setSelectedState }) {
  const toggleOption = (option) => {
    if (selectedState.includes(option)) {
      setSelectedState(selectedState.filter(o => o !== option));
    } else {
      setSelectedState([...selectedState, option]);
    }
  };

  const count = selectedState.length;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-slate-800 dark:text-white">{title} {count > 0 && `(${count})`}</h3>
        {count > 0 && (
          <button 
            onClick={() => setSelectedState([])} 
            className="text-xs text-red-500 hover:text-red-700 font-bold"
          >
            Clear
          </button>
        )}
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedState.includes(opt) ? 'bg-teal-600 border-teal-600' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-teal-500'}`}>
              {selectedState.includes(opt) && <span className="text-white text-xs">✓</span>}
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">{opt}</span>
            <input type="checkbox" className="hidden" checked={selectedState.includes(opt)} onChange={() => toggleOption(opt)} />
          </label>
        ))}
      </div>
    </div>
  );
}
