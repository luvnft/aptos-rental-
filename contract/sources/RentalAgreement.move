module my_addrx::RentalAgreement {
    use std::coin::{transfer};
    use std::aptos_coin::AptosCoin;
    use std::signer;
    use std::vector;
    use std::timestamp;

    const ERR_RENTAL_NOT_FOUND: u64 = 1;
    const ERR_UNAUTHORIZED: u64 = 2;
    const ERR_NO_ACTIVE_RENTALS: u64 = 3;
    const ERR_ALREADY_INITIALIZED: u64 = 4;
    const ERR_PAYMENT_OVERDUE: u64 = 5;
    const ERR_NOT_TENANT: u64 = 6;
    const ERR_NOT_LANDLORD: u64 = 7;
    const ERR_DEPOSIT_NOT_MADE: u64 = 8;
    const ERR_DEDUCTION_NOT_APPROVED: u64 = 9;
    const ERR_RENTAL_NOT_EXPIRED: u64 = 10;

    const Global_Rental_List: address = @sys_addrx;

    // Struct representing a rental agreement
    struct RentalAgreement has key, store, copy, drop {
        id: u64,
        landlord: address,  // Landlord's address
        tenant: address,    // Tenant's address
        rent_amount: u64,    // Monthly rent amount (APT tokens)
        security_deposit: u64,  // Security deposit amount (APT tokens)
        start_time: u64,     // Rental start time (timestamp in seconds)
        duration_months: u64, // Rental period in months
        rent_paid_until: u64,  // Timestamp until which rent has been paid
        deposit_locked: bool,  // Whether the security deposit is locked
        deductions: u64,     // Total deductions for damages
        tenant_agreed_deductions: bool, // Has the tenant agreed to deductions?
        landlord_proposed_deductions: bool, // Has the landlord proposed deductions?
    }

    // Global struct representing the collection of rental agreements
    struct GlobalRentalCollection has key, store, copy, drop {
        rentals: vector<RentalAgreement>,
        last_rental_id: u64,  // Tracks the last used rental ID
    }

    // Initialize the global rental system (only called once)
    public entry fun init_rental_system(account: &signer) {
        let global_address = Global_Rental_List;

        if (exists<GlobalRentalCollection>(global_address)) {
            abort(ERR_ALREADY_INITIALIZED)
        };

        let rental_collection = GlobalRentalCollection {
            rentals: vector::empty<RentalAgreement>(),
            last_rental_id: 1000,
        };

        move_to(account, rental_collection);
    }

    // Landlord creates a new rental agreement
    public entry fun create_rental_agreement(
        account: &signer,
        tenant: address,
        rent_amount: u64,
        security_deposit: u64,
        duration_months: u64
    ) acquires GlobalRentalCollection {
        let landlord_address = signer::address_of(account);
        let global_address = Global_Rental_List;

        assert!(exists<GlobalRentalCollection>(global_address), ERR_NO_ACTIVE_RENTALS);

        let collection_ref = borrow_global_mut<GlobalRentalCollection>(global_address);

        let rental_id = collection_ref.last_rental_id + 1;
        let start_time = timestamp::now_seconds();

        let new_rental = RentalAgreement {
            id: rental_id,
            landlord: landlord_address,
            tenant: tenant,
            rent_amount: rent_amount,
            security_deposit: security_deposit,
            start_time: start_time,
            duration_months: duration_months,
            rent_paid_until: start_time,  // Initially, no rent is paid
            deposit_locked: false,
            deductions: 0,
            tenant_agreed_deductions: false,
            landlord_proposed_deductions: false,
        };

        vector::push_back(&mut collection_ref.rentals, new_rental);
        collection_ref.last_rental_id = rental_id;
    }

    // Tenant makes a security deposit
    public entry fun make_security_deposit(
        account: &signer,
        rental_id: u64
    ) acquires GlobalRentalCollection {
        let tenant_address = signer::address_of(account);
        let global_address = Global_Rental_List;

        assert!(exists<GlobalRentalCollection>(global_address), ERR_NO_ACTIVE_RENTALS);

        let collection_ref = borrow_global_mut<GlobalRentalCollection>(global_address);
        let rentals_len = vector::length(&collection_ref.rentals);
        let i = 0;

        while (i < rentals_len) {
            let rental_ref = vector::borrow_mut(&mut collection_ref.rentals, i);
            if (rental_ref.id == rental_id) {
                // Ensure that the caller is the tenant
                assert!(rental_ref.tenant == tenant_address, ERR_UNAUTHORIZED);

                // Ensure the deposit has not been made yet
                assert!(!rental_ref.deposit_locked, ERR_DEPOSIT_NOT_MADE);

                // Lock the security deposit in the contract (hold in landlord's custody or escrow)
                transfer<AptosCoin>(account, rental_ref.landlord, rental_ref.security_deposit);
                rental_ref.deposit_locked = true;
                return
            };
            i = i + 1;
        };
        abort(ERR_RENTAL_NOT_FOUND)
    }

    // Tenant makes a rent payment
    public entry fun pay_rent(
        account: &signer,
        rental_id: u64
    ) acquires GlobalRentalCollection {
        let tenant_address = signer::address_of(account);
        let global_address = Global_Rental_List;

        assert!(exists<GlobalRentalCollection>(global_address), ERR_NO_ACTIVE_RENTALS);

        let collection_ref = borrow_global_mut<GlobalRentalCollection>(global_address);
        let rentals_len = vector::length(&collection_ref.rentals);
        let i = 0;

        while (i < rentals_len) {
            let rental_ref = vector::borrow_mut(&mut collection_ref.rentals, i);
            if (rental_ref.id == rental_id) {
                // Ensure that the caller is the tenant
                assert!(rental_ref.tenant == tenant_address, ERR_UNAUTHORIZED);

                let current_time = timestamp::now_seconds();

                // Ensure that the tenant is not trying to pay rent for a period already covered
                assert!(current_time > rental_ref.rent_paid_until, ERR_PAYMENT_OVERDUE);

                // Pay the rent
                transfer<AptosCoin>(account, rental_ref.landlord, rental_ref.rent_amount);
                rental_ref.rent_paid_until = current_time + 30 * 24 * 60 * 60;  // Add one month (in seconds)
                return
            };
            i = i + 1;
        };
        abort(ERR_RENTAL_NOT_FOUND)
    }

    // Landlord proposes deductions for damages
    public entry fun propose_deductions(
        account: &signer,
        rental_id: u64,
        deduction_amount: u64
    ) acquires GlobalRentalCollection {
        let landlord_address = signer::address_of(account);
        let global_address = Global_Rental_List;

        assert!(exists<GlobalRentalCollection>(global_address), ERR_NO_ACTIVE_RENTALS);

        let collection_ref = borrow_global_mut<GlobalRentalCollection>(global_address);
        let rentals_len = vector::length(&collection_ref.rentals);
        let i = 0;

        while (i < rentals_len) {
            let rental_ref = vector::borrow_mut(&mut collection_ref.rentals, i);
            if (rental_ref.id == rental_id) {
                // Ensure that the caller is the landlord
                assert!(rental_ref.landlord == landlord_address, ERR_UNAUTHORIZED);

                // Propose deductions for damages
                rental_ref.deductions = deduction_amount;
                rental_ref.landlord_proposed_deductions = true;
                return
            };
            i = i + 1;
        };
        abort(ERR_RENTAL_NOT_FOUND)
    }

    // Tenant approves the proposed deductions
    public entry fun approve_deductions(
        account: &signer,
        rental_id: u64
    ) acquires GlobalRentalCollection {
        let tenant_address = signer::address_of(account);
        let global_address = Global_Rental_List;

        assert!(exists<GlobalRentalCollection>(global_address), ERR_NO_ACTIVE_RENTALS);

        let collection_ref = borrow_global_mut<GlobalRentalCollection>(global_address);
        let rentals_len = vector::length(&collection_ref.rentals);
        let i = 0;

        while (i < rentals_len) {
            let rental_ref = vector::borrow_mut(&mut collection_ref.rentals, i);
            if (rental_ref.id == rental_id) {
                // Ensure that the caller is the tenant
                assert!(rental_ref.tenant == tenant_address, ERR_UNAUTHORIZED);

                // Ensure the landlord has proposed deductions
                assert!(rental_ref.landlord_proposed_deductions, ERR_DEDUCTION_NOT_APPROVED);

                // Approve deductions
                rental_ref.tenant_agreed_deductions = true;
                return
            };
            i = i + 1;
        };
        abort(ERR_RENTAL_NOT_FOUND)
    }

    // Refund the remaining security deposit to the tenant after resolving damages
        // Refund the remaining security deposit to the tenant after resolving damages
    public entry fun refund_security_deposit(
        account: &signer,
        rental_id: u64
    ) acquires GlobalRentalCollection {
        let caller = signer::address_of(account);  // Get the caller's address
        let global_address = Global_Rental_List;

        assert!(exists<GlobalRentalCollection>(global_address), ERR_NO_ACTIVE_RENTALS);

        let collection_ref = borrow_global_mut<GlobalRentalCollection>(global_address);
        let rentals_len = vector::length(&collection_ref.rentals);
        let i = 0;

        while (i < rentals_len) {
            let rental_ref = vector::borrow_mut(&mut collection_ref.rentals, i);

            if (rental_ref.id == rental_id) {
                // Ensure that the rental period is over (rental has expired)
                let current_time = timestamp::now_seconds();
                let end_time = rental_ref.start_time + rental_ref.duration_months * 30 * 24 * 60 * 60;
                assert!(current_time >= end_time, ERR_RENTAL_NOT_EXPIRED);

                // Ensure that the tenant has agreed to any proposed deductions
                assert!(rental_ref.tenant_agreed_deductions, ERR_DEDUCTION_NOT_APPROVED);

                // Ensure that either the landlord or tenant is calling this function
                assert!(rental_ref.landlord == caller || rental_ref.tenant == caller, ERR_UNAUTHORIZED);

                // Refund the remaining deposit to the tenant after deductions
                let refund_amount = rental_ref.security_deposit - rental_ref.deductions;
                
                // Transfer refund to the tenant
                transfer<AptosCoin>(account, rental_ref.tenant, refund_amount);

                // Mark the agreement as completed by removing deposit lock
                rental_ref.deposit_locked = false;

                return
            };
            i = i + 1;
        };

        // If no rental found with the given ID, abort
        abort(ERR_RENTAL_NOT_FOUND)
    }

    // View all rental agreements
    #[view]
    public fun view_all_rentals(): vector<RentalAgreement> acquires GlobalRentalCollection {
        let global_address = Global_Rental_List;
        assert!(exists<GlobalRentalCollection>(global_address), ERR_NO_ACTIVE_RENTALS);

        let collection_ref = borrow_global<GlobalRentalCollection>(global_address);
        collection_ref.rentals
    }

    // View a specific rental agreement by ID
    #[view]
    public fun view_rental_by_id(rental_id: u64): RentalAgreement acquires GlobalRentalCollection {
        let global_address = Global_Rental_List;
        assert!(exists<GlobalRentalCollection>(global_address), ERR_NO_ACTIVE_RENTALS);

        let collection_ref = borrow_global<GlobalRentalCollection>(global_address);
        let rentals_len = vector::length(&collection_ref.rentals);
        let i = 0;
        
        while (i < rentals_len) {
            let rental_ref = vector::borrow(&collection_ref.rentals, i);
            if (rental_ref.id == rental_id) {
                return *rental_ref
            };
            i = i + 1;
        };
        abort(ERR_RENTAL_NOT_FOUND)
    }

     // View all rental agreements by a specific landlord
    #[view]
    public fun view_rentals_by_landlord(landlord: address): vector<RentalAgreement> acquires GlobalRentalCollection {
        let global_address = Global_Rental_List;
        assert!(exists<GlobalRentalCollection>(global_address), ERR_NO_ACTIVE_RENTALS);

        let collection_ref = borrow_global<GlobalRentalCollection>(global_address);
        let result = vector::empty<RentalAgreement>();

        let rentals_len = vector::length(&collection_ref.rentals);
        let i = 0;

        while (i < rentals_len) {
            let rental_ref = vector::borrow(&collection_ref.rentals, i);
            if (rental_ref.landlord == landlord) {
                vector::push_back(&mut result, *rental_ref);
            };
            i = i + 1;
        };
        result
    }

    // View all rental agreements by a specific tenant
    #[view]
    public fun view_rentals_by_tenant(tenant: address): vector<RentalAgreement> acquires GlobalRentalCollection {
        let global_address = Global_Rental_List;
        assert!(exists<GlobalRentalCollection>(global_address), ERR_NO_ACTIVE_RENTALS);

        let collection_ref = borrow_global<GlobalRentalCollection>(global_address);
        let result = vector::empty<RentalAgreement>();

        let rentals_len = vector::length(&collection_ref.rentals);
        let i = 0;

        while (i < rentals_len) {
            let rental_ref = vector::borrow(&collection_ref.rentals, i);
            if (rental_ref.tenant == tenant) {
                vector::push_back(&mut result, *rental_ref);
            };
            i = i + 1;
        };
        result
    }

    // View all currently active rental agreements (not yet expired)
    #[view]
    public fun view_active_rentals(): vector<RentalAgreement> acquires GlobalRentalCollection {
        let global_address = Global_Rental_List;
        assert!(exists<GlobalRentalCollection>(global_address), ERR_NO_ACTIVE_RENTALS);

        let collection_ref = borrow_global<GlobalRentalCollection>(global_address);
        let result = vector::empty<RentalAgreement>();

        let rentals_len = vector::length(&collection_ref.rentals);
        let i = 0;
        let current_time = timestamp::now_seconds();

        while (i < rentals_len) {
            let rental_ref = vector::borrow(&collection_ref.rentals, i);
            let end_time = rental_ref.start_time + rental_ref.duration_months * 30 * 24 * 60 * 60;

            if (current_time < end_time) {
                vector::push_back(&mut result, *rental_ref);
            };
            i = i + 1;
        };
        result
    }
}
