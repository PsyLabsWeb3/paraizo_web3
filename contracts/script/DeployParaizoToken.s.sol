// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/ParaizoToken.sol";

contract DeployParaizoToken is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        ParaizoToken paraizoToken = new ParaizoToken();
        
        console.log("ParaizoToken deployed at:", address(paraizoToken));

        vm.stopBroadcast();
    }
}