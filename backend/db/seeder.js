async function seedProducts(db) {
  const productCount = await db.get("SELECT COUNT(*) as count FROM products");
  if (productCount.count === 0) {
    console.log("Seeding initial products with local images...");
    const seedProducts = [
      ["Mango Pickle", "Pickles", 150, 500, "/uploads/images.jpg", "Contains Mustard Oil", "Everyday Use", "Vegan"],
      ["Mixed Veg Pickle", "Pickles", 120, 250, "/uploads/download (3).jpg", "Spicy", "Everyday Use", "Vegan"],
      ["Motichoor Ladoo", "Sweets", 250, 500, "/uploads/download (2).jpg", "Contains Ghee, Nuts", "Diwali Special", "Vegetarian"],
      ["Kaju Katli", "Sweets", 800, 500, "/uploads/download (4).jpg", "Contains Cashews", "Diwali Special", "Vegetarian"],
      ["Gulab Jamun", "Sweets", 200, 500, "/uploads/download (5).jpg", "Contains Dairy, Sugar", "Festival Use", "Vegetarian"],
      ["Banana Chips", "Snacks", 90, 200, "/uploads/download (6).jpg", "Fried in Coconut Oil", "Everyday Use", "Vegan"],
      ["Nescafe Classic", "Beverages", 350, 100, "/uploads/download.jpg", "Caffeine", "Everyday Use", "Vegan"],
      ["Coca Cola", "Beverages", 40, 300, "/uploads/download (1).jpg", "High Sugar", "Party Need", "Vegan"],
      ["Organic Honey", "Pantry", 400, 500, "/uploads/download (7).jpg", "Raw Honey", "Everyday Use", "Vegetarian"],
      ["Lays Cream & Onion", "Snacks", 20, 50, "/uploads/download (8).jpg", "Dairy Flavoring", "Party Need", "Vegetarian"]
    ];
    for (const p of seedProducts) {
      await db.run("INSERT INTO products (name, category, price, weight_g, image_url, ingredients, festival_need, dietary_preference) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", p);
    }
  }
}

module.exports = { seedProducts };
