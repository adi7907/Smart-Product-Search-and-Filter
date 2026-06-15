const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Main Search & Filter Route
app.get('/api/products', (req, res) => {
    const { search, category, maxPrice } = req.query;

    let query = "SELECT * FROM products WHERE 1=1";
    let params = [];

    if (search) {
        query += " AND name LIKE ?";
        params.push(`%${search}%`);
    }
    if (category && category !== 'All') {
        query += " AND category = ?";
        params.push(category);
    }
    if (maxPrice) {
        query += " AND price <= ?";
        params.push(Number(maxPrice));
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Admin Route: Add a new product to the database
app.post('/api/products', (req, res) => {
    const { name, category, price, weight_g } = req.body;
    
    // Basic server-side validation
    if (!name || !category || !price) {
        return res.status(400).json({ error: "Name, category, and price are required." });
    }

    const insertQuery = "INSERT INTO products (name, category, price, weight_g, is_available) VALUES (?, ?, ?, ?, 1)";
    
    db.run(insertQuery, [name, category, price, weight_g], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            success: true, 
            message: "Product added successfully!", 
            productId: this.lastID 
        });
    });
});

app.listen(5000, () => console.log("Backend API running on port 5000"));