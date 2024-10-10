## RentalAgreement Smart Contract

This module provides a decentralized solution for rental agreements, including rent payments, security deposits, and deductions for damages. It is built on the Aptos blockchain and allows landlords and tenants to manage their agreements securely through smart contracts.

### Key Features:

- Create rental agreements with specified terms like rent, security deposits, and duration.
- Tenants can make rent payments, and landlords can track them.
- Deductions for damages can be proposed by the landlord and approved by the tenant.
- Security deposits are managed within the contract and refunded after deductions are approved.
- View rental agreements and related details such as rent history, deductions, etc.

---

## Module: `my_addrx::RentalAgreement`

### Dependencies:

- **aptos_coin::AptosCoin**: For transferring rent payments and security deposits.
- **signer**: To authorize transactions.
- **vector**: To store multiple rental agreements, payments, and deductions.
- **timestamp**: For managing time-sensitive elements of rental agreements.
- **string::String**: To store textual information such as descriptions of agreements and damages.

### Constants:

- Error codes such as `ERR_RENTAL_NOT_FOUND`, `ERR_UNAUTHORIZED`, `ERR_NO_ACTIVE_RENTALS`, etc., help manage different contract states and validation failures.

### Structs:

- **`RentalAgreement`**: Represents a rental agreement with fields for landlord, tenant, rent, security deposit, duration, payments, and deductions.
- **`RentPayment`**: Tracks the payment history for each rental agreement.
- **`DamageDeduction`**: Logs deductions made for damages during the tenancy.

### Functions:

#### Public Entry Functions:

1. **`init_rental_system(account: &signer)`**: Initializes the rental system. It creates the global rental collection.
2. **`create_rental_agreement(account: &signer, tenant: address, rent_amount: u64, security_deposit: u64, duration_months: u64, agreement_type: String, agreement_description: String)`**: Allows landlords to create a new rental agreement.
3. **`make_security_deposit(account: &signer, rental_id: u64)`**: Tenants can make security deposits locked in the contract.

4. **`pay_rent(account: &signer, rental_id: u64)`**: Allows tenants to pay rent for their active rental agreement.

5. **`propose_deductions(account: &signer, rental_id: u64, deduction_amount: u64, damage_description: String)`**: Landlord proposes deductions for damages.

6. **`approve_deductions(account: &signer, rental_id: u64)`**: Tenant approves the deductions proposed by the landlord.

7. **`refund_security_deposit(account: &signer, rental_id: u64)`**: Refunds the remaining security deposit to the tenant after deductions.

#### View Functions:

1. **`view_all_rentals()`**: Returns all the rental agreements.
2. **`view_rental_by_id(rental_id: u64)`**: Returns a rental agreement by ID.

3. **`view_rentals_by_landlord(landlord: address)`**: Lists all rental agreements created by a specific landlord.

4. **`view_rentals_by_tenant(tenant: address)`**: Lists all rental agreements a tenant is involved in.

5. **`view_active_rentals()`**: Lists all active (non-expired) rental agreements.

6. **`view_rent_payment_history(rental_id: u64)`**: Shows the rent payment history for a specific rental agreement.

7. **`view_deductions(rental_id: u64)`**: Displays the damage deduction history for a rental agreement.

---

## Frontend Instructions

The frontend for this Rental Agreement contract can be built using a React/TypeScript project integrated with the Aptos SDK for blockchain interactions.

### Key Functionalities:

1. **Connect Wallet**:
   - Use the `Petra Wallet` adapter to connect a tenant's or landlord's wallet to the dApp.
2. **Create Rental Agreement**:

   - The landlord can fill in details like tenant address, rent, security deposit, and the contract duration, and submit the form to create a new rental agreement.

3. **Make Security Deposit**:

   - Tenants can view their agreements and make security deposits through the frontend interface.

4. **Pay Rent**:

   - Rent payments can be made directly from the tenant’s wallet. The frontend will calculate and display the due amount and the current rent status.

5. **View Rental Details**:

   - Both tenants and landlords can view details of active and past rental agreements, including payment history and damage deductions.

6. **Propose Deductions**:

   - Landlords can propose deductions for damages, and tenants can view and approve these deductions.

7. **Refund Security Deposit**:
   - Once the rental period is over, the tenant can request a security deposit refund after deductions.

### Tools and Libraries:

- **React (JavaScript/TypeScript)**: Framework for building the frontend UI.
- **Aptos SDK**: To interact with the smart contract on the blockchain.
- **Ant Design**: For UI components such as forms, modals, and buttons.
- **Tailwind CSS**: For responsive styling.

### Sample Pages:

1. **Home Page**:

   - Connect Wallet option.
   - View active agreements.

2. **Create Rental Agreement Page**:

   - Landlord can fill a form with rental agreement details and submit to the blockchain.

3. **View Agreements**:
   - Filter agreements based on the role (tenant or landlord).
   - View all agreements created by a specific landlord or tenant.
4. **Payment Page**:
   - Tenant can view the agreement and pay rent securely using their Aptos wallet.
5. **Deductions Page**:
   - Landlord can propose deductions, and tenant can approve or reject them.

---

## Getting Started:

1. Clone the project repository.
2. Install dependencies: `npm install` or `yarn install`.
3. Start the frontend development server: `npm start` or `yarn start`.
4. Use the Aptos testnet to deploy and interact with the contract.
