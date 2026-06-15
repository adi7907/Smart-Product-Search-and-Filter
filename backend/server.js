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

app.listen(5000, () => console.log("Backend API running on port 5000"));