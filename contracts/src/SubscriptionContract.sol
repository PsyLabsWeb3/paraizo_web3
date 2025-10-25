// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SubscriptionContract {
    event Subscribed(address indexed user, address indexed streamer, uint256 duration, uint256 amount);
    event SubscriptionRenewed(address indexed user, address indexed streamer, uint256 duration, uint256 amount);
    event SubscriptionCancelled(address indexed user, address indexed streamer);

    struct Subscription {
        uint256 startTime;
        uint256 endTime;
        bool isActive;
    }

    mapping(address => mapping(address => Subscription)) public subscriptions; // user -> streamer -> subscription
    mapping(address => uint256) public earnings; // streamer -> earnings

    uint256 public constant MIN_SUB_DURATION = 1 days; // minimum subscription duration
    uint256 public constant MAX_SUB_DURATION = 365 days; // maximum subscription duration

    /**
     * @dev Subscribe to a streamer
     * @param _streamer The address of the streamer to subscribe to
     * @param _duration Duration of the subscription in seconds (min 1 day, max 365 days)
     */
    function subscribe(address _streamer, uint256 _duration) public payable {
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

        // Add earnings to streamer
        earnings[_streamer] += msg.value;

        emit Subscribed(msg.sender, _streamer, _duration, msg.value);
    }

    /**
     * @dev Renew an existing subscription
     * @param _streamer The address of the streamer to renew subscription for
     * @param _duration Additional duration to add in seconds
     */
    function renewSubscription(address _streamer, uint256 _duration) public payable {
        require(_streamer != address(0), "Invalid streamer address");
        require(msg.value > 0, "Renewal cost must be greater than 0");
        require(_duration >= MIN_SUB_DURATION && _duration <= MAX_SUB_DURATION, "Invalid subscription duration");
        require(subscriptions[msg.sender][_streamer].isActive, "No active subscription to renew");

        uint256 newEndTime = subscriptions[msg.sender][_streamer].endTime + _duration;
        subscriptions[msg.sender][_streamer].endTime = newEndTime;

        // Add earnings to streamer
        earnings[_streamer] += msg.value;

        emit SubscriptionRenewed(msg.sender, _streamer, _duration, msg.value);
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
     * @return startTime, endTime, and isActive status
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
     * @dev Withdraw earnings earned from subscriptions
     * @param _amount Amount to withdraw
     */
    function withdrawEarnings(uint256 _amount) public {
        require(earnings[msg.sender] >= _amount, "Insufficient earnings");
        require(_amount > 0, "Amount must be greater than 0");

        earnings[msg.sender] -= _amount;

        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "Withdrawal failed");
    }

    /**
     * @dev Get available earnings for withdrawal
     * @return Available earnings
     */
    function getAvailableEarnings() public view returns (uint256) {
        return earnings[msg.sender];
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