const express = require('express');

module.exports = function(db, upload) {
  const router = express.Router();

  router.post('/', upload.single('image'), async (req, res) => {
    try {
      if (!req.body.name || !req.body.price || !req.body.category) {
        return res.status(400).json({ error: "Name, Price, and Category cannot be empty." });
      }
      const { name, category, price, weight_g, ingredients, festival_need, dietary_preference } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const insertQuery = "INSERT INTO products (name, category, price, weight_g, image_url, ingredients, festival_need, dietary_preference) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const result = await db.run(insertQuery, [name, category, price, weight_g, imageUrl, ingredients || null, festival_need || null, dietary_preference || null]);
      
      res.status(201).json({ success: true, productId: result.lastID });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await db.run("DELETE FROM products WHERE id = ?", [req.params.id]);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/', async (req, res) => {
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

  return router;
};
