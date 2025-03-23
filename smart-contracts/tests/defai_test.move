module DeFAI_Nexus::DeFAITest {
    use std::signer;
    use std::vector;
    use std::assert;
    use DeFAI_Nexus::LiquiditySwarm;
    use DeFAI_Nexus::CrossChainTrade;
    use DeFAI_Nexus::AIExecution;
    use DeFAI_Nexus::Governance;
    use DeFAI_Nexus::PortfolioManager;

    struct TestResult has key, store {
        success: bool,
        message: vector<u8>,
    }

    public fun test_flash_loan(account: &signer) {
        let owner = signer::address_of(account);
        let amount = 1000;

        LiquiditySwarm::execute_flash_loan(account, amount);

        assert!(LiquiditySwarm::verify_flash_loan(owner, amount), b"Flash loan execution failed");

        store_test_result(owner, b"Flash loan test passed");
    }

    public fun test_cross_chain_trade(account: &signer) {
        let owner = signer::address_of(account);
        let asset = b"ETH";
        let amount = 500;
        let source_chain = b"Ethereum";
        let destination_chain = b"Solana";

        CrossChainTrade::execute_cross_chain_trade(account, asset, amount, source_chain, destination_chain);

        let trade_result = CrossChainTrade::get_last_trade_result(owner);
        assert!(trade_result.success, b"Cross-chain trade failed");

        store_test_result(owner, b"Cross-chain trade test passed");
    }

    public fun test_ai_execution(account: &signer) {
        let owner = signer::address_of(account);
        let strategy_id = 1;

        AIExecution::execute(account, strategy_id);

        assert!(AIExecution::is_successful(owner), b"AI Execution failed");

        store_test_result(owner, b"AI execution test passed");
    }

    public fun test_governance(account: &signer) {
        let owner = signer::address_of(account);
        let proposal_id = 101;
        let description = b"Increase staking rewards";

        Governance::create_proposal(account, proposal_id, description);
        Governance::vote(account, proposal_id);

        assert!(Governance::is_approved(proposal_id), b"Governance proposal not approved");

        store_test_result(owner, b"Governance test passed");
    }

    public fun test_portfolio_rebalance(account: &signer) {
        let owner = signer::address_of(account);

        PortfolioManager::rebalance_portfolio(account);

        assert!(PortfolioManager::is_rebalanced(owner), b"Portfolio rebalance failed");

        store_test_result(owner, b"Portfolio rebalance test passed");
    }

    public fun store_test_result(owner: address, message: vector<u8>) acquires TestResult {
        let result = TestResult { success: true, message };
        move_to(&owner, result);
    }

    public fun get_test_result(owner: address): TestResult acquires TestResult {
        borrow_global<TestResult>(owner)
    }
}
