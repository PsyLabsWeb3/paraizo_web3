// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/TipContract.sol";
import "../src/SubscriptionContract.sol";
import "../src/ParaizoToken.sol";

contract DeployAll is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Paraizo Token first
        ParaizoToken paraizoToken = new ParaizoToken();
        console.log("ParaizoToken deployed at:", address(paraizoToken));

        // Deploy Tip Contract
        TipContract tipContract = new TipContract();
        console.log("TipContract deployed at:", address(tipContract));

        // Deploy Subscription Contract
        SubscriptionContract subscriptionContract = new SubscriptionContract();
        console.log("SubscriptionContract deployed at:", address(subscriptionContract));

        vm.stopBroadcast();
    }
}