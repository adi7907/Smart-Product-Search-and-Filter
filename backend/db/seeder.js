async function seedProducts(db) {
  const productCount = await db.get("SELECT COUNT(*) as count FROM products");
  if (productCount.count === 0) {
    console.log("Seeding initial products with local images...");
    const seedProducts = [
      ["Mango Pickle", "Pickles", 150, 500, "/uploads/mango pickle.jpg", "Contains Mustard Oil", "Everyday Use", "Vegan"],
      ["Mixed Veg Pickle", "Pickles", 120, 250, "/uploads/mix veg pickle.jpg", "Spicy", "Everyday Use", "Vegan"],
      ["Motichoor Ladoo", "Sweets", 250, 500, "/uploads/motichoor laddu.jpg", "Contains Ghee, Nuts", "Diwali Special", "Vegetarian"],
      ["Kaju Katli", "Sweets", 800, 500, "/uploads/kaju katli.jpg", "Contains Cashews", "Diwali Special", "Vegetarian"],
      ["Gulab Jamun", "Sweets", 200, 500, "/uploads/gulab jaamun.jpg", "Contains Dairy, Sugar", "Festival Use", "Vegetarian"],
      ["Fresh Mango", "Pantry", 90, 200, "/uploads/mango.jpg", "Fresh Fruit", "Everyday Use", "Vegan"],
      ["Nescafe Classic", "Beverages", 350, 100, "/uploads/nescafe coffee.jpg", "Caffeine", "Everyday Use", "Vegan"],
      ["Coca Cola", "Beverages", 40, 300, "/uploads/coca cola.jpg", "High Sugar", "Party Need", "Vegan"],
      ["Organic Honey", "Pantry", 400, 500, "/uploads/organic honey.jpg", "Raw Honey", "Everyday Use", "Vegetarian"],
      ["Lays Cream & Onion", "Snacks", 20, 50, "/uploads/lays chips.jpg", "Dairy Flavoring", "Party Need", "Vegetarian"]
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
