require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { connectDB } = require('./db/database');
const { seedProducts } = require('./db/seeder');

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
async function getRouter() {
  if (!routerPromise) {
    routerPromise = (async () => {
      const db = await connectDB();
      await seedProducts(db);
      const r = express.Router();
      r.use('/api/products', require('./routes/productRoutes')(db, upload));
      r.use('/api', require('./routes/aiRoutes')(upload));
      r.use('/api/batches', require('./routes/batchRoutes')(db));
      r.use('/api/orders', require('./routes/orderRoutes')(db));
      return r;
    })();
  }
  return routerPromise;
}

app.use(async (req, res, next) => {
  if (req.path.startsWith('/uploads')) return next();
  try {
    const router = await getRouter();
    router(req, res, next);
  } catch (err) {
    next(err);
  }
});

if (!process.env.VERCEL) {
  app.listen(5000, () => console.log("Backend API running on port 5000"));
}

module.exports = app;
