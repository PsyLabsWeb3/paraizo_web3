# Paraizo Web3 Streaming Platform

A decentralized streaming platform that allows creators to stream live content and receive tips directly from viewers using cryptocurrency.

## Features

- Wallet authentication with RainbowKit and Wagmi
- Live streaming via YouTube Live integration
- Crypto tipping system using smart contracts on Base
- Creator dashboard with analytics
- Real-time chat functionality
- Subscription model for recurring support
- Mobile-responsive dark theme UI

## Tech Stack

### Frontend

- Next.js 14+
- React 18+
- TypeScript
- TailwindCSS
- shadcn/ui
- RainbowKit (wallet connection)
- Wagmi (Web3 interaction)
- Viem (Ethereum client)

### Backend

- Node.js/Express
- PostgreSQL
- Ethers.js (for smart contract interaction)

### Smart Contracts

- Solidity
- Foundry
- Deployed on Base Mainnet/Sepolia

## Installation

### Prerequisites

- Node.js 18+
- pnpm
- Foundry (for smart contracts)
- PostgreSQL

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd paraizo_web3
```

2. Install frontend dependencies:

```bash
cd frontend
pnpm install
```

3. Install backend dependencies:

```bash
cd ../backend
npm install
```

4. Set up environment variables:

```bash
cp .env.example .env
# Update the values in .env
```

5. Set up the database:

```bash
cd ../backend
npm run migrate
```

6. Start the backend:

```bash
cd ../backend
npm run dev
```

7. Start the frontend:

```bash
cd ../frontend
pnpm dev
```

## Smart Contracts

The platform uses four main interconnected smart contracts deployed on Base:

### 1. `ParaizoToken.sol` - The Platform's Native ERC-20 Token ($PARAIZO)

- **Role**: The foundational token of the entire ecosystem
- **Features**: Pausable, mintable, burnable ERC-20 token
- **Total Supply**: 1 billion tokens (1,000,000,000)
- **Integration**: Used by all other contracts for payments, staking, and rewards

### 2. `ParizoEcosystem.sol` - The Staking and Reward System

- **Role**: Incentivizes token holders through staking with reward generation
- **Features**:
  - Staking of $PARAIZO tokens with time-based reward calculation
  - Bonus rewards specifically for active streamers
  - Non-reentrant functions for security
  - Owner-controlled reward rate adjustments
- **Integration**: Uses `ParaizoToken` for staking operations and provides additional incentives for content creators

### 3. `SubscriptionContract.sol` - The Subscription System

- **Role**: Enables recurring payments from viewers to streamers
- **Features**:
  - Subscriptions with ETH or $PARAIZO tokens
  - Subscription renewal functionality
  - Support for multiple token types
  - Flexible duration (1 day to 365 days)
  - Earnings tracking and withdrawal for streamers
- **Integration**: Accepts $PARAIZO tokens as payment method and works alongside the ecosystem contract

### 4. `TipContract.sol` - The Direct Tipping System

- **Role**: Enables real-time tips during live streams
- **Features**:
  - Tips with ETH or $PARAIZO tokens
  - Optional message with tips
  - Support for multiple token types
  - Earnings tracking and withdrawal for streamers
- **Integration**: Accepts $PARAIZO tokens as tip method and complements the ecosystem contract

### How the Contracts Work Together

The four contracts form a synergistic ecosystem where:

1. **Users** can acquire $PARAIZO tokens and choose to:

   - Stake them in `ParizoEcosystem` to earn rewards
   - Use them to subscribe to streamers via `SubscriptionContract`
   - Send tips to streamers via `TipContract`
2. **Streamers** benefit from multiple revenue streams:

   - Through `SubscriptionContract` for recurring support
   - Through `TipContract` for direct audience engagement
   - Through `ParizoEcosystem` which includes special bonuses for active creators
3. **Token Utility**: $PARAIZO tokens serve as the common value unit across all contracts, creating:

   - A cohesive economic system
   - Multiple use cases that increase token demand
   - Alignment of incentives between users and creators
   - A sustainable ecosystem with built-in value flows

This integrated approach ensures that all participants (users, creators, and token holders) have aligned incentives to grow and participate in the platform.

To deploy all contracts (including the $PARAIZO token and ecosystem):

```bash
cd contracts
forge script script/DeployAllEnhanced.s.sol --rpc-url $BASE_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast
```

To deploy only the $PARAIZO token:

```bash
cd contracts
forge script script/DeployParaizoToken.s.sol --private-key $PRIVATE_KEY --broadcast
```

To deploy the ecosystem contracts:

```bash
cd contracts
forge script script/DeployParaizoEcosystem.s.sol --private-key $PRIVATE_KEY --broadcast
```

## $PARAIZO Token Economics

The $PARAIZO token serves as the native utility token of the Paraizo ecosystem with the following use cases:

- Platform governance voting rights
- Staking rewards for active community members
- Discount on streaming fees and subscriptions
- Rewards for content creators and active viewers
- In-platform purchases and premium features
- Used for tips and subscriptions within the platform
- Total supply: 1,000,000,000 tokens (1 billion)

## Integration with Platform Contracts

### Enhanced Tip System

- Users can now tip with both ETH and $PARAIZO tokens
- Streamers can withdraw both ETH and token tips separately
- Multiple token types supported for flexible tipping

### Enhanced Subscription System

- Users can subscribe with both ETH and $PARAIZO tokens
- Streamers earn from both payment methods
- Flexible payment options for viewers

### Ecosystem Contract Features

- Stake $PARAIZO tokens to earn rewards
- Participate in platform governance
- Content creators get bonus rewards for active streaming
- Reward points system for active community members

## API Endpoints

### Users

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login with wallet
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Shows

- `GET /api/shows` - Get all shows
- `GET /api/shows/live` - Get live shows
- `GET /api/shows/:id` - Get a specific show
- `POST /api/shows` - Create a new show
- `PUT /api/shows/:id` - Update a show
- `DELETE /api/shows/:id` - Delete a show

### Tips

- `GET /api/tips/:streamerId` - Get tips for a streamer
- `POST /api/tips` - Send a tip
- `GET /api/tips/total/:streamerId` - Get total tips for a streamer

### Streams

- `GET /api/streams/status/:streamerId` - Get stream status
- `POST /api/streams/start` - Start a stream
- `POST /api/streams/end` - End a stream
- `GET /api/streams/viewers/:streamId` - Get viewer count

## Development

### Frontend

The frontend follows a component-based architecture with:

- Pages in `app/` directory using Next.js App Router
- Reusable components in `components/`
- UI components from shadcn/ui
- Wallet integration via RainbowKit/Wagmi
- Web3 interactions using Viem

### Backend

The backend follows a service-oriented architecture with:

- Controllers in `app/controllers/`
- Services in `app/services/`
- Database models in `app/models/` (when using ORM)
- API routes in `routes/`
- Database schema/migrations in `db/`

### Environment Variables

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - WalletConnect project ID
- `NEXT_PUBLIC_BASE_RPC_URL` - Base RPC URL for frontend
- `DB_*` - Database connection parameters
- `YOUTUBE_API_KEY` - YouTube Data API key for stream integration
- `JWT_SECRET` - Secret for JWT token generation
- `BASE_*` - Base network configuration
- `WALLET_PRIVATE_KEY` - Private key for contract deployments

## Deployment

### Frontend

The frontend is deployed on Vercel:

```
vercel --prod
```

### Backend

The backend is deployed on Render or Fly.io with:

- PostgreSQL database
- Environment variables configured
- Health check endpoint at `/`

### Smart Contracts

Smart contracts are deployed on Base network using Foundry:

```
forge script script/Deploy.s.sol --rpc-url $BASE_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify
```

## Roadmap

- [ ] Real-time chat with WebSockets
- [ ] NFT rewards for loyal viewers
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Direct streaming (not just YouTube embed)
- [ ] Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a pull request

## License

MIT




brito@britos-MacBook-Air contracts % forge script script/DeployAllBaseSepolia.s.sol --rpc-url https://base-sepolia.drpc.org --private-key 2bc2fb86828553f6c50d37c7dd75fa1028bc9d5569ceb038bd0b268c58f9e8f1 --broadcast --verify
[⠊] Compiling...
[⠒] Compiling 1 files with Solc 0
[⠢] Compiling 1 files with Solc 0
[⠆] Compiling 1 files with Solc 0
[⠰] Compiling 1 files with Solc 0
[⠔] Compiling 1 files with Solc 0
[⠒] Compiling 1 files with Solc 0
[⠑] Compiling 1 files with Solc 0
[⠘] Compiling 1 files with Solc 0
[⠃] Compiling 1 files with Solc 0
[⠊] Compiling 1 files with Solc 0
[⠒] Compiling 1 files with Solc 0
[⠢] Compiling 1 files with Solc 0.8.20
[⠆] Solc 0.8.20 finished in 1.09s
Compiler run successful!
Script ran successfully.

== Logs ==
  ParaizoToken deployed at: 0x79AD3A2b765635Bff2c0b2Fe8c39EF397953454D
  TipContract deployed at: 0x6002191B15b486611CBe8ae22303a5e686E2D023
  SubscriptionContract deployed at: 0x22e16402F251715dBA6065d53Cb4eD70B57B9e44
  ParaizoEcosystem deployed at: 0xa718118AaCafeb731218427D1027E3f5235cd8eC
  Added Paraizo token to TipContract supported tokens
  Added Paraizo token to SubscriptionContract supported tokens

## Setting up 1 EVM.

==========================

Chain 84532

Estimated gas price: 0.000970152 gwei

Estimated total gas used for script: 5342502

Estimated amount required: 0.000005183039000304 ETH

==========================

Transactions saved to: /Users/brito/paraizo-streaming/paraizo_web3/contracts/broadcast/DeployAllBaseSepolia.s.sol/84532/run-latest.json

Sensitive values saved to: /Users/brito/paraizo-streaming/paraizo_web3/contracts/cache/DeployAllBaseSepolia.s.sol/84532/run-latest.json

Error: Failed to send transaction

Context:

- server returned an error response: error code -32003: insufficient funds for gas * price + value: have 0 want 1246570618296
  brito@britos-MacBook-Air contracts %
