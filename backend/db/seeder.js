async function seedProducts(db) {
  console.log("Force resetting database and seeding 40 unique traditional items...");
  await db.run("DELETE FROM cart_items");
  await db.run("DELETE FROM batches");
  await db.run("DELETE FROM products");

  const seedProductsList = [
    // Pickles & Sauces (8)
    ["Andhra Avakayi Mango Pickle", "Pickles", 250, 500, "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", "Raw Mango, Mustard Oil, Red Chili, Fenugreek", "Everyday Use", "Vegan"],
    ["Gongura Garlic Pickle", "Pickles", 220, 400, "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg", "Sorrel Leaves, Garlic, Sesame Oil, Spices", "Everyday Use", "Vegan"],
    ["Spicy Lemon Pickle", "Pickles", 180, 500, "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80", "Fresh Lemons, Rock Salt, Turmeric, Chili", "Everyday Use", "Vegan"],
    ["Mixed Veg Punjabi Pickle", "Pickles", 190, 450, "https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg", "Carrot, Turnip, Cauliflower, Mustard", "Everyday Use", "Vegan"],
    ["Sweet Tomato Pickle", "Pickles", 160, 350, "https://www.themealdb.com/images/media/meals/1529446352.jpg", "Ripe Tomatoes, Jaggery, Tamarind, Curry Leaves", "Everyday Use", "Vegan"],
    ["Gooseberry (Amla) Pickle", "Pickles", 210, 400, "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg", "Indian Gooseberry, Sesame Oil, Fennel", "Everyday Use", "Vegan"],
    ["Spicy Green Chili Pickle", "Pickles", 150, 250, "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg", "Green Chilis, Lemon Juice, Mustard, Salt", "Everyday Use", "Vegan"],
    ["Ginger Garlic Chutney Pickle", "Pickles", 200, 300, "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg", "Fresh Ginger, Garlic Cloves, Tamarind, Jaggery", "Everyday Use", "Vegan"],

    // Sweets (10)
    ["Mysore Pak Ghee Special", "Sweets", 380, 500, "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg", "Pure Cow Ghee, Gram Flour, Sugar, Cardamom", "Diwali Special", "Vegetarian"],
    ["Kaju Katli Royal Box", "Sweets", 850, 500, "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80", "Premium Cashews, Sugar, Silver Leaf", "Diwali Special", "Vegetarian"],
    ["Motichoor Ladoo Box", "Sweets", 280, 500, "https://www.themealdb.com/images/media/meals/qxytrx1511304021.jpg", "Besan Pearls, Desi Ghee, Saffron, Melon Seeds", "Festival Use", "Vegetarian"],
    ["Crispy Peanut Chikki", "Sweets", 120, 300, "https://www.themealdb.com/images/media/meals/ypxvwv1505333929.jpg", "Roasted Peanuts, Organic Jaggery, Ghee", "Sankranti Need", "Vegetarian"],
    ["Bellam Gavvalu (Sweet Shells)", "Sweets", 180, 400, "https://www.themealdb.com/images/media/meals/rtwwvv1511799504.jpg", "Wheat Flour, Jaggery Syrup, Cardamom", "Festival Use", "Vegetarian"],
    ["Gulab Jamun Tin", "Sweets", 250, 1000, "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80", "Khoya, Paneer, Rose Water Syrup", "Party Need", "Vegetarian"],
    ["Besan Ladoo Homemade", "Sweets", 320, 500, "https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg", "Roasted Gram Flour, Desi Ghee, Powdered Sugar", "Everyday Use", "Vegetarian"],
    ["Badam Halwa Special Mix", "Sweets", 450, 350, "https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg", "California Almonds, Saffron, Desi Ghee", "Festival Use", "Vegetarian"],
    ["Traditional Ariselu (Ghee)", "Sweets", 340, 500, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80", "Rice Flour, Jaggery, Sesame Seeds, Pure Ghee", "Sankranti Need", "Vegetarian"],
    ["Authentic Bengal Rasgulla Tin", "Sweets", 240, 1000, "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg", "Fresh Chhena, Sugar Syrup, Rose Water", "Party Need", "Vegetarian"],

    // Snacks (10)
    ["Crispy Rice Murukku", "Snacks", 140, 250, "https://images.unsplash.com/photo-1601050690333-d9a8e235e076?auto=format&fit=crop&w=600&q=80", "Rice Flour, Urad Dal, Cumin, Asafoetida", "Everyday Use", "Vegan"],
    ["Kerala Spicy Banana Chips", "Snacks", 160, 200, "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80", "Nendran Bananas, Pure Coconut Oil, Salt, Pepper", "Party Need", "Vegan"],
    ["Chettinad Spicy Mixture", "Snacks", 150, 300, "https://images.unsplash.com/photo-1599490659213-eec163b45888?auto=format&fit=crop&w=600&q=80", "Besan Sev, Peanuts, Curry Leaves, Boondi", "Party Need", "Vegan"],
    ["Crispy Ribbon Pakoda", "Snacks", 130, 250, "https://www.themealdb.com/images/media/meals/xqurcv1547791440.jpg", "Rice Flour, Besan, Red Chili, Butter", "Everyday Use", "Vegetarian"],
    ["Roasted Masala Cashews", "Snacks", 420, 250, "https://www.themealdb.com/images/media/meals/ysrryu1511428330.jpg", "Cashew Nuts, Black Pepper, Himalayan Salt", "Party Need", "Vegan"],
    ["Spicy Tapioca (Kappa) Chips", "Snacks", 110, 200, "https://www.themealdb.com/images/media/meals/wvvthq1511187900.jpg", "Tapioca Root, Red Chili Powder, Curry Leaves", "Party Need", "Vegan"],
    ["Crispy Maddur Vada Pack", "Snacks", 150, 300, "https://www.themealdb.com/images/media/meals/ytttuu1511553531.jpg", "Rice Flour, Semolina, Onion, Curry Leaves", "Everyday Use", "Vegan"],
    ["Crunchy Masala Kara Boondi", "Snacks", 120, 250, "https://www.themealdb.com/images/media/meals/wyrswu1511186714.jpg", "Gram Flour Pearls, Fried Peanuts, Garlic, Spices", "Party Need", "Vegan"],
    ["Cocktail Punjabi Samosa Pack", "Snacks", 160, 350, "https://www.themealdb.com/images/media/meals/vxsurq1511186419.jpg", "Potatoes, Green Peas, Maida, Indian Spices", "Party Need", "Vegan"],
    ["Masala Mathri Crackers", "Snacks", 130, 300, "https://www.themealdb.com/images/media/meals/uypvus1511186358.jpg", "Wheat Flour, Fenugreek Leaves, Black Pepper", "Everyday Use", "Vegan"],

    // Beverages (7)
    ["Madras Filter Coffee Powder", "Beverages", 320, 500, "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80", "80% Arabica Coffee beans, 20% Chicory", "Everyday Use", "Vegan"],
    ["Badam Milk Kesar Mix", "Beverages", 290, 300, "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80", "Almonds, Kashmiri Saffron, Cardamom, Sugar", "Everyday Use", "Vegetarian"],
    ["Rose Milk Artisan Syrup", "Beverages", 180, 500, "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg", "Pure Rose Petal Extract, Sugar, Beetroot Color", "Party Need", "Vegan"],
    ["Masala Chai Spice Blend", "Beverages", 210, 250, "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80", "Assam CTC Tea, Ginger, Cardamom, Cinnamon, Clove", "Everyday Use", "Vegan"],
    ["Nescafe Classic Soluble Coffee", "Beverages", 350, 100, "https://www.themealdb.com/images/media/meals/rqeswq1511792890.jpg", "Pure Instant Soluble Coffee", "Everyday Use", "Vegan"],
    ["Coca Cola Can", "Beverages", 40, 300, "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80", "Carbonated Water, High Fructose Corn Syrup, Caffeine", "Party Need", "Vegan"],
    ["Royal Thandai Masala Mix", "Beverages", 340, 250, "https://www.themealdb.com/images/media/meals/x0lk931587617616.jpg", "Melon Seeds, Fennel, Rose Petals, Black Pepper, Almonds", "Holi Special", "Vegetarian"],

    // Spices & Pantry (5)
    ["Idli Dosa Podi (Gunpowder)", "Spices", 160, 250, "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg", "Roasted Chana Dal, Urad Dal, Sesame Seeds, Red Chili", "Everyday Use", "Vegan"],
    ["Organic Turmeric Powder", "Spices", 140, 200, "https://www.themealdb.com/images/media/meals/txvpvt1511187498.jpg", "100% Pure Salem Turmeric Root Ground", "Everyday Use", "Vegan"],
    ["Kashmiri Chili Powder", "Spices", 190, 250, "https://www.themealdb.com/images/media/meals/tvqswu1511187313.jpg", "Mild Kashmiri Chili Peppers Sun Dried", "Everyday Use", "Vegan"],
    ["Aromatic Garam Masala", "Spices", 220, 150, "https://www.themealdb.com/images/media/meals/twspuv1511187212.jpg", "Cardamom, Cinnamon, Clove, Star Anise, Nutmeg", "Everyday Use", "Vegan"],
    ["Pure Cow Ghee Jar", "Pantry", 650, 500, "https://www.themealdb.com/images/media/meals/urxxut1511554162.jpg", "Traditional Hand Churned A2 Cow Ghee", "Everyday Use", "Vegetarian"]
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
