const hre = require("hardhat");

async function main() {
  // Get the ContractFactory
  const Market = await hre.ethers.getContractFactory("AgriMarket");

  // Deploy the contract
  const market = await Market.deploy();

  // Wait for deployment to complete
  await market.deployed();

  // Log the contract address
  console.log("AgriMarket deployed to:", market.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
