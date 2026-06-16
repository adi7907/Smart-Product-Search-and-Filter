import ShopFilters from './ShopFilters';
import ProductGrid from './ProductGrid';

export default function ShopLayout({ 
  searchTerm, setSearchTerm, 
  category, setCategory, 
  maxPrice, setMaxPrice, 
  filteredProducts,
  products /* <-- 1. RECEIVE THE RAW DATA HERE */
}) {
  return (
    <div>
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-teal-800">Sharadha Stores</h1>
            <p className="text-xs text-slate-500 uppercase font-bold mt-1">Smart Search Portal</p>
          </div>
        </div>
      </nav>

      {/* Main Layout Area */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* The Filter Sidebar Component */}
        <ShopFilters 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
          category={category} setCategory={setCategory} 
          maxPrice={maxPrice} setMaxPrice={setMaxPrice} 
          products={products} 
        />

        {/* The Product Grid Component */}
        <ProductGrid filteredProducts={filteredProducts} />
        
      </div>
    </div>
  );
}