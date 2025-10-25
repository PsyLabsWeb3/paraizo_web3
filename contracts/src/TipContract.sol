// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TipContract {
    event TipSent(address indexed from, address indexed to, uint256 amount, string message);
    event TipWithdrawn(address indexed to, uint256 amount);

    mapping(address => uint256) public tipsReceived;
    mapping(address => uint256) public tipsSent;

    modifier onlyStreamer(address streamer) {
        require(msg.sender == streamer, "Only streamer can call this function");
        _;
    }

    /**
     * @dev Send a tip to a streamer
     * @param _streamer The address of the streamer receiving the tip
     * @param _message Optional message to include with the tip
     */
    function sendTip(address payable _streamer, string memory _message) public payable {
        require(_streamer != address(0), "Invalid streamer address");
        require(msg.value > 0, "Tip amount must be greater than 0");

        tipsReceived[_streamer] += msg.value;
        tipsSent[msg.sender] += msg.value;

        emit TipSent(msg.sender, _streamer, msg.value, _message);

        // Transfer the tip amount to the streamer
        (bool success, ) = _streamer.call{value: msg.value}("");
        require(success, "Transfer failed");
    }

    /**
     * @dev Get total tips received by a streamer
     * @param _streamer The address of the streamer
     * @return Total amount of tips received
     */
    function getTotalTips(address _streamer) public view returns (uint256) {
        return tipsReceived[_streamer];
    }

    /**
     * @dev Get tips available for withdrawal by msg.sender
     * @return Available tips for withdrawal
     */
    function getAvailableTips() public view returns (uint256) {
        return tipsReceived[msg.sender];
    }

    /**
     * @dev Withdraw all tips received by the streamer
     */
    function withdrawTips() public onlyStreamer(msg.sender) {
        uint256 amount = tipsReceived[msg.sender];
        require(amount > 0, "No tips available to withdraw");

        tipsReceived[msg.sender] = 0;

        emit TipWithdrawn(msg.sender, amount);

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");
    }

    /**
     * @dev Fallback function to receive ETH
     */
    receive() external payable {
        // This allows the contract to receive ETH
    }

    /**
     * @dev Get contract balance
     */
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}