const mysql = require('mysql');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your database username
  password: '32339', // Replace with your database password
  database: 'agri_supply', // Replace with your database name
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the application if the connection fails
  }
  console.log('Connected to the database.');
});

module.exports = db;  // Export the connection so it can be used in other files
