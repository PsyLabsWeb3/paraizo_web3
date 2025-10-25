// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/ParaizoToken.sol";
import "../src/TipContract.sol";
import "../src/SubscriptionContract.sol";
import "../src/ParaizoEcosystem.sol";

contract DeployAllToBaseSepolia is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envOr("PRIVATE_KEY", uint256(0));
        if (deployerPrivateKey == 0) {
            // If PRIVATE_KEY environment variable is not set, use the private key from command line
            // This will be handled by forge automatically
            vm.startBroadcast();
        } else {
            vm.startBroadcast(deployerPrivateKey);
        }

        // Deploy Paraizo Token
        ParaizoToken paraizoToken = new ParaizoToken();
        console.log("ParaizoToken deployed at:", address(paraizoToken));

        // Deploy Tip Contract
        TipContract tipContract = new TipContract();
        console.log("TipContract deployed at:", address(tipContract));

        // Deploy Subscription Contract
        SubscriptionContract subscriptionContract = new SubscriptionContract();
        console.log("SubscriptionContract deployed at:", address(subscriptionContract));

        // Deploy Ecosystem Contract
        ParaizoEcosystem paraizoEcosystem = new ParaizoEcosystem(address(paraizoToken));
        console.log("ParaizoEcosystem deployed at:", address(paraizoEcosystem));

        // Add Paraizo token to supported tokens in both contracts
        tipContract.addSupportedToken(address(paraizoToken));
        console.log("Added Paraizo token to TipContract supported tokens");
        
        subscriptionContract.addSupportedToken(address(paraizoToken));
        console.log("Added Paraizo token to SubscriptionContract supported tokens");

        vm.stopBroadcast();
    }
}