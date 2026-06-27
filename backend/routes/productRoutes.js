const express = require('express');

let memoryProducts = [
  { id: 1, name: "Classic Salted Potato Chips", category: "Snacks", price: 40, weight_g: 150, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Potato-Chips.jpg/600px-Potato-Chips.jpg", ingredients: "Potatoes, Edible Vegetable Oil, Iodized Salt", festival_need: "Everyday Use", dietary_preference: "Vegan" },
  { id: 2, name: "Punjabi Samosa (2 pcs)", category: "Snacks", price: 50, weight_g: 200, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Samosachutney.jpg/600px-Samosachutney.jpg", ingredients: "Potatoes, Green Peas, Maida Flour, Spices", festival_need: "Party Need", dietary_preference: "Vegan" },
  { id: 3, name: "Spicy Mixture Namkeen", category: "Snacks", price: 80, weight_g: 250, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Chanachur.JPG/600px-Chanachur.JPG", ingredients: "Gram Flour Sev, Peanuts, Rice Flakes, Spices", festival_need: "Party Need", dietary_preference: "Vegan" },
  { id: 4, name: "Crunchy Roasted Peanuts", category: "Snacks", price: 60, weight_g: 200, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Roasted_Peanuts_-_Ragnarok_Artisan_Studio_-_P7317447_%282%29_%28cropped%29.jpg/600px-Roasted_Peanuts_-_Ragnarok_Artisan_Studio_-_P7317447_%282%29_%28cropped%29.jpg", ingredients: "Selected Peanuts, Edible Salt", festival_need: "Everyday Use", dietary_preference: "Vegan" },
  { id: 5, name: "Coca Cola Can (330ml)", category: "Beverages", price: 40, weight_g: 330, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Coca-Cola_logo.svg/600px-Coca-Cola_logo.svg.png", ingredients: "Carbonated Water, Sugar, Caffeine", festival_need: "Party Need", dietary_preference: "Vegan" },
  { id: 6, name: "Instant Coffee Glass Jar", category: "Beverages", price: 280, weight_g: 100, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/600px-A_small_cup_of_coffee.JPG", ingredients: "100% Pure Soluble Coffee Beans", festival_need: "Everyday Use", dietary_preference: "Vegan" },
  { id: 7, name: "Masala Chai Tea Blend", category: "Beverages", price: 150, weight_g: 250, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Masala_Chai.JPG/600px-Masala_Chai.JPG", ingredients: "Black CTC Tea Leaves, Ginger, Cardamom", festival_need: "Everyday Use", dietary_preference: "Vegan" },
  { id: 8, name: "Fresh Full Cream Milk (1L)", category: "Beverages", price: 70, weight_g: 1000, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/600px-Milk_glass.jpg", ingredients: "Pure Pasteurized Cow Milk", festival_need: "Everyday Use", dietary_preference: "Vegetarian" },
  { id: 9, name: "Pure Cow Ghee Jar", category: "Pantry", price: 550, weight_g: 500, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Glass_bottle_of_ghee_on_white_background.jpg/600px-Glass_bottle_of_ghee_on_white_background.jpg", ingredients: "Traditional Hand Churned Pure Cow Ghee", festival_need: "Everyday Use", dietary_preference: "Vegetarian" },
  { id: 10, name: "Organic Turmeric Powder", category: "Spices", price: 80, weight_g: 200, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Tumeric_powder_in_a_white_bowl.jpg/600px-Tumeric_powder_in_a_white_bowl.jpg", ingredients: "Pure Ground Yellow Turmeric Root", festival_need: "Everyday Use", dietary_preference: "Vegan" },
  { id: 11, name: "Kashmiri Red Chili Powder", category: "Spices", price: 95, weight_g: 200, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Chilli_powder.jpg/600px-Chilli_powder.jpg", ingredients: "Sun Dried Red Chili Peppers Ground", festival_need: "Everyday Use", dietary_preference: "Vegan" },
  { id: 12, name: "Aromatic Garam Masala", category: "Spices", price: 110, weight_g: 100, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/GaramMasalaPowder.jpg/600px-GaramMasalaPowder.jpg", ingredients: "Coriander, Cumin, Cardamom, Clove, Cinnamon", festival_need: "Everyday Use", dietary_preference: "Vegan" },
  { id: 13, name: "Traditional Mango Pickle", category: "Pickles", price: 120, weight_g: 300, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Aam_ka_achaar_%28Mango_pickle%29.jpg/600px-Aam_ka_achaar_%28Mango_pickle%29.jpg", ingredients: "Raw Mango Cubes, Mustard Oil, Fenugreek, Chili", festival_need: "Everyday Use", dietary_preference: "Vegan" },
  { id: 14, name: "Spicy Garlic Chili Dip", category: "Pickles", price: 100, weight_g: 250, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Garlic_Chilli_Pickle.jpg/600px-Garlic_Chilli_Pickle.jpg", ingredients: "Fresh Garlic Cloves, Red Chilis, Vinegar, Salt", festival_need: "Everyday Use", dietary_preference: "Vegan" },
  { id: 15, name: "Gulab Jamun Sweet Box", category: "Sweets", price: 180, weight_g: 500, image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Gulab-jamun-wallpaper-1.jpg", ingredients: "Milk Solids, Flour, Sugar Syrup, Rose Water", festival_need: "Party Need", dietary_preference: "Vegetarian" },
  { id: 16, name: "Kaju Katli Royal Box", category: "Sweets", price: 450, weight_g: 250, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/600px-Kaju_katli_sweet.jpg", ingredients: "Rich Cashew Nut Paste, Sugar", festival_need: "Diwali Special", dietary_preference: "Vegetarian" },
  { id: 17, name: "Besan Ladoo Homemade", category: "Sweets", price: 160, weight_g: 400, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Besan_ke_ladoo.jpg/600px-Besan_ke_ladoo.jpg", ingredients: "Roasted Gram Flour, Desi Ghee, Sugar", festival_need: "Everyday Use", dietary_preference: "Vegetarian" },
  { id: 18, name: "Crispy Murukku Crackers", category: "Snacks", price: 90, weight_g: 200, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Mullu_murukku.jpg/600px-Mullu_murukku.jpg", ingredients: "Rice Flour, Sesame Seeds, Cumin, Salt", festival_need: "Everyday Use", dietary_preference: "Vegan" },
  { id: 19, name: "Madras Filter Coffee Pouch", category: "Beverages", price: 180, weight_g: 250, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Filter_coffee_dsc06760.jpg/600px-Filter_coffee_dsc06760.jpg", ingredients: "Selected Roasted Coffee Beans Ground", festival_need: "Everyday Use", dietary_preference: "Vegan" },
  { id: 20, name: "Tangy Lemon Pickle Jar", category: "Pickles", price: 110, weight_g: 300, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Nimbu_ka_achaar.jpg/600px-Nimbu_ka_achaar.jpg", ingredients: "Fresh Lemons, Mustard Oil, Salt, Spices", festival_need: "Everyday Use", dietary_preference: "Vegan" }
];

module.exports = function(db, upload) {
  const router = express.Router();

  router.post('/', upload.single('image'), async (req, res) => {
    try {
      const { name, category, price, weight_g, ingredients, festival_need, dietary_preference } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      const newId = memoryProducts.length > 0 ? Math.max(...memoryProducts.map(p => p.id)) + 1 : 1;
      const newItem = { id: newId, name, category, price: Number(price), weight_g: Number(weight_g||0), image_url: imageUrl, ingredients: ingredients||"", festival_need: festival_need||"Everyday Use", dietary_preference: dietary_preference||"Vegan" };
      memoryProducts.push(newItem);
      if (db) {
        try { await db.run("INSERT INTO products (name, category, price, weight_g, image_url, ingredients, festival_need, dietary_preference) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [name, category, price, weight_g, imageUrl, ingredients, festival_need, dietary_preference]); } catch(e){}
      }
      res.status(201).json({ success: true, productId: newId });
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
