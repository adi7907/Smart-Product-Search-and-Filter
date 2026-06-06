const express = require('express');
const cors = require('cors');
const app = express();

// Security middleware to allow your teammate's frontend to talk to your backend
app.use(cors());
app.use(express.json()); 

// A temporary fake database for Sharadha Stores
const products = [
  { id: 1, name: "Traditional Mango Pickle", category: "Pickles", price: 150, weight: "500g", isAvailable: true, description: "Spicy and tangy homemade mango pickle." },
  { id: 2, name: "Besan Ladoo", category: "Sweets", price: 250, weight: "250g", isAvailable: true, description: "Sweet, roasted gram flour balls with ghee." },
  { id: 3, name: "Organic Turmeric Powder", category: "Spices", price: 80, weight: "100g", isAvailable: true, description: "Pure, vibrant yellow turmeric for cooking." }
];

// The Standard API Route (The Waiter)
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));