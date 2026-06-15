const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'sharadha.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        weight_g INTEGER,
        is_available INTEGER DEFAULT 1
    )`);

    // Seed initial data if empty
    db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
        if (row.count === 0) {
            const insert = db.prepare("INSERT INTO products (name, category, price, weight_g) VALUES (?, ?, ?, ?)");
            insert.run("Premium Mango Pickle", "Pickles", 250, 500);
            insert.run("Handmade Besan Ladoo", "Sweets", 320, 400);
            insert.run("Crispy Murukku", "Snacks", 120, 200);
            insert.finalize();
        }
    });
});

module.exports = db;