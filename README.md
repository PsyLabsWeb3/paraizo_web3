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

The platform uses two main smart contracts deployed on Base:

1. `TipContract.sol` - Handles crypto tips to streamers
2. `SubscriptionContract.sol` - Manages recurring subscriptions to streamers

To deploy the contracts:
```bash
cd contracts
forge script script/Deploy.s.sol --rpc-url $BASE_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast
```

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