// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ParaizoToken.sol";
import "../src/TipContract.sol";
import "../src/SubscriptionContract.sol";
import "../src/ParaizoEcosystem.sol";

contract VerifyDeployment is Test {
    ParaizoToken public paraizoToken;
    TipContract public tipContract;
    SubscriptionContract public subscriptionContract;
    ParaizoEcosystem public paraizoEcosystem;
    
    address public owner = vm.addr(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80);
    address public streamer1 = address(0x2);
    address public viewer1 = address(0x3);

    function setUp() public {
        // Use the deployed addresses with proper type conversion
        paraizoToken = ParaizoToken(payable(0x5FbDB2315678afecb367f032d93F642f64180aa3));
        tipContract = TipContract(payable(0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512));
        subscriptionContract = SubscriptionContract(payable(0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0));
        paraizoEcosystem = ParaizoEcosystem(payable(0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9));
    }

    function testContractDeployment() public {
        // Verify all contracts are deployed
        assertTrue(address(paraizoToken) != address(0));
        assertTrue(address(tipContract) != address(0));
        assertTrue(address(subscriptionContract) != address(0));
        assertTrue(address(paraizoEcosystem) != address(0));
        
        // Check token properties
        assertEq(paraizoToken.name(), "Paraizo Token");
        assertEq(paraizoToken.symbol(), "PARAIZO");
        assertEq(paraizoToken.totalSupply(), 1_000_000_000 * 10 ** 18); // 1 billion tokens
        
        // Check ownership (using DEFAULT_ADMIN_ROLE for ParaizoToken since it uses AccessControl)
        assertTrue(paraizoToken.hasRole(paraizoToken.DEFAULT_ADMIN_ROLE(), owner));
        assertEq(tipContract.owner(), owner);
        assertEq(subscriptionContract.owner(), owner);
        assertEq(paraizoEcosystem.owner(), owner);
    }

    function testTokenTipFunctionality() public {
        // Mint some tokens to viewer for testing
        vm.prank(owner);
        paraizoToken.mint(viewer1, 1000 * 10 ** 18);
        
        // Approve tip contract to spend tokens
        vm.startPrank(viewer1);
        paraizoToken.approve(address(tipContract), 100 * 10 ** 18);
        
        // Send token tip
        tipContract.sendTokenTip(streamer1, address(paraizoToken), 50 * 10 ** 18, "Thank you for great content!");
        vm.stopPrank();
        
        // Verify tip was recorded
        uint256 streamerTokenTips = tipContract.tokenTipsReceived(streamer1, address(paraizoToken));
        assertEq(streamerTokenTips, 50 * 10 ** 18);
        
        uint256 viewerTokenTips = tipContract.tokenTipsSent(viewer1, address(paraizoToken));
        assertEq(viewerTokenTips, 50 * 10 ** 18);
    }

    function testTokenSubscriptionFunctionality() public {
        // Mint some tokens to viewer for testing
        vm.prank(owner);
        paraizoToken.mint(viewer1, 1000 * 10 ** 18);
        
        // Approve subscription contract to spend tokens
        vm.startPrank(viewer1);
        paraizoToken.approve(address(subscriptionContract), 200 * 10 ** 18);
        
        // Subscribe with tokens
        subscriptionContract.subscribeWithTokens(streamer1, 30 days, address(paraizoToken), 100 * 10 ** 18);
        vm.stopPrank();
        
        // Verify subscription is active
        assertTrue(subscriptionContract.checkSubscriptionStatus(viewer1, streamer1));
        
        // Verify streamer earned tokens
        uint256 streamerTokenEarnings = subscriptionContract.tokenEarnings(streamer1, address(paraizoToken));
        assertEq(streamerTokenEarnings, 100 * 10 ** 18);
    }

    function testEcosystemStakingFunctionality() public {
        // Mint some tokens to streamer for staking
        vm.prank(owner);
        paraizoToken.mint(streamer1, 1000 * 10 ** 18);
        
        // Approve ecosystem contract to spend tokens
        vm.startPrank(streamer1);
        paraizoToken.approve(address(paraizoEcosystem), 500 * 10 ** 18);
        
        // Stake tokens
        paraizoEcosystem.stake(500 * 10 ** 18);
        
        // Verify staking
        (uint256 amount, , ) = paraizoEcosystem.stakes(streamer1);
        assertEq(amount, 500 * 10 ** 18);
        
        // Check that tokens were transferred to the ecosystem contract
        assertEq(paraizoToken.balanceOf(address(paraizoEcosystem)), 500 * 10 ** 18);
        vm.stopPrank();
    }

    function testCompleteFlow() public {
        // Test a complete flow: stake, tip, subscribe
        vm.prank(owner);
        paraizoToken.mint(streamer1, 2000 * 10 ** 18);
        
        vm.prank(owner);
        paraizoToken.mint(viewer1, 2000 * 10 ** 18);
        
        // 1. Streamer stakes tokens in ecosystem
        vm.startPrank(streamer1);
        paraizoToken.approve(address(paraizoEcosystem), 1000 * 10 ** 18);
        paraizoEcosystem.stake(500 * 10 ** 18);
        vm.stopPrank();
        
        // 2. Viewer tips with tokens
        vm.startPrank(viewer1);
        paraizoToken.approve(address(tipContract), 100 * 10 ** 18);
        tipContract.sendTokenTip(streamer1, address(paraizoToken), 50 * 10 ** 18, "Great stream!");
        vm.stopPrank();
        
        // 3. Viewer subscribes with tokens
        vm.startPrank(viewer1);
        paraizoToken.approve(address(subscriptionContract), 200 * 10 ** 18);
        subscriptionContract.subscribeWithTokens(streamer1, 30 days, address(paraizoToken), 100 * 10 ** 18);
        vm.stopPrank();
        
        // 4. Verify all interactions worked
        uint256 tipAmount = tipContract.tokenTipsReceived(streamer1, address(paraizoToken));
        assertEq(tipAmount, 50 * 10 ** 18);
        
        uint256 subEarnings = subscriptionContract.tokenEarnings(streamer1, address(paraizoToken));
        assertEq(subEarnings, 100 * 10 ** 18);
        
        (uint256 stakeAmount, , ) = paraizoEcosystem.stakes(streamer1);
        assertEq(stakeAmount, 500 * 10 ** 18);
    }
}