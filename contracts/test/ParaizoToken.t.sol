// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ParaizoToken.sol";

contract ParaizoTokenTest is Test {
    ParaizoToken public paraizoToken;
    address public owner = address(0x1);
    address public user1 = address(0x2);
    address public user2 = address(0x3);

    function setUp() public {
        vm.prank(owner);
        paraizoToken = new ParaizoToken();
    }

    function testInitialSupply() public {
        uint256 initialSupply = 1_000_000_000 * 10 ** 18; // 1 billion tokens
        assertEq(paraizoToken.totalSupply(), initialSupply);
        assertEq(paraizoToken.balanceOf(owner), initialSupply);
    }

    function testTokenNameAndSymbol() public {
        assertEq(paraizoToken.name(), "Paraizo Token");
        assertEq(paraizoToken.symbol(), "PARAIZO");
    }

    function testMint() public {
        vm.startPrank(owner);
        bytes32 MINTER_ROLE = paraizoToken.MINTER_ROLE();
        paraizoToken.grantRole(MINTER_ROLE, owner);
        
        uint256 initialBalance = paraizoToken.balanceOf(user1);
        paraizoToken.mint(user1, 1000 * 10 ** 18);
        uint256 finalBalance = paraizoToken.balanceOf(user1);
        
        assertEq(finalBalance - initialBalance, 1000 * 10 ** 18);
        vm.stopPrank();
    }

    function testBurn() public {
        vm.startPrank(owner);
        uint256 initialBalance = paraizoToken.balanceOf(owner);
        paraizoToken.burn(100 * 10 ** 18);
        uint256 finalBalance = paraizoToken.balanceOf(owner);
        
        assertEq(initialBalance - finalBalance, 100 * 10 ** 18);
        vm.stopPrank();
    }

    function testPauseAndUnpause() public {
        vm.startPrank(owner);
        bytes32 PAUSER_ROLE = paraizoToken.PAUSER_ROLE();
        paraizoToken.grantRole(PAUSER_ROLE, owner);
        
        // Should be able to transfer before pause
        paraizoToken.transfer(user1, 100);
        
        // Pause the contract
        paraizoToken.pause();
        
        // Should not be able to transfer when paused
        vm.expectRevert();
        paraizoToken.transfer(user1, 100);
        
        // Unpause the contract
        paraizoToken.unpause();
        
        // Should be able to transfer after unpause
        paraizoToken.transfer(user1, 100);
        vm.stopPrank();
    }
}