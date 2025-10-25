// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/ParaizoEcosystem.sol";
import "../src/ParaizoToken.sol";

contract DeployParaizoEcosystem is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // We'll need the Paraizo token address - for now using a placeholder
        // In real deployment, we'd deploy the token first or use the actual deployed address
        address paraizoTokenAddress = 0x5FbDB2315678afecb367f032d93F642f64180aa3; // Paraizo token deployed to local Anvil
        
        ParaizoEcosystem paraizoEcosystem = new ParaizoEcosystem(paraizoTokenAddress);
        
        console.log("ParaizoEcosystem deployed at:", address(paraizoEcosystem));

        vm.stopBroadcast();
    }
}