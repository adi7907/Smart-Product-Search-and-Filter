async function seedProducts(db) {
  const productCount = await db.get("SELECT COUNT(*) as count FROM products");
  if (productCount.count === 0) {
    console.log("Seeding initial products with local images...");
    const seedProducts = [
      // Pickles
      ["Andhra Avakayi Mango Pickle", "Pickles", 250, 500, "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", "Raw Mango, Mustard Oil, Red Chili, Fenugreek", "Everyday Use", "Vegan"],
      ["Gongura Garlic Pickle", "Pickles", 220, 400, "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80", "Sorrel Leaves, Garlic, Sesame Oil, Spices", "Everyday Use", "Vegan"],
      ["Spicy Lemon Pickle", "Pickles", 180, 500, "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?auto=format&fit=crop&w=600&q=80", "Fresh Lemons, Rock Salt, Turmeric, Chili", "Everyday Use", "Vegan"],
      ["Mixed Veg Punjabi Pickle", "Pickles", 190, 450, "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80", "Carrot, Turnip, Cauliflower, Mustard", "Everyday Use", "Vegan"],
      ["Sweet Tomato Pickle", "Pickles", 160, 350, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80", "Ripe Tomatoes, Jaggery, Tamarind, Curry Leaves", "Everyday Use", "Vegan"],
      ["Traditional Gooseberry (Amla) Pickle", "Pickles", 210, 400, "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=80", "Indian Gooseberry, Sesame Oil, Fennel", "Everyday Use", "Vegan"],

      // Sweets
      ["Mysore Pak Ghee Special", "Sweets", 380, 500, "https://images.unsplash.com/photo-1599785209707-33e387c2aa5b?auto=format&fit=crop&w=600&q=80", "Pure Cow Ghee, Gram Flour, Sugar, Cardamom", "Diwali Special", "Vegetarian"],
      ["Kaju Katli Royal Box", "Sweets", 850, 500, "https://images.unsplash.com/photo-1599785209796-786432b228bc?auto=format&fit=crop&w=600&q=80", "Premium Cashews, Sugar, Silver Leaf", "Diwali Special", "Vegetarian"],
      ["Motichoor Ladoo", "Sweets", 280, 500, "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", "Besan Pearls, Desi Ghee, Saffron, Melon Seeds", "Festival Use", "Vegetarian"],
      ["Crispy Peanut Chikki", "Sweets", 120, 300, "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80", "Roasted Peanuts, Organic Jaggery, Ghee", "Sankranti Need", "Vegetarian"],
      ["Bellam Gavvalu (Sweet Shells)", "Sweets", 180, 400, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80", "Wheat Flour, Jaggery Syrup, Cardamom", "Festival Use", "Vegetarian"],
      ["Gulab Jamun Tin", "Sweets", 250, 1000, "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80", "Khoya, Paneer, Rose Water Syrup", "Party Need", "Vegetarian"],
      ["Besan Ladoo Homemade", "Sweets", 320, 500, "https://images.unsplash.com/photo-1599785209681-344498305001?auto=format&fit=crop&w=600&q=80", "Roasted Gram Flour, Desi Ghee, Powdered Sugar", "Everyday Use", "Vegetarian"],
      ["Badam Halwa Mix", "Sweets", 450, 350, "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", "California Almonds, Saffron, Desi Ghee", "Festival Use", "Vegetarian"],

      // Snacks
      ["Crispy Rice Murukku", "Snacks", 140, 250, "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80", "Rice Flour, Urad Dal, Cumin, Asafoetida", "Everyday Use", "Vegan"],
      ["Kerala Spicy Banana Chips", "Snacks", 160, 200, "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80", "Nendran Bananas, Pure Coconut Oil, Salt, Pepper", "Party Need", "Vegan"],
      ["Chettinad Spicy Mixture", "Snacks", 150, 300, "https://images.unsplash.com/photo-1599785209707-33e387c2aa5b?auto=format&fit=crop&w=600&q=80", "Besan Sev, Peanuts, Curry Leaves, Boondi", "Party Need", "Vegan"],
      ["Ribbon Pakoda", "Snacks", 130, 250, "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80", "Rice Flour, Besan, Red Chili, Butter", "Everyday Use", "Vegetarian"],
      ["Roasted Masala Cashews", "Snacks", 420, 250, "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=600&q=80", "Cashew Nuts, Black Pepper, Himalayan Salt", "Party Need", "Vegan"],
      ["Lays Cream & Onion", "Snacks", 20, 50, "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80", "Potatoes, Edible Vegetable Oil, Cream Flavor", "Party Need", "Vegetarian"],

      // Beverages
      ["Madras Filter Coffee Powder", "Beverages", 320, 500, "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80", "80% Arabica Coffee beans, 20% Chicory", "Everyday Use", "Vegan"],
      ["Badam Milk Kesar Mix", "Beverages", 290, 300, "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80", "Almonds, Kashmiri Saffron, Cardamom, Sugar", "Everyday Use", "Vegetarian"],
      ["Rose Milk Artisan Syrup", "Beverages", 180, 500, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80", "Pure Rose Petal Extract, Sugar, Beetroot Color", "Party Need", "Vegan"],
      ["Masala Chai Spice Blend", "Beverages", 210, 250, "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80", "Assam CTC Tea, Ginger, Cardamom, Cinnamon, Clove", "Everyday Use", "Vegan"],
      ["Nescafe Classic Coffee", "Beverages", 350, 100, "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80", "Pure Instant Soluble Coffee", "Everyday Use", "Vegan"],
      ["Coca Cola Can", "Beverages", 40, 300, "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80", "Carbonated Water, High Fructose Corn Syrup, Caffeine", "Party Need", "Vegan"],

      // Pantry & Spices
      ["Idli Dosa Podi (Gunpowder)", "Pantry", 150, 250, "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80", "Roasted Chana Dal, Urad Dal, Sesame, Red Chili", "Everyday Use", "Vegan"],
      ["Pure A2 Cow Ghee Jar", "Pantry", 650, 500, "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=600&q=80", "Traditional Bilona Churned Cow Milk Fat", "Everyday Use", "Vegetarian"],
      ["Organic Forest Honey", "Pantry", 450, 500, "https://images.unsplash.com/photo-1587049352847-4a2224785d38?auto=format&fit=crop&w=600&q=80", "100% Unprocessed Wildflower Honey", "Everyday Use", "Vegetarian"],
      ["Lakadong Turmeric Powder (Haldi)", "Spices", 160, 250, "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80", "High Curcumin Turmeric Root Ground", "Everyday Use", "Vegan"],
      ["Kashmiri Lal Mirch Powder", "Spices", 180, 200, "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80", "Sun Dried Kashmiri Chilis Ground (Vibrant Color)", "Everyday Use", "Vegan"],
      ["Artisan Garam Masala", "Spices", 220, 150, "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80", "Star Anise, Mace, Black Cardamom, Clove, Nutmeg", "Everyday Use", "Vegan"],
      ["Tamarind Pulihora Paste", "Condiments", 140, 300, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80", "Tamarind Pulp, Peanut Oil, Green Chilis, Jaggery", "Festival Use", "Vegan"],
      ["Fresh Alphonso Mango Box", "Pantry", 450, 1000, "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80", "Naturally Ripened Ratnagiri Alphonso Mangoes", "Festival Use", "Vegan"]
    ];
    for (const p of seedProducts) {
      const res = await db.run("INSERT INTO products (name, category, price, weight_g, image_url, ingredients, festival_need, dietary_preference) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", p);
      const today = new Date();
      const expDate = new Date(); expDate.setDate(today.getDate() + Math.floor(Math.random() * 60));
      await db.run("INSERT INTO batches (product_id, batch_number, manufacture_date, expiry_date, stock_quantity) VALUES (?, ?, ?, ?, ?)", 
        [res.lastID, `B${Math.floor(Math.random()*1000)}`, today.toISOString().split('T')[0], expDate.toISOString().split('T')[0], Math.floor(Math.random() * 50)]);
    }
    await db.run("INSERT INTO orders (user_id, total_amount, delivery_status) VALUES (1, 1500, 'Processing')");
    await db.run("INSERT INTO orders (user_id, total_amount, delivery_status) VALUES (1, 350, 'Dispatched')");
  }
}

module.exports = { seedProducts };
