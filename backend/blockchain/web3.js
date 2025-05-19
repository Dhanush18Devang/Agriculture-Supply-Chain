const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const contractABI = JSON.parse(fs.readFileSync(path.join(__dirname, '../contracts/AgriMarketABI.json')));
const contractAddress = process.env.CONTRACT_ADDRESS;

const web3 = new Web3('http://localhost:8545'); // Or Ganache
const agriMarket = new web3.eth.Contract(contractABI, contractAddress);

module.exports = agriMarket;
