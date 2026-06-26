async function seedProducts(db) {
  console.log("Force resetting database and seeding 36 traditional HD food items...");
  await db.run("DELETE FROM cart_items");
  await db.run("DELETE FROM batches");
  await db.run("DELETE FROM products");

  const seedProductsList = [
    // Pickles
    ["Andhra Avakayi Mango Pickle", "Pickles", 250, 500, "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", "Raw Mango, Mustard Oil, Red Chili, Fenugreek", "Everyday Use", "Vegan"],
    ["Gongura Garlic Pickle", "Pickles", 220, 400, "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80", "Sorrel Leaves, Garlic, Sesame Oil, Spices", "Everyday Use", "Vegan"],
    ["Spicy Lemon Pickle", "Pickles", 180, 500, "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?auto=format&fit=crop&w=600&q=80", "Fresh Lemons, Rock Salt, Turmeric, Chili", "Everyday Use", "Vegan"],
    ["Mixed Veg Punjabi Pickle", "Pickles", 190, 450, "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80", "Carrot, Turnip, Cauliflower, Mustard", "Everyday Use", "Vegan"],
    ["Sweet Tomato Pickle", "Pickles", 160, 350, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80", "Ripe Tomatoes, Jaggery, Tamarind, Curry Leaves", "Everyday Use", "Vegan"],
    ["Gooseberry (Amla) Pickle", "Pickles", 210, 400, "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=80", "Indian Gooseberry, Sesame Oil, Fennel", "Everyday Use", "Vegan"],
    ["Spicy Green Chili Pickle", "Pickles", 150, 250, "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80", "Green Chilis, Lemon Juice, Mustard, Salt", "Everyday Use", "Vegan"],
    ["Ginger Garlic Pickle", "Pickles", 200, 300, "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80", "Fresh Ginger, Garlic Cloves, Tamarind, Jaggery", "Everyday Use", "Vegan"],

    // Sweets
    ["Mysore Pak Ghee Special", "Sweets", 380, 500, "https://images.unsplash.com/photo-1599785209707-33e387c2aa5b?auto=format&fit=crop&w=600&q=80", "Pure Cow Ghee, Gram Flour, Sugar, Cardamom", "Diwali Special", "Vegetarian"],
    ["Kaju Katli Royal Box", "Sweets", 850, 500, "https://images.unsplash.com/photo-1599785209796-786432b228bc?auto=format&fit=crop&w=600&q=80", "Premium Cashews, Sugar, Silver Leaf", "Diwali Special", "Vegetarian"],
    ["Motichoor Ladoo Box", "Sweets", 280, 500, "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", "Besan Pearls, Desi Ghee, Saffron, Melon Seeds", "Festival Use", "Vegetarian"],
    ["Crispy Peanut Chikki", "Sweets", 120, 300, "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80", "Roasted Peanuts, Organic Jaggery, Ghee", "Sankranti Need", "Vegetarian"],
    ["Bellam Gavvalu (Sweet Shells)", "Sweets", 180, 400, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80", "Wheat Flour, Jaggery Syrup, Cardamom", "Festival Use", "Vegetarian"],
    ["Gulab Jamun Tin", "Sweets", 250, 1000, "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80", "Khoya, Paneer, Rose Water Syrup", "Party Need", "Vegetarian"],
    ["Besan Ladoo Homemade", "Sweets", 320, 500, "https://images.unsplash.com/photo-1599785209681-344498305001?auto=format&fit=crop&w=600&q=80", "Roasted Gram Flour, Desi Ghee, Powdered Sugar", "Everyday Use", "Vegetarian"],
    ["Badam Halwa Mix", "Sweets", 450, 350, "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", "California Almonds, Saffron, Desi Ghee", "Festival Use", "Vegetarian"],
    ["Traditional Ariselu (Ghee)", "Sweets", 340, 500, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80", "Rice Flour, Jaggery, Sesame Seeds, Pure Ghee", "Sankranti Need", "Vegetarian"],
    ["Authentic Pootharekulu Paper Sweet", "Sweets", 450, 250, "https://images.unsplash.com/photo-1599785209707-33e387c2aa5b?auto=format&fit=crop&w=600&q=80", "Rice Starch Paper, Powdered Sugar, Ghee, Dry Fruits", "Festival Use", "Vegetarian"],
    ["Puran Poli (Bobbatlu) Pack", "Sweets", 220, 400, "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80", "Chana Dal, Jaggery, Cardamom, Wheat Flour", "Ugadi Special", "Vegetarian"],
    ["Rasgulla Sponge Tin", "Sweets", 240, 1000, "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80", "Fresh Chhena, Sugar Syrup, Rose Water", "Party Need", "Vegetarian"],

    // Snacks
    ["Crispy Rice Murukku", "Snacks", 140, 250, "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80", "Rice Flour, Urad Dal, Cumin, Asafoetida", "Everyday Use", "Vegan"],
    ["Kerala Spicy Banana Chips", "Snacks", 160, 200, "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80", "Nendran Bananas, Pure Coconut Oil, Salt, Pepper", "Party Need", "Vegan"],
    ["Chettinad Spicy Mixture", "Snacks", 150, 300, "https://images.unsplash.com/photo-1599785209707-33e387c2aa5b?auto=format&fit=crop&w=600&q=80", "Besan Sev, Peanuts, Curry Leaves, Boondi", "Party Need", "Vegan"],
    ["Ribbon Pakoda", "Snacks", 130, 250, "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80", "Rice Flour, Besan, Red Chili, Butter", "Everyday Use", "Vegetarian"],
    ["Roasted Masala Cashews", "Snacks", 420, 250, "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=600&q=80", "Cashew Nuts, Black Pepper, Himalayan Salt", "Party Need", "Vegan"],
    ["Lays Cream & Onion", "Snacks", 20, 50, "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80", "Potatoes, Edible Vegetable Oil, Cream Flavor", "Party Need", "Vegetarian"],
    ["Spicy Tapioca (Kappa) Chips", "Snacks", 110, 200, "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80", "Tapioca Root, Red Chili Powder, Curry Leaves", "Party Need", "Vegan"],
    ["Crispy Maddur Vada Pack", "Snacks", 150, 300, "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80", "Rice Flour, Semolina, Onion, Curry Leaves", "Everyday Use", "Vegan"],
    ["Crunchy Kara Boondi", "Snacks", 120, 250, "https://images.unsplash.com/photo-1599785209707-33e387c2aa5b?auto=format&fit=crop&w=600&q=80", "Gram Flour Pearls, Fried Peanuts, Garlic, Spices", "Party Need", "Vegan"],

    // Beverages
    ["Madras Filter Coffee Powder", "Beverages", 320, 500, "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80", "80% Arabica Coffee beans, 20% Chicory", "Everyday Use", "Vegan"],
    ["Badam Milk Kesar Mix", "Beverages", 290, 300, "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80", "Almonds, Kashmiri Saffron, Cardamom, Sugar", "Everyday Use", "Vegetarian"],
    ["Rose Milk Artisan Syrup", "Beverages", 180, 500, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80", "Pure Rose Petal Extract, Sugar, Beetroot Color", "Party Need", "Vegan"],
    ["Masala Chai Spice Blend", "Beverages", 210, 250, "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80", "Assam CTC Tea, Ginger, Cardamom, Cinnamon, Clove", "Everyday Use", "Vegan"],
    ["Nescafe Classic Soluble Coffee", "Beverages", 350, 100, "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80", "Pure Instant Soluble Coffee", "Everyday Use", "Vegan"],
    ["Coca Cola Can", "Beverages", 40, 300, "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80", "Carbonated Water, High Fructose Corn Syrup, Caffeine", "Party Need", "Vegan"],
    ["Royal Thandai Masala Mix", "Beverages", 340, 250, "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80", "Melon Seeds, Fennel, Rose Petals, Black Pepper, Almonds", "Holi Special", "Vegetarian"]
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
