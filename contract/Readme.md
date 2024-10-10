# Rental Agreement Smart Contract - README

## Overview

The **Rental Agreement Smart Contract** is designed to facilitate secure and transparent rental agreements between landlords and tenants on the Aptos blockchain. The contract enables the creation, management, and completion of rental agreements while handling rental payments, security deposits, and damage deductions.

## Features

1. **Create Rental Agreements**: Landlords can create rental agreements with tenants specifying rent, security deposits, and rental duration.
2. **Rent Payments**: Tenants can pay rent directly through the contract, with payments recorded and history maintained.
3. **Security Deposits**: Tenants make security deposits at the beginning of the rental period. Deposits are held in the landlord's custody or escrow until the end of the rental period.
4. **Damage Deductions**: Landlords can propose deductions for damages, which must be agreed upon by the tenant before the deposit is refunded.
5. **Refunds**: Once the rental period is over and any damage deductions are settled, the remaining security deposit is refunded to the tenant.
6. **View Functions**: View rental agreements by landlord, tenant, or agreement ID. Also, view rent payment history, deductions, and active rentals.

## Modules and Data Structures

### Data Structures

- **RentalAgreement**: Represents a single rental agreement between a landlord and tenant. Contains rent amount, security deposit, duration, payment history, and deductions.
- **RentPayment**: Stores rent payment details, including amount, payment time, and period.
- **DamageDeduction**: Tracks deductions made for damages along with a description.
- **GlobalRentalCollection**: A global collection of all rental agreements, along with the last used rental ID.

### Error Codes

- `ERR_RENTAL_NOT_FOUND`: Rental agreement with the provided ID was not found.
- `ERR_UNAUTHORIZED`: Unauthorized action attempted by an incorrect user (tenant or landlord).
- `ERR_NO_ACTIVE_RENTALS`: No active rentals available in the system.
- `ERR_ALREADY_INITIALIZED`: The system has already been initialized.
- `ERR_PAYMENT_OVERDUE`: Payment made for a period that has already been covered.
- `ERR_NOT_TENANT`: Caller is not the tenant of the specified rental agreement.
- `ERR_NOT_LANDLORD`: Caller is not the landlord of the specified rental agreement.
- `ERR_DEPOSIT_NOT_MADE`: Security deposit has not been made yet.
- `ERR_DEDUCTION_NOT_APPROVED`: Deductions proposed by the landlord have not been approved by the tenant.
- `ERR_RENTAL_NOT_EXPIRED`: The rental agreement has not yet expired.

## Entry Functions

### `init_rental_system(account: &signer)`

Initializes the global rental system. This function should only be called once by the system admin.

### `create_rental_agreement(account: &signer, tenant: address, rent_amount: u64, security_deposit: u64, duration_months: u64, agreement_type: String, agreement_description: String)`

Creates a new rental agreement between a landlord and tenant. The agreement specifies rent amount, security deposit, and duration.

### `make_security_deposit(account: &signer, rental_id: u64)`

Allows the tenant to make a security deposit for a specified rental agreement. The deposit is locked in the contract for the landlord's custody.

### `pay_rent(account: &signer, rental_id: u64)`

Allows the tenant to make a rent payment. The rent amount is transferred to the landlord, and the payment is recorded.

### `propose_deductions(account: &signer, rental_id: u64, deduction_amount: u64, damage_description: String)`

Allows the landlord to propose deductions from the security deposit for damages, along with a description of the damage.

### `approve_deductions(account: &signer, rental_id: u64)`

Allows the tenant to approve proposed deductions by the landlord. The deposit will not be refunded until these deductions are approved.

### `refund_security_deposit(account: &signer, rental_id: u64)`

Refunds the security deposit to the tenant after deducting any agreed damages. Can be called by either the landlord or tenant once the rental period is over.

## View Functions

These are non-mutating functions that allow viewing the state of the contract:

### `view_all_rentals()`

Returns a list of all rental agreements in the system.

### `view_rental_by_id(rental_id: u64)`

Returns the details of a specific rental agreement by its ID.

### `view_rentals_by_landlord(landlord: address)`

Returns all rental agreements belonging to a specific landlord.

### `view_rentals_by_tenant(tenant: address)`

Returns all rental agreements belonging to a specific tenant.

### `view_active_rentals()`

Returns all currently active (non-expired) rental agreements.

### `view_rent_payment_history(rental_id: u64)`

Returns the payment history for a specific rental agreement.

### `view_deductions(rental_id: u64)`

Returns the deduction history for a specific rental agreement.

## How to Deploy

1. Ensure that the Aptos environment is set up with the appropriate tools and SDK.
2. Compile and deploy the smart contract to the Aptos blockchain using the `move` CLI.
3. Initialize the system by calling the `init_rental_system` function.

## Usage

- **Landlords**: Use the `create_rental_agreement` function to create agreements and `propose_deductions` to manage any damage-related costs.
- **Tenants**: Use `make_security_deposit` to lock deposits and `pay_rent` for monthly payments.
- Both parties can use `refund_security_deposit` at the end of the rental period to return any remaining deposit.

## Future Enhancements

- Multi-signature approval for damage deductions.
- Automated reminders for rent payments.
- Integration with an oracle for dynamic rent adjustments.
