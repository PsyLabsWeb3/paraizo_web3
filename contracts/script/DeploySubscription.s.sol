// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/SubscriptionContract.sol";

contract DeploySubscription is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        SubscriptionContract subscriptionContract = new SubscriptionContract();
        
        console.log("SubscriptionContract deployed at:", address(subscriptionContract));

        vm.stopBroadcast();
    }
}