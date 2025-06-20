#  Token Vesting Dashboard

A full-stack Web3 dApp that allows users to visualize and claim vested ERC20 tokens over time using a smart contract on Ethereum. Built with Solidity, Hardhat, React, Ethers.js, and RainbowKit.

---

##  Features

-  **Solidity Smart Contract** with time-based vesting logic
-  **Wallet Integration** using RainbowKit + Wagmi
-  **Live Claimable Token View**
-  **Claim Button** to withdraw unlocked tokens
-  Deployable to any EVM-compatible testnet (e.g. Sepolia)



---

##  Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Smart Contract | Solidity, OpenZeppelin     |
| Deployment     | Hardhat, Sepolia           |
| Frontend       | React, Vite, Ethers.js     |
| Wallet         | RainbowKit + Wagmi         |
| Token          | ERC20 (Preset or custom)   |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/token-vesting-dashboard.git
cd token-vesting-dashboard
```

### 2. Install Dependencies

#### Backend (Hardhat)
```bash
npm install
```

#### Frontend
```bash
cd frontend
npm install

```

### 3. Setup Environment
Create a .env file in the root with the following content:

```bash
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_ID
PRIVATE_KEY=0xYOUR_PRIVATE_KEY

```
Use Sepolia testnet and a test wallet with ETH.

### 4. Deploy Contracts

```bash
npx hardhat run scripts/deploy.js --network sepolia

```

This deploys both the ERC20 token and TokenVesting contract, then mints tokens and sets a vesting schedule for the deployer.

### 5. Run Frontend

```bash
cd frontend
npm run dev

```
Then visit: http://localhost:5173

### 6. Example USage

- Connect wallet using RainbowKit
- View claimable tokens
- Click “Claim” to receive unlocked tokens
- Try with different accounts to simulate multiple vesting plans


### 7. Smart Contract Summary

function createVesting(address user, uint total, uint start, uint duration)
function claimableAmount(address user) view returns (uint)
function claim() public
