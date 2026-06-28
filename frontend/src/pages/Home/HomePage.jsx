import { Link } from 'react-router-dom';

const CATEGORIES = [
  { name: 'Pickles', emoji: '🥒', desc: 'Tangy & spicy authentic achaar', color: '#fef9c3', border: '#fde047', img: '/products/mango_pickle.png' },
  { name: 'Sweets', emoji: '🍬', desc: 'Traditional mithai & ladoos', color: '#fce7f3', border: '#f9a8d4', img: '/products/kaju_katli.png' },
  { name: 'Snacks', emoji: '🥜', desc: 'Crunchy & savory bites', color: '#fef3c7', border: '#fbbf24', img: '/products/namkeen.png' },
  { name: 'Beverages', emoji: '☕', desc: 'Filter coffee, masala chai', color: '#ecfdf5', border: '#6ee7b7', img: '/products/filter_coffee.png' },
  { name: 'Spices', emoji: '🌶️', desc: 'Pure ground spice blends', color: '#fff7ed', border: '#2dd4bf', img: '/products/red_chili.png' },
  { name: 'Pantry', emoji: '🫙', desc: 'Pure ghee & staples', color: '#f0fdf4', border: '#86efac', img: '/products/ghee.png' },
];

const FEATURES = [
  { icon: '✨', title: 'Authentic Craft', desc: 'Every item prepared fresh using timeless heritage recipes.' },
  { icon: '🌿', title: '100% Natural', desc: 'No preservatives, no artificial flavours. Pure ingredients only.' },
  { icon: '🚚', title: 'Fast Delivery', desc: 'Fresh orders dispatched within 24 hours, delivered to your door.' },
  { icon: '🛡️', title: 'Pure Quality', desc: 'Strict hygiene standards and selected ingredients in every batch.' },
];

const TESTIMONIALS = [
  { name: 'Priya R.', city: 'Bangalore', text: 'The mango pickle is exactly like grandma used to make! Amazing quality and super fast delivery.', stars: 5 },
  { name: 'Ramesh K.', city: 'Chennai', text: 'Madras filter coffee pouch is a game changer. Authentic South Indian taste at home!', stars: 5 },
  { name: 'Anita S.', city: 'Delhi', text: 'Kaju Katli is so fresh and soft. Perfect for Diwali gifting. Ordered for my whole family!', stars: 5 },
];

