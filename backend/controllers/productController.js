const agriMarket = require('../blockchain/web3');

exports.getProducts = async (req, res) => {
  try {
    const products = await agriMarket.methods.getProducts().call();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Blockchain error' });
  }
};
