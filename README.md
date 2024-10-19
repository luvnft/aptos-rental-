# 🚀 Rental Agreement System - Frontend

Welcome to the **Rental Agreement System** frontend, a decentralized application built on the **Aptos Blockchain**. This platform empowers landlords and tenants to securely manage rental agreements, rent payments, security deposits, and damage deductions through smart contracts.

---

## 🔗 Links

- **Live Demo**: [Rental Agreement System](https://aptos-rental-agreements.vercel.app/)
- **Smart Contract Explorer**: [Aptos Explorer](https://explorer.aptoslabs.com/account/0x6d1adc4ecf58b8d7f4cc72cca9922fd61af7078f42976f59a8e6de467d34572f/modules/code/RentalAgreement?network=testnet)

---

## ✨ Key Features

- **Create Rental Agreements**: Landlords can create agreements with rent, security deposit, and contract duration.
- **Make Rent Payments**: Tenants can make rent payments using Aptos tokens (**APT**).
- **Manage Security Deposits**: Security deposits are held in smart contracts and refunded after approval.
- **Propose & Approve Deductions**: Landlords propose deductions for damages; tenants can approve or dispute them.
- **Track Rental History**: View rent payment history, deductions, and agreement status through a user-friendly interface.
- **Blockchain Security**: All operations are executed securely on the Aptos blockchain through smart contracts.

---

## 📋 Prerequisites

Ensure the following are installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Aptos Wallet** (e.g., **Petra Wallet**) for blockchain interactions

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

First, clone the project repository and navigate to the project directory:

```bash
cd rental-agreement-system
```

### 2. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```bash
PROJECT_NAME=RentalAgreementSystem
VITE_APP_NETWORK=testnet
VITE_MODULE_ADDRESS=0x44e4bfdbe756654c954112a24d3eab079f9acf2f6ec8c64b2a8bfd7c99ec70ed
```

Update the **VITE_MODULE_ADDRESS** with the deployed contract address.

### 4. Run the Development Server

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### 5. Deploy the Smart Contract

To deploy the smart contract:

1.  Install **Aptos CLI**.
2.  Update the **Move.toml** file with your wallet address:

    - Add you Wallet Address from Petra here

    ```bash
    sys_addrx = "0xca10b0176c34f9a8315589ff977645e04497814e9753d21f7d7e7c3d83aa7b57"
    ```

3.  Create your new Address for Deployment

    ```bash
    aptos init
    ```

    - Add your Account addr here for Deployment

    ```bash
    my_addrx = "6d1adc4ecf58b8d7f4cc72cca9922fd61af7078f42976f59a8e6de467d34572f"
    ```

4.  Compile and publish the contract:

    ```bash
    aptos move compile
    aptos move publish
    ```

---

## 🛠 How to Use the Platform

### 1. Connect Wallet

Connect your **Aptos Wallet** (e.g., **Petra Wallet**) to interact with the blockchain. This allows you to create agreements, make payments, and manage deposits securely.

### 2. Create Rental Agreement

Landlords can:

1. Navigate to the **Create Agreement** section.
2. Enter the tenant’s wallet address, rent amount, security deposit, and contract duration.
3. Submit the agreement, which will be recorded on the blockchain.

### 3. Make Security Deposit

Tenants can:

1. Go to **My Agreements** and select the agreement.
2. Submit the security deposit through their connected wallet.

### 4. Pay Rent

Tenants can pay rent by:

1. Navigating to the **Pay Rent** section.
2. Selecting the agreement and entering the payment amount.
3. Confirming the payment through the wallet.

### 5. Propose Deductions

Landlords can:

1. Navigate to the **Deductions** section.
2. Select the agreement and enter the damage details and deduction amount.
3. Submit the proposal for tenant approval.

### 6. Approve Deductions & Refund Deposit

Tenants can:

1. View deductions in **My Agreements**.
2. Approve or dispute deductions.
3. Once approved, request the refund of the remaining deposit.

---

## 📊 Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm test`**: Run unit tests.

---

## 🔍 Dependencies

- **React**: Library for building user interfaces.
- **TypeScript**: A superset of JavaScript for type-safe coding.
- **Aptos SDK**: JS/TS SDK for interacting with the Aptos blockchain.
- **Ant Design / Tailwind CSS**: For responsive UI design and layout.
- **Petra Wallet Adapter**: For seamless wallet connection and blockchain interaction.

---

## 📚 Available View Functions

- **View All Rentals**: Lists all created rental agreements.
- **View Rental by ID**: Displays details of a specific agreement.
- **View Rentals by Landlord**: Shows agreements created by a landlord.
- **View Rentals by Tenant**: Lists agreements where the tenant is involved.
- **View Active Rentals**: Displays ongoing rental agreements.
- **View Rent Payment History**: Shows rent payment history for an agreement.
- **View Deductions**: Displays proposed deductions for damages.

---

## 🛡 Security and Transparency

- **Smart Contracts**: All operations are executed securely on-chain.
- **No Intermediaries**: Transactions occur directly between landlords and tenants.
- **Real-Time Updates**: View rent history, deductions, and agreement status in real-time.

---

## 🌐 Common Issues and Solutions

1. **Wallet Connection Issues**: Ensure the wallet extension is installed and active.
2. **RPC Rate Limits**: Use private RPC providers to avoid network limits.
3. **Transaction Errors**: Verify wallet balances and permissions before transactions.

---

## 🚀 Scaling and Deployment

Considerations for scaling:

- Use **third-party RPC providers** like **Alchemy** or **QuickNode**.
- Implement **request throttling** to prevent overload.
- Utilize **WebSockets** for real-time updates.

---

## 🎉 Conclusion

The **Rental Agreement System** provides a decentralized, transparent way for landlords and tenants to manage rental contracts and payments. With secure smart contracts and real-time tracking, the platform ensures a seamless rental experience for all users.
