module DeFAI_Nexus::SecurityManager {
    use std::signer;
    use std::vector;
    use std::math;

    struct FraudPattern has key, store {
        flagged_transactions: vector<vector<u8>>,
        threshold: u64,
    }

    /// Initializes fraud detection system for an account
    public fun initialize_fraud_detection(account: &signer, threshold: u64) {
        let owner = signer::address_of(account);
        move_to(account, FraudPattern { flagged_transactions: vector::empty<vector<u8>>(), threshold });
    }

    /// Detects fraudulent transactions based on anomaly detection
    public fun detect_fraud(account: &signer, transaction: vector<u8>, risk_score: u64) acquires FraudPattern: bool {
        let fraud_data = borrow_global_mut<FraudPattern>(signer::address_of(account));

        if (risk_score > fraud_data.threshold) {
            vector::push_back(&mut fraud_data.flagged_transactions, transaction);
            return true;
        }
        false
    }

    /// Fetches flagged fraudulent transactions
    public fun get_fraudulent_transactions(account: &signer) acquires FraudPattern: vector<vector<u8>> {
        let fraud_data = borrow_global<FraudPattern>(signer::address_of(account));
        fraud_data.flagged_transactions
    }

    /// Adjusts the fraud detection threshold dynamically
    public fun update_threshold(account: &signer, new_threshold: u64) acquires FraudPattern {
        let fraud_data = borrow_global_mut<FraudPattern>(signer::address_of(account));
        fraud_data.threshold = new_threshold;
    }
}
