module.exports = (db) => {
  const router = require('express').Router();

  router.get('/', async (req, res) => {
    try {
      const orders = await db.all("SELECT * FROM orders ORDER BY order_date DESC LIMIT 50");
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/:id/status', async (req, res) => {
    try {
      const { status } = req.body;
      await db.run("UPDATE orders SET delivery_status = ? WHERE id = ?", [status, req.params.id]);
      res.json({ message: "Status updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
