const express = require('express');

let memoryProducts = [
  { id: 1, name: "Classic Salted Potato Chips", category: "Snacks", price: 40, weight_g: 150, image_url: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80", ingredients: "Potatoes, Edible Vegetable Oil, Iodized Salt", festival_need: "Everyday Use", dietary_preference: "Vegan", rating: 4.5 },
  { id: 2, name: "Punjabi Samosa (2 pcs)", category: "Snacks", price: 50, weight_g: 200, image_url: "/products/samosa.png", ingredients: "Potatoes, Green Peas, Maida Flour, Spices", festival_need: "Party Need", dietary_preference: "Vegan", rating: 4.8 },
  { id: 3, name: "Spicy Mixture Namkeen", category: "Snacks", price: 80, weight_g: 250, image_url: "/products/namkeen.png", ingredients: "Gram Flour Sev, Peanuts, Rice Flakes, Spices", festival_need: "Party Need", dietary_preference: "Vegan", rating: 4.6 },
  { id: 4, name: "Crunchy Roasted Peanuts", category: "Snacks", price: 60, weight_g: 200, image_url: "/products/peanuts.png", ingredients: "Selected Peanuts, Edible Salt", festival_need: "Everyday Use", dietary_preference: "Vegan", rating: 4.3 },
  { id: 5, name: "Coca Cola Can (330ml)", category: "Beverages", price: 40, weight_g: 330, image_url: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80", ingredients: "Carbonated Water, Sugar, Caffeine", festival_need: "Party Need", dietary_preference: "Vegan", rating: 4.7 },
  { id: 6, name: "Instant Coffee Glass Jar", category: "Beverages", price: 280, weight_g: 100, image_url: "/products/instant_coffee.png", ingredients: "100% Pure Soluble Coffee Beans", festival_need: "Everyday Use", dietary_preference: "Vegan", rating: 4.9 },
  { id: 7, name: "Masala Chai Tea Blend", category: "Beverages", price: 150, weight_g: 250, image_url: "/products/masala_chai.png", ingredients: "Black CTC Tea Leaves, Ginger, Cardamom", festival_need: "Everyday Use", dietary_preference: "Vegan", rating: 5.0 },
  { id: 8, name: "Fresh Full Cream Milk (1L)", category: "Beverages", price: 70, weight_g: 1000, image_url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80", ingredients: "Pure Pasteurized Cow Milk", festival_need: "Everyday Use", dietary_preference: "Vegetarian", rating: 4.4 },
  { id: 9, name: "Pure Cow Ghee Jar", category: "Pantry", price: 550, weight_g: 500, image_url: "/products/ghee.png", ingredients: "Traditional Hand Churned Pure Cow Ghee", festival_need: "Everyday Use", dietary_preference: "Vegetarian", rating: 4.9 },
  { id: 10, name: "Organic Turmeric Powder", category: "Spices", price: 80, weight_g: 200, image_url: "/products/turmeric.png", ingredients: "Pure Ground Yellow Turmeric Root", festival_need: "Everyday Use", dietary_preference: "Vegan", rating: 4.6 },
  { id: 11, name: "Kashmiri Red Chili Powder", category: "Spices", price: 95, weight_g: 200, image_url: "/products/red_chili.png", ingredients: "Sun Dried Red Chili Peppers Ground", festival_need: "Everyday Use", dietary_preference: "Vegan", rating: 4.8 },
  { id: 12, name: "Aromatic Garam Masala", category: "Spices", price: 110, weight_g: 100, image_url: "/products/garam_masala.png", ingredients: "Coriander, Cumin, Cardamom, Clove, Cinnamon", festival_need: "Everyday Use", dietary_preference: "Vegan", rating: 4.9 },
  { id: 13, name: "Traditional Mango Pickle", category: "Pickles", price: 120, weight_g: 300, image_url: "/products/mango_pickle.png", ingredients: "Raw Mango Cubes, Mustard Oil, Fenugreek, Chili", festival_need: "Everyday Use", dietary_preference: "Vegan", rating: 4.9 },
  { id: 14, name: "Spicy Garlic Chili Dip", category: "Pickles", price: 100, weight_g: 250, image_url: "/products/garlic_chili.png", ingredients: "Fresh Garlic Cloves, Red Chilis, Vinegar, Salt", festival_need: "Everyday Use", dietary_preference: "Vegan", rating: 4.5 },
  { id: 15, name: "Gulab Jamun Sweet Box", category: "Sweets", price: 180, weight_g: 500, image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Gulab-jamun-wallpaper-1.jpg", ingredients: "Milk Solids, Flour, Sugar Syrup, Rose Water", festival_need: "Party Need", dietary_preference: "Vegetarian", rating: 4.7 },
  { id: 16, name: "Kaju Katli Royal Box", category: "Sweets", price: 450, weight_g: 250, image_url: "/products/kaju_katli.png", ingredients: "Rich Cashew Nut Paste, Sugar", festival_need: "Diwali Special", dietary_preference: "Vegetarian", rating: 5.0 },
  { id: 17, name: "Besan Ladoo Homemade", category: "Sweets", price: 160, weight_g: 400, image_url: "/products/besan_ladoo.png", ingredients: "Roasted Gram Flour, Desi Ghee, Sugar", festival_need: "Everyday Use", dietary_preference: "Vegetarian", rating: 4.8 },
  { id: 18, name: "Crispy Murukku Crackers", category: "Snacks", price: 90, weight_g: 200, image_url: "/products/murukku.png", ingredients: "Rice Flour, Sesame Seeds, Cumin, Salt", festival_need: "Everyday Use", dietary_preference: "Vegan", rating: 4.4 },
  { id: 19, name: "Madras Filter Coffee Pouch", category: "Beverages", price: 180, weight_g: 250, image_url: "/products/filter_coffee.png", ingredients: "Selected Roasted Coffee Beans Ground", festival_need: "Everyday Use", dietary_preference: "Vegan", rating: 4.9 },
  { id: 20, name: "Tangy Lemon Pickle Jar", category: "Pickles", price: 110, weight_g: 300, image_url: "/products/lemon_pickle.png", ingredients: "Fresh Lemons, Mustard Oil, Salt, Spices", festival_need: "Everyday Use", dietary_preference: "Vegan", rating: 4.6 }
];

module.exports = function(db, upload) {
  const router = express.Router();

  router.post('/', upload.single('image'), async (req, res) => {
    try {
      const { name, category, price, weight_g, ingredients, festival_need, dietary_preference, rating } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      const newId = memoryProducts.length > 0 ? Math.max(...memoryProducts.map(p => p.id)) + 1 : 1;
      const ratingVal = Number(rating || 4.5);
      const newItem = { 
        id: newId, 
        name, 
        category, 
        price: Number(price), 
        weight_g: Number(weight_g || 0), 
        image_url: imageUrl, 
        ingredients: ingredients || "", 
        festival_need: festival_need || "Everyday Use", 
        dietary_preference: dietary_preference || "Vegan",
        rating: ratingVal
      };
      memoryProducts.push(newItem);
      if (db) {
        try { 
          await db.run("INSERT INTO products (name, category, price, weight_g, image_url, ingredients, festival_need, dietary_preference) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
          [name, category, price, weight_g, imageUrl, ingredients, festival_need, dietary_preference]); 
        } catch(e){}
      }
      res.status(201).json({ success: true, productId: newId, product: newItem });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);
      memoryProducts = memoryProducts.filter(p => p.id !== id);
      if (db) { try { await db.run("DELETE FROM products WHERE id = ?", [id]); } catch(e){} }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/', async (req, res) => {
    const { search, category, maxPrice } = req.query;
    let list = [...memoryProducts];
    if (search) { const q = search.toLowerCase(); list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)); }
    if (category && category !== 'All') { list = list.filter(p => p.category === category); }
    if (maxPrice) { list = list.filter(p => p.price <= Number(maxPrice)); }
    res.json(list);
  });

  return router;
};
