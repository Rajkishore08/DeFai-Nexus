module 0x1::FlashLoan {

    use std::signer;
    use std::coin::{Coin, withdraw, deposit};
    use std::error;
    use std::event;
    use std::vector;

    const FLASH_LOAN_FEE_PERCENT: u64 = 1; // 1% fee

    struct FlashLoanEvent has copy, drop, store {
        borrower: address,
        amount: u64,
        fee: u64,
    }

    struct LoanReceipt has key {
        amount: u64,
        fee: u64,
    }

    struct FlashLoanCapability has key {
        dummy_field: bool,
    }

    public fun initialize(account: &signer) {
        let account_addr = signer::address_of(account);
        if (!exists<FlashLoanCapability>(account_addr)) {
            move_to(account, FlashLoanCapability { dummy_field: true });
        }
    }

    public fun flash_loan<T: store>(
        account: &signer,
        amount: u64,
        execute: &vector<u8>
    ) acquires FlashLoanCapability {
        let account_addr = signer::address_of(account);
        assert!(exists<FlashLoanCapability>(account_addr), error::permission_denied(0));

        let fee = (amount * FLASH_LOAN_FEE_PERCENT) / 100;
        let total_repayment = amount + fee;

        let loan_coins = withdraw<T>(account, amount);
        let receipt = LoanReceipt { amount: amount, fee: fee };

        // Execute the provided function
        let result = [execute](loan_coins, &receipt);

        // Ensure the loan is repaid
        let repayment_coins = result[0];
        let returned_amount = repayment_coins.value;
        assert!(returned_amount >= total_repayment, error::invalid_argument(1));

        deposit<T>(account, repayment_coins);

        // Emit event
        let event_handle = event::new_event_handle<FlashLoanEvent>(account);
        event::emit_event(
            &event_handle,
            FlashLoanEvent {
                borrower: account_addr,
                amount: amount,
                fee: fee,
            },
        );
    }
}
