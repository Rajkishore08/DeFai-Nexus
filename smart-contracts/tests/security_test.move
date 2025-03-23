module DeFAI_Nexus::SecurityTest {
    use std::signer;
    use std::vector;
    use std::assert;
    use DeFAI_Nexus::SecurityManager;
    use DeFAI_Nexus::AccessControl;
    use DeFAI_Nexus::TransactionValidator;
    use DeFAI_Nexus::Events;

    struct SecurityTestResult has key, store {
        test_id: u64,
        success: bool,
        message: vector<u8>,
    }

    public fun test_fraud_detection(account: &signer, test_id: u64, transaction: vector<u8>) {
        let owner = signer::address_of(account);
        let fraud_detected = SecurityManager::detect_fraud(transaction);

        assert!(!fraud_detected, b"Fraud detection test failed");

        store_test_result(owner, test_id, b"Fraud detection test passed");
    }

    public fun test_access_control(account: &signer, test_id: u64, user: address) {
        let owner = signer::address_of(account);
        let has_access = AccessControl::has_permission(user);

        assert!(has_access, b"Access control test failed");

        store_test_result(owner, test_id, b"Access control test passed");
    }

    public fun test_transaction_validation(account: &signer, test_id: u64, tx_hash: vector<u8>) {
        let owner = signer::address_of(account);
        let is_valid = TransactionValidator::validate_transaction(tx_hash);

        assert!(is_valid, b"Transaction validation test failed");

        store_test_result(owner, test_id, b"Transaction validation test passed");
    }

    public fun store_test_result(owner: address, test_id: u64, message: vector<u8>) acquires SecurityTestResult {
        let result = SecurityTestResult { test_id, success: true, message };
        move_to(&owner, result);
    }

    public fun get_test_result(owner: address, test_id: u64): SecurityTestResult acquires SecurityTestResult {
        borrow_global<SecurityTestResult>(owner)
    }
}
