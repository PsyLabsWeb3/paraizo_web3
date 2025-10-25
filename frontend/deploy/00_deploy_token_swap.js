// deploy/00_deploy_token_swap.js

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // The Paraizo token address on Base Sepolia
  const paraizoTokenAddress = "0xdC2a624dFFC1f6343F62A02001906252e3cA8fD2";
  
  // Parameters for the contract: token address, rate (1000 PARAIZO per 1 ETH), max purchase, min purchase
  const rate = ethers.parseEther("1000"); // 1000 PARAIZO tokens per 1 ETH
  const maxPurchase = ethers.parseEther("10000"); // Max 10000 tokens per purchase
  const minPurchase = ethers.parseEther("100"); // Min 100 tokens per purchase

  const paraizoTokenSwap = await deploy("ParaizoTokenSwap", {
    from: deployer,
    args: [paraizoTokenAddress, rate, maxPurchase, minPurchase],
    log: true,
    autoMine: true, // speed up deployment on local network
  });

  console.log(`ParaizoTokenSwap deployed to: ${paraizoTokenSwap.address}`);
};

module.exports.tags = ["ParaizoTokenSwap"];