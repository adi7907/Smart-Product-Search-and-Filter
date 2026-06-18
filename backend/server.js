const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const multer = require('multer'); // The new file handler!
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Create a local 'uploads' folder if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 2. Tell the server to make the 'uploads' folder publicly viewable
app.use('/uploads', express.static(uploadDir));

// 3. Configure Multer to save files to that local folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Adds a timestamp to prevent overwriting
  }
});
const upload = multer({ storage: storage });

// Database Connection
let db;
(async () => {
  db = await open({ filename: './sharadha.db', driver: sqlite3.Database });
  
  // Ensure the table has an image_url column (and the new syllabus tables!)
  await db.exec(`
    -- 1. Expanded Products Table (Now with Advanced Filters)
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      weight_g INTEGER,
      image_url TEXT,
      ingredients TEXT,          -- e.g., "Contains Nuts", "Garlic-Free"
      festival_need TEXT,        -- e.g., "Diwali", "Navratri Fasting"
      dietary_preference TEXT    -- e.g., "Vegan", "Sugar-Free"
    );

    -- 2. Users / Customers Table
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      phone TEXT,
      role TEXT DEFAULT 'customer',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 3. Ingredients & Batches (Tracking Shelf-life)
    CREATE TABLE IF NOT EXISTS batches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      batch_number TEXT NOT NULL,
      manufacture_date DATE NOT NULL,
      expiry_date DATE NOT NULL,
      stock_quantity INTEGER NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );

    -- 4. Orders Table
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      total_amount REAL NOT NULL,
      delivery_status TEXT DEFAULT 'Processing', -- Processing, Dispatched, Delivered
      order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- 5. Cart Items Table (For Checkout Workflow)
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      product_id INTEGER,
      quantity INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);
})();

// --- THE UPGRADED POST ROUTE ---
// Notice the "upload.single('image')" middleware!
app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const { name, category, price, weight_g } = req.body;
        
        // If an image was uploaded, save its local path. Otherwise, leave it null.
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const insertQuery = "INSERT INTO products (name, category, price, weight_g, is_available, image_url) VALUES (?, ?, ?, ?, 1, ?)";
        
        const result = await db.run(insertQuery, [name, category, price, weight_g, imageUrl]);
        
        res.status(201).json({ success: true, productId: result.lastID });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Main Search Route (No changes needed here!)
app.get('/api/products', async (req, res) => {
    const { search, category, maxPrice } = req.query;
    let query = "SELECT * FROM products WHERE 1=1";
    let params = [];

    if (search) { query += " AND name LIKE ?"; params.push(`%${search}%`); }
    if (category && category !== 'All') { query += " AND category = ?"; params.push(category); }
    if (maxPrice) { query += " AND price <= ?"; params.push(Number(maxPrice)); }

    try {
        const rows = await db.all(query, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI Visual Search Endpoint
app.post('/api/visual-search', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image provided" });

    // Convert the image to base64 for Gemini
    const fs = require('fs');
    const imagePath = req.file.path;
    const imageData = fs.readFileSync(imagePath).toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = "You are a food identification assistant for an Indian grocery store. Look at this image and reply ONLY with the name of the food item or dish. Keep it to 1 to 3 words maximum (e.g., 'Mango Pickle', 'Ladoo', 'Samosa'). Do not use punctuation.";
    
    const imageParts = [{
      inlineData: { data: imageData, mimeType: req.file.mimetype }
    }];

    const result = await model.generateContent([prompt, ...imageParts]);
    const foodName = result.response.text().trim();

    // Clean up the temporary file
    fs.unlinkSync(imagePath);

    res.json({ search_term: foodName });
  } catch (error) {
    console.error("Gemini AI Error:", error);
    res.status(500).json({ error: "AI failed to analyze image" });
  }
});
app.listen(5000, () => console.log("Backend API running on port 5000"));
