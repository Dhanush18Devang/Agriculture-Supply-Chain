const express = require('express');
const router = express.Router();

// Import the database connection (using MySQL)
const db = require('../db');  // Make sure you have a database connection file like db.js

// Define the route to get all products
router.get('/', (req, res) => {
  // Example: Fetch data from MySQL database
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.json(results); // Send back the data from the database as a JSON response
  });
});

module.exports = router;
