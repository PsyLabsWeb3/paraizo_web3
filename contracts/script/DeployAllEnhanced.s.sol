// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/ParaizoToken.sol";
import "../src/TipContract.sol";
import "../src/SubscriptionContract.sol";
import "../src/ParaizoEcosystem.sol";

contract DeployAll is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy Paraizo Token
        ParaizoToken paraizoToken = new ParaizoToken();
        console.log("ParaizoToken deployed at:", address(paraizoToken));

        // 2. Deploy Tip Contract
        TipContract tipContract = new TipContract();
        console.log("TipContract deployed at:", address(tipContract));

        // 3. Deploy Subscription Contract
        SubscriptionContract subscriptionContract = new SubscriptionContract();
        console.log("SubscriptionContract deployed at:", address(subscriptionContract));

        // 4. Deploy Ecosystem Contract
        ParaizoEcosystem paraizoEcosystem = new ParaizoEcosystem(address(paraizoToken));
        console.log("ParaizoEcosystem deployed at:", address(paraizoEcosystem));

        // 5. Add Paraizo token to supported tokens in both contracts
        tipContract.addSupportedToken(address(paraizoToken));
        console.log("Added Paraizo token to TipContract supported tokens");
        
        subscriptionContract.addSupportedToken(address(paraizoToken));
        console.log("Added Paraizo token to SubscriptionContract supported tokens");

        vm.stopBroadcast();
    }
}