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
  
  // Ensure the table has an image_url column!
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        weight_g INTEGER,
        is_available INTEGER DEFAULT 1,
        image_url TEXT
    )
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

app.listen(5000, () => console.log("Backend API running on port 5000"));