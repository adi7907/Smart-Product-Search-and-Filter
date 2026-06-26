async function seedProducts(db) {
  console.log("Force resetting database and seeding 20 common grocery items...");
  await db.run("DELETE FROM cart_items");
  await db.run("DELETE FROM batches");
  await db.run("DELETE FROM products");

  const seedProductsList = [
    // Snacks & Beverages (7)
    ["Classic Salted Potato Chips", "Snacks", 40, 150, "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80", "Potatoes, Edible Vegetable Oil, Iodized Salt", "Everyday Use", "Vegan"],
    ["Punjabi Samosa (2 pcs)", "Snacks", 50, 200, "https://www.themealdb.com/images/media/meals/vxsurq1511186419.jpg", "Potatoes, Green Peas, Maida Flour, Spices", "Party Need", "Vegan"],
    ["Spicy Mixture Namkeen", "Snacks", 80, 250, "https://images.unsplash.com/photo-1599490659213-eec163b45888?auto=format&fit=crop&w=600&q=80", "Gram Flour Sev, Peanuts, Rice Flakes, Spices", "Party Need", "Vegan"],
    ["Crunchy Roasted Peanuts", "Snacks", 60, 200, "https://www.themealdb.com/images/media/meals/ypxvwv1505333929.jpg", "Selected Peanuts, Edible Salt", "Everyday Use", "Vegan"],
    ["Coca Cola Can (330ml)", "Beverages", 40, 330, "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80", "Carbonated Water, Sugar, Caffeine", "Party Need", "Vegan"],
    ["Instant Coffee Glass Jar", "Beverages", 280, 100, "https://www.themealdb.com/images/media/meals/rqeswq1511792890.jpg", "100% Pure Soluble Coffee Beans", "Everyday Use", "Vegan"],
    ["Masala Chai Tea Blend", "Beverages", 150, 250, "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80", "Black CTC Tea Leaves, Ginger, Cardamom", "Everyday Use", "Vegan"],

    // Dairy & Pantry Spices (7)
    ["Fresh Full Cream Milk (1L)", "Beverages", 70, 1000, "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80", "Pure Pasteurized Cow Milk", "Everyday Use", "Vegetarian"],
    ["Pure Cow Ghee Jar", "Pantry", 550, 500, "https://www.themealdb.com/images/media/meals/urxxut1511554162.jpg", "Traditional Hand Churned Pure Cow Ghee", "Everyday Use", "Vegetarian"],
    ["Organic Turmeric Powder", "Spices", 80, 200, "https://www.themealdb.com/images/media/meals/txvpvt1511187498.jpg", "Pure Ground Yellow Turmeric Root", "Everyday Use", "Vegan"],
    ["Kashmiri Red Chili Powder", "Spices", 95, 200, "https://www.themealdb.com/images/media/meals/tvqswu1511187313.jpg", "Sun Dried Red Chili Peppers Ground", "Everyday Use", "Vegan"],
    ["Aromatic Garam Masala", "Spices", 110, 100, "https://www.themealdb.com/images/media/meals/twspuv1511187212.jpg", "Coriander, Cumin, Cardamom, Clove, Cinnamon", "Everyday Use", "Vegan"],
    ["Traditional Mango Pickle", "Pickles", 120, 300, "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", "Raw Mango Cubes, Mustard Oil, Fenugreek, Chili", "Everyday Use", "Vegan"],
    ["Spicy Garlic Chili Dip", "Pickles", 100, 250, "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg", "Fresh Garlic Cloves, Red Chilis, Vinegar, Salt", "Everyday Use", "Vegan"],

    // Common Sweets & Bakery (6)
    ["Gulab Jamun Sweet Box", "Sweets", 180, 500, "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80", "Milk Solids, Flour, Sugar Syrup, Rose Water", "Party Need", "Vegetarian"],
    ["Kaju Katli Royal Box", "Sweets", 450, 250, "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80", "Rich Cashew Nut Paste, Sugar", "Diwali Special", "Vegetarian"],
    ["Besan Ladoo Homemade", "Sweets", 160, 400, "https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg", "Roasted Gram Flour, Desi Ghee, Sugar", "Everyday Use", "Vegetarian"],
    ["Crispy Murukku Crackers", "Snacks", 90, 200, "https://images.unsplash.com/photo-1601050690333-d9a8e235e076?auto=format&fit=crop&w=600&q=80", "Rice Flour, Sesame Seeds, Cumin, Salt", "Everyday Use", "Vegan"],
    ["Madras Filter Coffee Pouch", "Beverages", 180, 250, "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80", "Selected Roasted Coffee Beans Ground", "Everyday Use", "Vegan"],
    ["Tangy Lemon Pickle Jar", "Pickles", 110, 300, "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80", "Fresh Lemons, Mustard Oil, Salt, Spices", "Everyday Use", "Vegan"]
  ];

  for (const p of seedProductsList) {
    const res = await db.run("INSERT INTO products (name, category, price, weight_g, image_url, ingredients, festival_need, dietary_preference) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", p);
    const today = new Date();
    const expDate = new Date(); expDate.setDate(today.getDate() + Math.floor(Math.random() * 60) + 30);
    await db.run("INSERT INTO batches (product_id, batch_number, manufacture_date, expiry_date, stock_quantity) VALUES (?, ?, ?, ?, ?)", 
      [res.lastID, `B${Math.floor(Math.random()*1000)}`, today.toISOString().split('T')[0], expDate.toISOString().split('T')[0], Math.floor(Math.random() * 40) + 10]);
  }
}

module.exports = { seedProducts };
