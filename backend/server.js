require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

let routerPromise = null;
function getRouter() {
  if (!routerPromise) {
    const r = express.Router();
    const prodRoutes = require('./routes/productRoutes')(null, upload);
    const aiRoutes = require('./routes/aiRoutes')(upload);
    const batchRoutes = require('./routes/batchRoutes')(null);
    const orderRoutes = require('./routes/orderRoutes')(null);

    r.use('/api/products', prodRoutes);
    r.use('/products', prodRoutes);
    r.use('/api/batches', batchRoutes);
    r.use('/batches', batchRoutes);
    r.use('/api/orders', orderRoutes);
    r.use('/orders', orderRoutes);
    r.use('/api', aiRoutes);
    r.use('/', aiRoutes);
    routerPromise = r;
  }
  return routerPromise;
}

app.use((req, res, next) => {
  if (req.path.startsWith('/uploads')) return next();
  try {
    const router = getRouter();
    router(req, res, next);
  } catch (err) {
    next(err);
  }
});

if (!process.env.VERCEL) {
  app.listen(5000, () => console.log("Backend API running on port 5000"));
}

module.exports = app;
