const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function connectDB() {
  const dbPath = process.env.VERCEL ? path.join('/tmp', 'sharadha_v20.db') : './sharadha_v20.db';
  const db = await open({ filename: dbPath, driver: sqlite3.Database });
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, category TEXT NOT NULL,
      price REAL NOT NULL, weight_g INTEGER, image_url TEXT, ingredients TEXT, 
      festival_need TEXT, dietary_preference TEXT
    );
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL, phone TEXT, role TEXT DEFAULT 'customer', created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS batches (
      id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, batch_number TEXT NOT NULL,
      manufacture_date DATE NOT NULL, expiry_date DATE NOT NULL, stock_quantity INTEGER NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, total_amount REAL NOT NULL,
      delivery_status TEXT DEFAULT 'Processing', order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, product_id INTEGER,
      quantity INTEGER NOT NULL DEFAULT 1, FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);
  
  return db;
}

module.exports = { connectDB };
