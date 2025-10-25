// scripts/transfer-tokens-to-swap.js

async function main() {
  // Address of the deployed ParaizoTokenSwap contract (you'll get this after deployment)
  const tokenSwapAddress = "YOUR_DEPLOYED_SWAP_CONTRACT_ADDRESS";
  
  // Address of the Paraizo token
  const paraizoTokenAddress = "0xdC2a624dFFC1f6343F62A02001906252e3cA8fD2";
  
  // Amount of tokens to send to the swap contract (10,000 tokens with 18 decimals)
  const tokensToSend = ethers.parseEther("10000"); // 10,000 tokens

  const [deployer] = await ethers.getSigners();

  // Get token contract instance
  const paraizoToken = await ethers.getContractAt("IERC20", paraizoTokenAddress);

  console.log("Transferring tokens to swap contract...");
  console.log("From:", deployer.address);
  console.log("To:", tokenSwapAddress);
  console.log("Amount:", ethers.formatEther(tokensToSend), "PARAIZO");

  // Check balance of deployer
  const deployerBalance = await paraizoToken.balanceOf(deployer.address);
  console.log("Deployer balance:", ethers.formatEther(deployerBalance), "PARAIZO");
  
  if (deployerBalance < tokensToSend) {
    console.error("Not enough tokens to transfer!");
    return;
  }

  // Transfer tokens to the swap contract
  const transferTx = await paraizoToken.transfer(tokenSwapAddress, tokensToSend);
  await transferTx.wait();
  
  console.log("Tokens transferred successfully!");
  console.log(`Tokens available in swap contract: ${await paraizoToken.balanceOf(tokenSwapAddress)}`);
}

// Run the transfer
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });