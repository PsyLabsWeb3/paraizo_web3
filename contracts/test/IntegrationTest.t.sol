// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ParaizoToken.sol";
import "../src/TipContract.sol";
import "../src/SubscriptionContract.sol";
import "../src/ParaizoEcosystem.sol";

contract IntegrationTest is Test {
    ParaizoToken public paraizoToken;
    TipContract public tipContract;
    SubscriptionContract public subscriptionContract;
    ParaizoEcosystem public paraizoEcosystem;
    
    address public owner = address(0x1);
    address public streamer1 = address(0x2);
    address public viewer1 = address(0x3);
    address public viewer2 = address(0x4);

    function setUp() public {
        // Deploy Paraizo Token
        vm.prank(owner);
        paraizoToken = new ParaizoToken();
        
        // Deploy Tip Contract
        vm.prank(owner);
        tipContract = new TipContract();
        
        // Deploy Subscription Contract
        vm.prank(owner);
        subscriptionContract = new SubscriptionContract();
        
        // Deploy Ecosystem Contract
        vm.prank(owner);
        paraizoEcosystem = new ParaizoEcosystem(address(paraizoToken));
        
        // Add Paraizo token to supported tokens in both contracts
        vm.startPrank(owner);
        tipContract.addSupportedToken(address(paraizoToken));
        subscriptionContract.addSupportedToken(address(paraizoToken));
        vm.stopPrank();
        
        // Mint some tokens to the viewers
        vm.prank(owner);
        paraizoToken.mint(viewer1, 10000 * 10 ** 18);
        
        vm.prank(owner);
        paraizoToken.mint(viewer2, 10000 * 10 ** 18);
        
        vm.prank(owner);
        paraizoToken.mint(streamer1, 1000 * 10 ** 18);
    }

    function testTokenTipIntegration() public {
        // Approve tip contract to spend tokens
        vm.startPrank(viewer1);
        paraizoToken.approve(address(tipContract), 100 * 10 ** 18);
        
        // Send token tip
        tipContract.sendTokenTip(streamer1, address(paraizoToken), 50 * 10 ** 18, "Thank you for great content!");
        vm.stopPrank();
        
        // Check that streamer received the tip
        uint256 streamerTokenTips = tipContract.tokenTipsReceived(streamer1, address(paraizoToken));
        assertEq(streamerTokenTips, 50 * 10 ** 18);
        
        // Check that viewer sent the tip
        uint256 viewerTokenTips = tipContract.tokenTipsSent(viewer1, address(paraizoToken));
        assertEq(viewerTokenTips, 50 * 10 ** 18);
    }

    function testTokenSubscriptionIntegration() public {
        // Approve subscription contract to spend tokens
        vm.startPrank(viewer1);
        paraizoToken.approve(address(subscriptionContract), 200 * 10 ** 18);
        
        // Subscribe with tokens
        subscriptionContract.subscribeWithTokens(streamer1, 30 days, address(paraizoToken), 100 * 10 ** 18);
        vm.stopPrank();
        
        // Check that subscription is active
        assertTrue(subscriptionContract.checkSubscriptionStatus(viewer1, streamer1));
        
        // Check that streamer earned tokens
        uint256 streamerTokenEarnings = subscriptionContract.tokenEarnings(streamer1, address(paraizoToken));
        assertEq(streamerTokenEarnings, 100 * 10 ** 18);
    }

    function testEcosystemStakingIntegration() public {
        // Approve ecosystem contract to spend tokens
        vm.startPrank(viewer1);
        paraizoToken.approve(address(paraizoEcosystem), 1000 * 10 ** 18);
        
        // Stake some tokens
        paraizoEcosystem.stake(500 * 10 ** 18);
        vm.stopPrank();
        
        // Check staking
        (uint256 amount, , ) = paraizoEcosystem.stakes(viewer1);
        assertEq(amount, 500 * 10 ** 18);
        
        // Check that tokens were transferred to the ecosystem contract
        assertEq(paraizoToken.balanceOf(address(paraizoEcosystem)), 500 * 10 ** 18);
    }

    function testFullIntegration() public {
        // Test the full flow: stake, tip, subscribe, earn rewards
        
        // 1. Stake some tokens in ecosystem
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
        vm.startPrank(viewer2);
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