module.exports = (db) => {
  const router = require('express').Router();

  router.get('/alerts', async (req, res) => {
    try {
      if (!db) return res.json({ lowStock: [], expiringSoon: [] });
      const today = new Date().toISOString().split('T')[0];
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

  return router;
};
