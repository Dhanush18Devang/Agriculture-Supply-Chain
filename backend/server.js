const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/product');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