export default function HomePage({ customerAuth }) {
  return (
    <div className="min-h-screen bg-[#fdfbf7]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ─── Navbar ─── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Sharadha" className="h-12 w-auto object-contain" />
            <div>
              <div className="font-black text-lg text-stone-900 leading-none tracking-tight">SHARADHA</div>
              <div className="text-[10px] font-extrabold text-teal-600 tracking-widest">STORES & SAVORIES</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600">
            <Link to="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-teal-600 transition-colors">Shop</Link>
            <a href="#features" className="hover:text-teal-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-teal-600 transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            {customerAuth ? (
              <Link to="/shop" className="flex items-center gap-2 text-sm font-bold text-teal-700 bg-teal-50 border border-teal-200 px-4 py-2 rounded-xl hover:bg-teal-100 transition-colors">
                <span className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white font-black text-xs">
                  {customerAuth.name.charAt(0)}
                </span>
                Hi, {customerAuth.name.split(' ')[0]}
              </Link>
            ) : (
              <Link to="/customer-login" className="text-sm font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 px-4 py-2 rounded-xl transition-colors border border-stone-200">
                Sign In
              </Link>
            )}
            <Link to="/shop"
              className="px-5 py-2.5 rounded-xl font-extrabold text-sm text-white shadow-md hover:shadow-lg transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #0d9488, #0f766e)' }}>
              Shop Now 🛒
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fdfbf7 50%, #ecfdf5 100%)' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-teal-100 border border-teal-200 text-teal-700 text-xs font-extrabold px-4 py-2 rounded-full mb-6 tracking-wide">
              🎉 100% Homemade · Traditional Recipes
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-stone-900 leading-tight mb-6"
              style={{ fontFamily: "'Outfit', sans-serif" }}>
              Authentic Indian<br />
              <span style={{ background: 'linear-gradient(135deg, #0d9488, #047857)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Homemade Food
              </span>
            </h1>
            <p className="text-stone-600 text-lg font-medium leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              From tangy pickles to rich sweets, crunchy snacks to aromatic spices — all prepared fresh with traditional recipes and pure ingredients.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/shop"
                className="px-8 py-4 rounded-2xl font-black text-white text-base shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #0d9488, #0f766e)' }}>
                Explore All Products →
              </Link>
              <Link to="/customer-login"
                className="px-8 py-4 rounded-2xl font-extrabold text-stone-700 text-base bg-white border-2 border-stone-200 hover:border-teal-300 hover:text-teal-700 transition-all hover:scale-105 shadow-sm">
                Create Account
              </Link>
            </div>
            {/* Trust stats */}
            <div className="flex gap-8 mt-12 justify-center lg:justify-start">
              {[['500+', 'Happy Customers'], ['20+', 'Products'], ['4.8★', 'Avg Rating']].map(([val, lbl]) => (
                <div key={lbl} className="text-center lg:text-left">
                  <div className="text-2xl font-black text-teal-600">{val}</div>
                  <div className="text-xs font-semibold text-stone-500">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image collage */}
          <div className="flex-1 relative hidden lg:block">
            <div className="relative w-full max-w-md mx-auto">
              <div className="grid grid-cols-2 gap-4">
                {['/products/mango_pickle.png', '/products/kaju_katli.png', '/products/filter_coffee.png', '/products/samosa.png'].map((src, i) => (
                  <div key={i} className={`rounded-2xl overflow-hidden shadow-2xl border-4 border-white ${i === 0 ? 'col-span-1 row-span-1' : ''}`}
                    style={{ aspectRatio: '1', transform: i % 2 === 1 ? 'translateY(20px)' : 'translateY(0)' }}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-xl border border-stone-100 flex items-center gap-3">
                <span className="text-2xl">🏠</span>
                <div>
                  <div className="font-black text-stone-900 text-sm">Made at home</div>
                  <div className="text-teal-500 text-xs font-bold">Fresh daily</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <p className="text-teal-600 font-extrabold text-sm tracking-widest uppercase mb-2">Browse by Category</p>
          <h2 className="text-4xl font-black text-stone-900" style={{ fontFamily: "'Outfit', sans-serif" }}>Find your favourites</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/shop?category=${cat.name}`}
              className="group flex flex-col items-center text-center p-5 rounded-2xl border-2 transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
              style={{ background: cat.color, borderColor: cat.border }}
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden mb-3 shadow-md border-2 border-white group-hover:scale-110 transition-transform">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <div className="font-black text-stone-900 text-sm mb-1">{cat.name}</div>
              <div className="text-stone-500 text-[11px] font-medium leading-tight">{cat.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="bg-stone-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-teal-400 font-extrabold text-sm tracking-widest uppercase mb-2">Why Choose Us</p>
            <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              The Sharadha Difference
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-stone-800 rounded-2xl p-7 border border-stone-700 hover:border-teal-500/50 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-black text-white text-lg mb-2">{f.title}</h3>
                <p className="text-stone-400 text-sm font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Products strip ─── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-teal-600 font-extrabold text-sm tracking-widest uppercase mb-1">Best Sellers</p>
            <h2 className="text-3xl font-black text-stone-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Customer Favourites
            </h2>
          </div>
          <Link to="/shop" className="text-teal-600 hover:text-teal-700 font-extrabold text-sm underline underline-offset-4">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { name: 'Kaju Katli Royal Box', price: '₹450', img: '/products/kaju_katli.png', tag: '🏆 Best Seller' },
            { name: 'Mango Pickle Jar', price: '₹120', img: '/products/mango_pickle.png', tag: '❤️ Fan Favourite' },
            { name: 'Filter Coffee Pouch', price: '₹180', img: '/products/filter_coffee.png', tag: '☕ Morning Pick' },
            { name: 'Punjabi Samosa', price: '₹50', img: '/products/samosa.png', tag: '🎉 Party Need' },
          ].map((p) => (
            <Link key={p.name} to="/shop"
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-teal-300 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative overflow-hidden" style={{ aspectRatio: '1' }}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-stone-700 shadow-sm">
                  {p.tag}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-stone-900 text-sm mb-1">{p.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-black text-teal-600">{p.price}</span>
                  <span className="text-[10px] font-bold text-stone-400">⭐ 4.8</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="bg-teal-50 border-y border-teal-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-extrabold text-sm tracking-widest uppercase mb-2">Testimonials</p>
            <h2 className="text-4xl font-black text-stone-900" style={{ fontFamily: "'Outfit', sans-serif" }}>What our customers say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 shadow-sm border border-teal-100 hover:shadow-md transition-all">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => <span key={i} className="text-teal-400 text-base">★</span>)}
                </div>
                <p className="text-stone-700 text-sm font-medium leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-400 flex items-center justify-center text-white font-black text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 text-sm">{t.name}</div>
                    <div className="text-stone-400 text-xs">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="rounded-2xl p-12 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 50%, #115e59 100%)' }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Ready to taste the difference?
            </h2>
            <p className="text-teal-100 text-base font-medium mb-8 max-w-lg mx-auto">
              Shop our full collection of 20+ authentic homemade products. Fresh. Pure. Delivered.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/shop"
                className="px-8 py-4 bg-white text-teal-700 font-black rounded-2xl text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Shop All Products 🛒
              </Link>
              <Link to="/customer-login"
                className="px-8 py-4 bg-white/10 border-2 border-white/40 text-white font-extrabold rounded-2xl text-base hover:bg-white/20 transition-all hover:scale-105">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer id="contact" className="bg-stone-900 text-stone-300 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="Sharadha" className="h-12 w-auto object-contain" />
                <div>
                  <div className="font-black text-white text-lg">SHARADHA</div>
                  <div className="text-teal-400 text-[10px] font-bold tracking-widest">STORES & SAVORIES</div>
                </div>
              </div>
              <p className="text-stone-400 text-sm font-medium leading-relaxed max-w-xs">
                Authentic homemade Indian food, crafted with love and traditional recipes. From our kitchen to your table.
              </p>
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {[['Home', '/'], ['Shop', '/shop'], ['Sign In', '/customer-login'], ['Admin', '/login']].map(([label, path]) => (
                  <li key={label}><Link to={path} className="text-stone-400 hover:text-teal-400 transition-colors font-medium">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                {CATEGORIES.map((c) => (
                  <li key={c.name}><Link to={`/shop?category=${c.name}`} className="text-stone-400 hover:text-teal-400 transition-colors font-medium">{c.emoji} {c.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-stone-500 text-sm font-medium">© 2025 Sharadha Stores & Savories. All rights reserved.</p>
            <div className="flex items-center gap-2 text-stone-500 text-sm">
              <span>Made with</span><span className="text-red-400">❤️</span><span>in India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

