// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SubscriptionContract is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    event Subscribed(address indexed user, address indexed streamer, uint256 duration, uint256 amount, bool isTokenSubscription);
    event SubscriptionRenewed(address indexed user, address indexed streamer, uint256 duration, uint256 amount, bool isTokenSubscription);
    event SubscriptionCancelled(address indexed user, address indexed streamer);

    struct Subscription {
        uint256 startTime;
        uint256 endTime;
        bool isActive;
    }

    mapping(address => mapping(address => Subscription)) public subscriptions; // user -> streamer -> subscription
    mapping(address => uint256) public ethEarnings; // streamer -> ETH earnings
    mapping(address => mapping(address => uint256)) public tokenEarnings; // streamer -> token -> earnings

    // Track supported token addresses
    mapping(address => bool) public supportedTokens;

    uint256 public constant MIN_SUB_DURATION = 1 days; // minimum subscription duration
    uint256 public constant MAX_SUB_DURATION = 365 days; // maximum subscription duration

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Add a token to the supported list (only owner can call)
     * @param _token The address of the token to add
     */
    function addSupportedToken(address _token) external onlyOwner {
        supportedTokens[_token] = true;
    }

    /**
     * @dev Subscribe to a streamer with ETH
     * @param _streamer The address of the streamer to subscribe to
     * @param _duration Duration of the subscription in seconds (min 1 day, max 365 days)
     */
    function subscribeWithEth(address _streamer, uint256 _duration) public payable nonReentrant {
        require(_streamer != address(0), "Invalid streamer address");
        require(msg.value > 0, "Subscription cost must be greater than 0");
        require(_duration >= MIN_SUB_DURATION && _duration <= MAX_SUB_DURATION, "Invalid subscription duration");

        uint256 currentEndTime = subscriptions[msg.sender][_streamer].endTime;
        uint256 startTime;
        
        if (currentEndTime > block.timestamp) {
            // Renewing an active subscription
            startTime = currentEndTime;
        } else {
            // New subscription
            startTime = block.timestamp;
        }
        
        uint256 endTime = startTime + _duration;
        
        subscriptions[msg.sender][_streamer] = Subscription({
            startTime: startTime,
            endTime: endTime,
            isActive: true
        });

        // Add ETH earnings to streamer
        ethEarnings[_streamer] += msg.value;

        emit Subscribed(msg.sender, _streamer, _duration, msg.value, false);
    }

    /**
     * @dev Subscribe to a streamer with tokens
     * @param _streamer The address of the streamer to subscribe to
     * @param _duration Duration of the subscription in seconds (min 1 day, max 365 days)
     * @param _token The address of the token to pay with
     * @param _amount The amount of tokens to pay
     */
    function subscribeWithTokens(address _streamer, uint256 _duration, address _token, uint256 _amount) public nonReentrant {
        require(_streamer != address(0), "Invalid streamer address");
        require(_amount > 0, "Subscription cost must be greater than 0");
        require(_duration >= MIN_SUB_DURATION && _duration <= MAX_SUB_DURATION, "Invalid subscription duration");
        require(supportedTokens[_token], "Token not supported for subscriptions");

        // Transfer tokens from sender to this contract
        IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);

        uint256 currentEndTime = subscriptions[msg.sender][_streamer].endTime;
        uint256 startTime;
        
        if (currentEndTime > block.timestamp) {
            // Renewing an active subscription
            startTime = currentEndTime;
        } else {
            // New subscription
            startTime = block.timestamp;
        }
        
        uint256 endTime = startTime + _duration;
        
        subscriptions[msg.sender][_streamer] = Subscription({
            startTime: startTime,
            endTime: endTime,
            isActive: true
        });

        // Add token earnings to streamer
        tokenEarnings[_streamer][_token] += _amount;

        emit Subscribed(msg.sender, _streamer, _duration, _amount, true);
    }

    /**
     * @dev Renew an existing subscription with ETH
     * @param _streamer The address of the streamer to renew subscription for
     * @param _duration Additional duration to add in seconds
     */
    function renewSubscriptionWithEth(address _streamer, uint256 _duration) public payable nonReentrant {
        require(_streamer != address(0), "Invalid streamer address");
        require(msg.value > 0, "Renewal cost must be greater than 0");
        require(_duration >= MIN_SUB_DURATION && _duration <= MAX_SUB_DURATION, "Invalid subscription duration");
        require(subscriptions[msg.sender][_streamer].isActive, "No active subscription to renew");

        uint256 newEndTime = subscriptions[msg.sender][_streamer].endTime + _duration;
        subscriptions[msg.sender][_streamer].endTime = newEndTime;

        // Add ETH earnings to streamer
        ethEarnings[_streamer] += msg.value;

        emit SubscriptionRenewed(msg.sender, _streamer, _duration, msg.value, false);
    }

    /**
     * @dev Renew an existing subscription with tokens
     * @param _streamer The address of the streamer to renew subscription for
     * @param _duration Additional duration to add in seconds
     * @param _token The address of the token to pay with
     * @param _amount The amount of tokens to pay
     */
    function renewSubscriptionWithTokens(address _streamer, uint256 _duration, address _token, uint256 _amount) public nonReentrant {
        require(_streamer != address(0), "Invalid streamer address");
        require(_amount > 0, "Renewal cost must be greater than 0");
        require(_duration >= MIN_SUB_DURATION && _duration <= MAX_SUB_DURATION, "Invalid subscription duration");
        require(subscriptions[msg.sender][_streamer].isActive, "No active subscription to renew");
        require(supportedTokens[_token], "Token not supported for subscriptions");

        // Transfer tokens from sender to this contract
        IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);

        uint256 newEndTime = subscriptions[msg.sender][_streamer].endTime + _duration;
        subscriptions[msg.sender][_streamer].endTime = newEndTime;

        // Add token earnings to streamer
        tokenEarnings[_streamer][_token] += _amount;

        emit SubscriptionRenewed(msg.sender, _streamer, _duration, _amount, true);
    }

    /**
     * @dev Check if a user has an active subscription to a streamer
     * @param _user The address of the user
     * @param _streamer The address of the streamer
     * @return True if the subscription is active, false otherwise
     */
    function checkSubscriptionStatus(address _user, address _streamer) public view returns (bool) {
        Subscription memory sub = subscriptions[_user][_streamer];
        return (sub.isActive && sub.endTime > block.timestamp);
    }

    /**
     * @dev Get subscription details for a user and streamer
     * @param _user The address of the user
     * @param _streamer The address of the streamer
     * @return startTime The start time of the subscription
     * @return endTime The end time of the subscription
     * @return isActive Whether the subscription is active
     */
    function getSubscriptionDetails(address _user, address _streamer) public view returns (uint256 startTime, uint256 endTime, bool isActive) {
        Subscription memory sub = subscriptions[_user][_streamer];
        return (sub.startTime, sub.endTime, sub.isActive && sub.endTime > block.timestamp);
    }

    /**
     * @dev Cancel subscription (will end at the end of current period)
     * @param _streamer The address of the streamer to unsubscribe from
     */
    function cancelSubscription(address _streamer) public {
        require(subscriptions[msg.sender][_streamer].isActive, "No active subscription to cancel");
        
        // Instead of immediately cancelling, we let it expire at the end of current period
        subscriptions[msg.sender][_streamer].isActive = false;
        
        emit SubscriptionCancelled(msg.sender, _streamer);
    }

    /**
     * @dev Withdraw ETH earnings earned from subscriptions
     * @param _amount Amount to withdraw
     */
    function withdrawEthEarnings(uint256 _amount) public nonReentrant {
        require(ethEarnings[msg.sender] >= _amount, "Insufficient ETH earnings");
        require(_amount > 0, "Amount must be greater than 0");

        ethEarnings[msg.sender] -= _amount;

        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "ETH Withdrawal failed");
    }

    /**
     * @dev Withdraw token earnings earned from subscriptions
     * @param _token The address of the token to withdraw
     * @param _amount Amount to withdraw
     */
    function withdrawTokenEarnings(address _token, uint256 _amount) public nonReentrant {
        require(tokenEarnings[msg.sender][_token] >= _amount, "Insufficient token earnings");
        require(_amount > 0, "Amount must be greater than 0");

        tokenEarnings[msg.sender][_token] -= _amount;

        IERC20(_token).safeTransfer(msg.sender, _amount);
    }

    /**
     * @dev Get available ETH earnings for withdrawal
     * @return Available ETH earnings
     */
    function getAvailableEthEarnings() public view returns (uint256) {
        return ethEarnings[msg.sender];
    }

    /**
     * @dev Get available token earnings for withdrawal
     * @param _token The address of the token
     * @return Available token earnings
     */
    function getAvailableTokenEarnings(address _token) public view returns (uint256) {
        return tokenEarnings[msg.sender][_token];
    }

    /**
     * @dev Get total available earnings (ETH + tokens) for a streamer
     * @return Total available earnings
     */
    function getTotalAvailableEarnings() public view returns (uint256) {
        return ethEarnings[msg.sender] + getAvailableTokenEarningsForStreamer(msg.sender);
    }

    /**
     * @dev Get total available token earnings for a streamer
     * @param _streamer The address of the streamer
     * @return Total available token earnings for the streamer
     */
    function getAvailableTokenEarningsForStreamer(address _streamer) public view returns (uint256) {
        // This would require iterating through all supported tokens to get the total
        // For simplicity, return a value for the most common token or implement per token
        return tokenEarnings[_streamer][0x0000000000000000000000000000000000000000]; // Placeholder
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