module DeFAI_Nexus::FlashLoanArbitrage {
    use std::signer;
    use std::vector;
    use std::assert;
    use std::math;
    use DeFAI_Nexus::LendingProtocol;
    use DeFAI_Nexus::DEX;
    use DeFAI_Nexus::AssetManager;
    use DeFAI_Nexus::Events;

    struct ArbitrageResult has key, store {
        profit: u64,
        success: bool,
    }

    public fun execute_flashloan_arbitrage(account: &signer, asset: vector<u8>, loan_amount: u64, dex1: address, dex2: address) {
        let owner = signer::address_of(account);

        assert!(LendingProtocol::can_borrow(asset, loan_amount), b"Insufficient liquidity for flash loan");

        LendingProtocol::borrow_flash_loan(account, asset, loan_amount);

        let price_dex1 = DEX::get_price(dex1, asset);
        let price_dex2 = DEX::get_price(dex2, asset);

        assert!(price_dex1 > 0 && price_dex2 > 0, b"Invalid asset prices from DEXs");

        let mut profit = 0;
        let mut success = false;

        if (price_dex1 < price_dex2) {
            let amount_bought = DEX::swap(account, dex1, asset, loan_amount);
            let amount_sold = DEX::swap(account, dex2, asset, amount_bought);
            profit = amount_sold - loan_amount;
        } else if (price_dex2 < price_dex1) {
            let amount_bought = DEX::swap(account, dex2, asset, loan_amount);
            let amount_sold = DEX::swap(account, dex1, asset, amount_bought);
            profit = amount_sold - loan_amount;
        }

        if (profit > 0) {
            success = true;
            assert!(LendingProtocol::repay_flash_loan(account, asset, loan_amount), b"Flash loan repayment failed");
            AssetManager::update_assets(owner);
        }

        let log_message = if success {
            b"Arbitrage executed successfully with profit"
        } else {
            b"Arbitrage execution failed"
        };

        Events::log_event(account, log_message);

        let result = ArbitrageResult { profit, success };
        store_arbitrage_result(owner, result);
    }

    public fun store_arbitrage_result(owner: address, result: ArbitrageResult) acquires ArbitrageResult {
        move_to(&owner, result);
    }

    public fun get_last_arbitrage_result(owner: address): ArbitrageResult acquires ArbitrageResult {
        borrow_global<ArbitrageResult>(owner)
    }
}
