module.exports = (db) => {
  const router = require('express').Router();

  router.get('/alerts', async (req, res) => {
    try {
      if (!db) return res.json({ lowStock: [], expiringSoon: [] });
      const expiryThreshold = new Date();
      expiryThreshold.setDate(expiryThreshold.getDate() + 30);
      const limitDate = expiryThreshold.toISOString().split('T')[0];

      const lowStock = await db.all("SELECT b.*, p.name FROM batches b JOIN products p ON b.product_id = p.id WHERE b.stock_quantity < 10");
      const expiringSoon = await db.all("SELECT b.*, p.name FROM batches b JOIN products p ON b.product_id = p.id WHERE b.expiry_date <= ?", [limitDate]);
      res.json({ lowStock, expiringSoon });
    } catch (err) {
      res.json({ lowStock: [], expiringSoon: [] });
    }
  });

  router.get('/', async (req, res) => {
    try {
      if (!db) return res.json([]);
      const batches = await db.all("SELECT b.*, p.name as product_name FROM batches b LEFT JOIN products p ON b.product_id = p.id ORDER BY b.expiry_date ASC");
      res.json(batches);
    } catch (err) {
      res.json([]);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { product_id, batch_number, expiry_date, stock_quantity } = req.body;
      if (!db) return res.json({ id: Date.now(), ...req.body });
      const result = await db.run(
        "INSERT INTO batches (product_id, batch_number, manufacture_date, expiry_date, stock_quantity) VALUES (?, ?, ?, ?, ?)",
        [product_id || 1, batch_number || `BATCH-${Date.now().toString().slice(-4)}`, new Date().toISOString().split('T')[0], expiry_date, stock_quantity || 20]
      );
      res.json({ id: result ? result.lastID : Date.now(), success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
