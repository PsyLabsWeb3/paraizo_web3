// scripts/deploy.js

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Replace with your Paraizo token address
  const paraizoTokenAddress = "0xdC2a624dFFC1f6343F62A02001906252e3cA8fD2";
  
  // Parameters for the contract
  const rate = ethers.parseEther("1000"); // 1000 PARAIZO tokens per 1 ETH
  const maxPurchase = ethers.parseEther("10000"); // Max 10000 tokens per purchase
  const minPurchase = ethers.parseEther("100"); // Min 100 tokens per purchase

  // Get the contract factory
  const ParaizoTokenSwap = await ethers.getContractFactory("ParaizoTokenSwap");
  
  // Deploy the contract
  const paraizoTokenSwap = await ParaizoTokenSwap.deploy(
    paraizoTokenAddress,
    rate,
    maxPurchase,
    minPurchase
  );

  await paraizoTokenSwap.waitForDeployment();
  
  console.log(`ParaizoTokenSwap deployed to: ${paraizoTokenSwap.target}`);
  
  // Wait a bit for the transaction to be confirmed
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// Run the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });