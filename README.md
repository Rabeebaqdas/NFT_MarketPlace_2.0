# NFT Marketplace

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (React & Testing)
- [Ethers](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ipfs](https://ipfs.io/) (Metadata storage)
- [React routers](https://v5.reactrouter.com/) (Navigational components)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/), should work with any node version below 16.5.0
- Install [Hardhat](https://hardhat.org/)

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
```
$ cd NFT_MarketPlace_2.0
$ npm install
```
### 3. Create env
# ALCHEMY_API= "Your ALCHEMY_API"
# privateKey= "Your privateKey"
# REACT_APP_pinata_api_key = "your REACT_APP_pinata_api_key" 
# REACT_APP_pinata_secret_api_key = "your REACT_APP_pinata_secret_api_key"

### 3. Boot up local development blockchain
```
$ cd NFT_MarketPlace_2.0
$ npx hardhat node
```

### 5. Migrate Smart Contracts
`npx hardhat run src/backend/scripts/deploy.js --network localhost`

### 6. Run Tests
`$ npx hardhat test`

### 7. Launch Frontend
`$ npm run start`

License
----
MIT

