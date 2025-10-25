// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/TipContract.sol";

contract TipContractTest is Test {
    TipContract public tipContract;
    address public streamer = address(0x1234);
    address public tipper = address(0x5678);

    function setUp() public {
        tipContract = new TipContract();
    }

    function testSendTip() public {
        uint256 tipAmount = 1 ether;
        
        // Send tip
        vm.deal(tipper, tipAmount);
        vm.prank(tipper);
        tipContract.sendTip{value: tipAmount}(payable(streamer), "Great stream!");

        // Check that tip was recorded
        assertEq(tipContract.tipsReceived(streamer), tipAmount);
        assertEq(tipContract.tipsSent(tipper), tipAmount);
    }

    function testGetTotalTips() public {
        uint256 tipAmount = 1 ether;
        
        vm.deal(tipper, tipAmount);
        vm.prank(tipper);
        tipContract.sendTip{value: tipAmount}(payable(streamer), "Great stream!");

        assertEq(tipContract.getTotalTips(streamer), tipAmount);
    }

    function testWithdrawTips() public {
        uint256 tipAmount = 1 ether;
        
        vm.deal(tipper, tipAmount);
        vm.prank(tipper);
        tipContract.sendTip{value: tipAmount}(payable(streamer), "Great stream!");

        uint256 initialBalance = streamer.balance;
        
        vm.prank(streamer);
        tipContract.withdrawTips();

        uint256 finalBalance = streamer.balance;
        
        assertEq(finalBalance - initialBalance, tipAmount);
        assertEq(tipContract.tipsReceived(streamer), 0);
    }
}