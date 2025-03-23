module DeFAI_Nexus::StrategyTest {
    use std::signer;
    use std::vector;
    use std::assert;
    use DeFAI_Nexus::IStrategy;
    use DeFAI_Nexus::AIExecution;
    use DeFAI_Nexus::PortfolioManager;
    use DeFAI_Nexus::PerformanceTracker;

    struct StrategyTestResult has key, store {
        strategy_id: u64,
        success: bool,
        message: vector<u8>,
    }

    public fun test_strategy_execution(account: &signer, strategy_id: u64) {
        let owner = signer::address_of(account);

        IStrategy::execute_strategy(strategy_id);

        assert!(AIExecution::is_successful(owner), b"Strategy execution failed");

        store_test_result(owner, strategy_id, b"Strategy execution test passed");
    }

    public fun test_portfolio_strategy(account: &signer, strategy_id: u64) {
        let owner = signer::address_of(account);

        PortfolioManager::apply_strategy(account, strategy_id);

        assert!(PortfolioManager::is_rebalanced(owner), b"Portfolio strategy failed");

        store_test_result(owner, strategy_id, b"Portfolio strategy test passed");
    }

    public fun test_performance_tracking(account: &signer, strategy_id: u64) {
        let owner = signer::address_of(account);

        let performance = PerformanceTracker::get_strategy_performance(owner, strategy_id);

        assert!(performance.success, b"Performance tracking failed");

        store_test_result(owner, strategy_id, b"Performance tracking test passed");
    }

    public fun store_test_result(owner: address, strategy_id: u64, message: vector<u8>) acquires StrategyTestResult {
        let result = StrategyTestResult { strategy_id, success: true, message };
        move_to(&owner, result);
    }

    public fun get_test_result(owner: address, strategy_id: u64): StrategyTestResult acquires StrategyTestResult {
        borrow_global<StrategyTestResult>(owner)
    }
}
