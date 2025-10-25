// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TipContract is ReentrancyGuard, Ownable {
    constructor() Ownable(msg.sender) {}
    using SafeERC20 for IERC20;

    event TipSent(address indexed from, address indexed to, uint256 amount, string message, bool isTokenTip);
    event TipWithdrawn(address indexed to, uint256 amount, bool isTokenTip);

    // Track ETH tips
    mapping(address => uint256) public ethTipsReceived;
    mapping(address => uint256) public ethTipsSent;
    
    // Track token tips
    mapping(address => mapping(address => uint256)) public tokenTipsReceived; // streamer => token => amount
    mapping(address => mapping(address => uint256)) public tokenTipsSent;     // sender => token => amount

    // Track supported token addresses
    mapping(address => bool) public supportedTokens;

    modifier onlyStreamer(address streamer) {
        require(msg.sender == streamer, "Only streamer can call this function");
        _;
    }

    /**
     * @dev Add a token to the supported list (only owner can call)
     * @param _token The address of the token to add
     */
    function addSupportedToken(address _token) external onlyOwner {
        supportedTokens[_token] = true;
    }

    /**
     * @dev Send an ETH tip to a streamer
     * @param _streamer The address of the streamer receiving the tip
     * @param _message Optional message to include with the tip
     */
    function sendEthTip(address payable _streamer, string memory _message) public payable nonReentrant {
        require(_streamer != address(0), "Invalid streamer address");
        require(msg.value > 0, "Tip amount must be greater than 0");

        ethTipsReceived[_streamer] += msg.value;
        ethTipsSent[msg.sender] += msg.value;

        emit TipSent(msg.sender, _streamer, msg.value, _message, false);

        // Transfer the tip amount to the streamer
        (bool success, ) = _streamer.call{value: msg.value}("");
        require(success, "Transfer failed");
    }

    /**
     * @dev Send a token tip to a streamer
     * @param _streamer The address of the streamer receiving the tip
     * @param _token The address of the token to tip with
     * @param _amount The amount of tokens to tip
     * @param _message Optional message to include with the tip
     */
    function sendTokenTip(address _streamer, address _token, uint256 _amount, string memory _message) public nonReentrant {
        require(_streamer != address(0), "Invalid streamer address");
        require(_amount > 0, "Tip amount must be greater than 0");
        require(supportedTokens[_token], "Token not supported");

        // Transfer tokens from sender to this contract
        IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);

        tokenTipsReceived[_streamer][_token] += _amount;
        tokenTipsSent[msg.sender][_token] += _amount;

        emit TipSent(msg.sender, _streamer, _amount, _message, true);
    }

    /**
     * @dev Get total ETH tips received by a streamer
     * @param _streamer The address of the streamer
     * @return Total amount of ETH tips received
     */
    function getTotalEthTips(address _streamer) public view returns (uint256) {
        return ethTipsReceived[_streamer];
    }

    /**
     * @dev Get total token tips received by a streamer for a specific token
     * @param _streamer The address of the streamer
     * @param _token The address of the token
     * @return Total amount of token tips received
     */
    function getTotalTokenTips(address _streamer, address _token) public view returns (uint256) {
        return tokenTipsReceived[_streamer][_token];
    }

    /**
     * @dev Get tips available for withdrawal by msg.sender (ETH only)
     * @return Available ETH tips for withdrawal
     */
    function getAvailableEthTips() public view returns (uint256) {
        return ethTipsReceived[msg.sender];
    }

    /**
     * @dev Get token tips available for withdrawal by msg.sender
     * @param _token The address of the token
     * @return Available token tips for withdrawal
     */
    function getAvailableTokenTips(address _token) public view returns (uint256) {
        return tokenTipsReceived[msg.sender][_token];
    }

    /**
     * @dev Withdraw ETH tips received by the streamer
     */
    function withdrawEthTips() public payable onlyStreamer(msg.sender) nonReentrant {
        uint256 amount = ethTipsReceived[msg.sender];
        require(amount > 0, "No ETH tips available to withdraw");

        ethTipsReceived[msg.sender] = 0;

        emit TipWithdrawn(msg.sender, amount, false);

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "ETH Withdrawal failed");
    }

    /**
     * @dev Withdraw token tips received by the streamer
     * @param _token The address of the token to withdraw
     */
    function withdrawTokenTips(address _token) public onlyStreamer(msg.sender) nonReentrant {
        uint256 amount = tokenTipsReceived[msg.sender][_token];
        require(amount > 0, "No token tips available to withdraw");

        tokenTipsReceived[msg.sender][_token] = 0;

        emit TipWithdrawn(msg.sender, amount, true);

        IERC20(_token).safeTransfer(msg.sender, amount);
    }

    /**
     * @dev Fallback function to receive ETH
     */
    receive() external payable {
        // This allows the contract to receive ETH
    }

    /**
     * @dev Get contract ETH balance
     */
    function getContractEthBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Get contract token balance
     * @param _token The address of the token
     */
    function getContractTokenBalance(address _token) public view returns (uint256) {
        return IERC20(_token).balanceOf(address(this));
    }
}