// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ParaizoEcosystem is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public paraizoToken;

    // Staking structure to track user stakes
    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 rewardPoints;
    }

    // Mapping of user address to their stake
    mapping(address => Stake) public stakes;
    
    // Total staked amount
    uint256 public totalStaked;
    
    // Staking rewards parameters
    uint256 public rewardRate = 100; // 100 reward points per 1 PARAIZO per day
    uint256 public constant REWARD_PER_TOKEN = 1000; // 1000 reward points per 1 PARAIZO staked

    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 rewardAmount);
    event RewardRateUpdated(uint256 newRate);

    constructor(address _paraizoToken) Ownable(msg.sender) {
        paraizoToken = IERC20(_paraizoToken);
    }

    /**
     * @dev Stake PARAIZO tokens to earn rewards in the ecosystem
     * @param _amount The amount of PARAIZO tokens to stake
     */
    function stake(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        
        // Calculate rewards before updating stake
        uint256 pendingRewards = calculateRewards(msg.sender);
        
        // Update stake amount
        stakes[msg.sender].amount += _amount;
        stakes[msg.sender].startTime = block.timestamp;
        stakes[msg.sender].rewardPoints += pendingRewards;
        
        totalStaked += _amount;

        // Transfer tokens from user to this contract
        paraizoToken.safeTransferFrom(msg.sender, address(this), _amount);

        emit Staked(msg.sender, _amount);
    }

    /**
     * @dev Unstake PARAIZO tokens
     * @param _amount The amount of PARAIZO tokens to unstake
     */
    function unstake(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        require(stakes[msg.sender].amount >= _amount, "Insufficient staked balance");

        // Calculate rewards before updating stake
        uint256 pendingRewards = calculateRewards(msg.sender);
        
        // Update stake amount
        stakes[msg.sender].amount -= _amount;
        if (stakes[msg.sender].amount == 0) {
            stakes[msg.sender].startTime = 0;
        }
        stakes[msg.sender].rewardPoints += pendingRewards;
        
        totalStaked -= _amount;

        // Transfer tokens back to user
        paraizoToken.safeTransfer(msg.sender, _amount);

        emit Unstaked(msg.sender, _amount);
    }

    /**
     * @dev Claim accumulated rewards
     */
    function claimRewards() external nonReentrant {
        uint256 rewards = calculateRewards(msg.sender);
        require(rewards > 0, "No rewards to claim");

        stakes[msg.sender].rewardPoints = 0;
        stakes[msg.sender].startTime = block.timestamp;

        // Transfer reward tokens to user (in this case, we could use other tokens or governance rights)
        // For now, we'll just update the reward tracking
        emit RewardsClaimed(msg.sender, rewards);
    }

    /**
     * @dev Calculate pending rewards for a user
     * @param _user The address of the user
     * @return The amount of pending rewards
     */
    function calculateRewards(address _user) public view returns (uint256) {
        Stake memory userStake = stakes[_user];
        if (userStake.amount == 0) {
            return 0;
        }

        uint256 timeElapsed = block.timestamp - userStake.startTime;
        uint256 stakingRewards = (userStake.amount * timeElapsed * rewardRate) / 1 days;
        
        return userStake.rewardPoints + stakingRewards;
    }

    /**
     * @dev Get the total rewards a user has accumulated (including unclaimed)
     * @param _user The address of the user
     * @return The total accumulated rewards
     */
    function getTotalRewards(address _user) external view returns (uint256) {
        return calculateRewards(_user);
    }

    /**
     * @dev Update the reward rate (only owner)
     * @param _newRate The new reward rate
     */
    function updateRewardRate(uint256 _newRate) external onlyOwner {
        rewardRate = _newRate;
        emit RewardRateUpdated(_newRate);
    }

    /**
     * @dev Staking bonus function for active streamers
     * This gives additional benefits to content creators
     */
    function applyStreamingBonus(address _streamer) external onlyOwner {
        require(stakes[_streamer].amount > 0, "Streamer must have staked tokens");
        
        // Give the streamer a bonus reward based on their stake
        uint256 bonus = (stakes[_streamer].amount * REWARD_PER_TOKEN) / 10000; // 0.01% bonus per token
        stakes[_streamer].rewardPoints += bonus;
    }
}