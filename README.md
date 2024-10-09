# Micro-Insurance System - Frontend

This is the frontend for the **Micro-Insurance System** built on the **Aptos Blockchain**. The platform enables users to purchase micro-insurance policies, request claims, and receive payouts, with all actions securely managed via smart contracts.

## Key Features

- **View Available Policies**: Users can browse through a list of pre-created insurance policies available for purchase.
- **Purchase Insurance Policies**: Users can purchase micro-insurance policies directly using Aptos native token (**APT**).
- **Claim Requests**: Users can request insurance claims after purchasing a policy.
- **Claim Verification**: Claims are reviewed and verified by policy creators.
- **Payouts**: Verified claims trigger payouts of the specified claimable amount directly to the user.
- **Policy Management**: Policy creators can view and manage policies and verify customer claims.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **Aptos Wallet** extension (e.g., Petra Wallet) for blockchain interactions

## Setup Instructions

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
cd micro-insurance-system
```

### 2. Install Dependencies

Install the necessary dependencies for the project using **npm** or **yarn**:

```bash
npm install
```

or

```bash
yarn install
```

### 3. Configure Environment Variables

You need to configure the environment variables for the frontend to interact with the Aptos blockchain. Create a `.env` file in the project root and add the following variables:

```bash
PROJECT_NAME=MicroInsuranceSystem
VITE_APP_NETWORK=testnet
VITE_MODULE_ADDRESS=0x<your_contract_address>
```

Adjust the `NODE_URL` and `FAUCET_URL` if you are using **Testnet** or **Mainnet** instead of Devnet.

### 4. Run the Development Server

Start the development server by running:

```bash
npm run dev
```

or

```bash
yarn run dev
```

The app will be available at `http://localhost:5173`.

## How to Use the Platform

### 1. Connect Wallet

Upon opening the application, you'll be prompted to connect your Aptos wallet (e.g., Petra Wallet). This allows you to interact with the blockchain and perform operations such as purchasing policies and requesting claims.

### 2. View Available Policies

Users can browse the **Policies** section to view the available insurance policies. Each policy will display details such as:

- Policy description
- Premium amount
- Maximum claimable amount
- Type (e.g., health, auto)
- Yearly or one-time payment options

### 3. Purchase Policy

To purchase an insurance policy:

- Select the policy you want to purchase.
- The platform will prompt you to pay the premium amount in **APT** via your connected Aptos wallet.
- Once purchased, the policy will be added to your list of active policies.

### 4. Request Claim

To request an insurance claim:

- Navigate to **My Policies** and select the policy you want to claim.
- Click on **Request Claim**. The request will be submitted to the policy creator for verification.

### 5. Claim Verification and Payout

For policy creators, after receiving a claim request:

- Go to **Manage Policies** and select the relevant policy.
- Review the claim request and click **Verify** if the claim is legitimate.
- Once verified, the claim will be automatically paid out to the customer.

## Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm test`**: Runs unit tests.

## Dependencies

The project uses the following key dependencies:

- **React**: UI library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for type-safe development.
- **Aptos SDK**: JavaScript/TypeScript SDK to interact with the Aptos blockchain.
- **Ant Design / Tailwind CSS**: For responsive UI design and layout.
- **Petra Wallet Adapter**: To connect and interact with the Aptos wallet.

## Conclusion

This frontend allows users to seamlessly interact with the **Micro-Insurance System**, providing a decentralized way to manage policies, request claims, and handle payouts. With a user-friendly interface and blockchain security, users and policy creators can manage their insurance needs transparently.
