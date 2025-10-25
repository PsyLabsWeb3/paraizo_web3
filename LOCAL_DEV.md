# Local Development Setup

This guide explains how to set up and run the Paraizo Web3 Streaming platform locally with deployed smart contracts.

## Prerequisites

1. Install Foundry:
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

2. Install dependencies in the contracts directory:
```bash
cd contracts
forge install foundry-rs/forge-std
```

## Running Local Blockchain

1. Start a local Ethereum node using Anvil:
```bash
anvil --chain-id 31337
```

This will start a local blockchain on `http://127.0.0.1:8545` with 10 pre-funded accounts.

## Deploying Contracts

1. Compile the contracts:
```bash
cd contracts
forge build
```

2. Deploy the SubscriptionContract:
```bash
source .env && forge script script/DeploySubscription.s.sol:DeploySubscription --rpc-url $RPC_URL --broadcast --private-key $PRIVATE_KEY
```

3. Deploy the TipContract:
```bash
source .env && forge script script/DeployTip.s.sol:DeployTip --rpc-url $RPC_URL --broadcast --private-key $PRIVATE_KEY
```

## Contract Addresses

After deployment, the contracts will be available at:
- SubscriptionContract: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
- TipContract: `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`

## Frontend Integration

The frontend is configured to connect to the local blockchain (chain ID 31337) and interact with the deployed contracts. You can test contract interactions by navigating to the "Test Contracts" page in the application.

## Testing

To test contract functionality:
1. Connect your wallet (use one of the Anvil pre-funded accounts)
2. Navigate to the "Test Contracts" page
3. Use the provided UI to interact with subscription and tipping functions

## Environment Variables

The `.env` file in the contracts directory contains:
- PRIVATE_KEY: The private key of the deployer account
- RPC_URL: The URL of the local blockchain node

## Troubleshooting

If you encounter issues:
1. Ensure Anvil is running on the correct port
2. Verify contract addresses in `/frontend/lib/constants.ts`
3. Check that the frontend is configured to use the correct chain ID (31337)