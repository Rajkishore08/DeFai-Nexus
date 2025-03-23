module DeFAI_Nexus::DeFAINexus {
    use std::signer;
    use std::vector;
    use std::option;
    use DeFAI_Nexus::StrategyManager;
    use DeFAI_Nexus::RiskManager;
    use DeFAI_Nexus::PortfolioManager;
    use DeFAI_Nexus::AIExecution;
    use DeFAI_Nexus::Events;

    /// Represents an AI-powered DeFi Smart Account
    struct Account has key, store {
        owner: address,
        strategies: vector<StrategyManager::Strategy>,
        balance: u64,
    }

    /// Initializes an AI-powered DeFi Smart Account for the signer
    public fun create_account(account: &signer) {
        let owner = signer::address_of(account);
        move_to(account, Account { 
            owner, 
            strategies: vector::empty<StrategyManager::Strategy>(), 
            balance: 0 
        });
    }

    /// Deposits funds into the DeFi account
    public fun deposit(account: &signer, amount: u64) {
        let owner = signer::address_of(account);
        let account_ref = borrow_global_mut<Account>(owner);
        account_ref.balance = account_ref.balance + amount;
        Events::log_event(b"Deposit completed");
    }

    /// Withdraws funds from the DeFi account
    public fun withdraw(account: &signer, amount: u64) acquires Account {
        let owner = signer::address_of(account);
        let account_ref = borrow_global_mut<Account>(owner);
        assert!(account_ref.balance >= amount, 1);
        account_ref.balance = account_ref.balance - amount;
        Events::log_event(b"Withdrawal completed");
    }

    /// Adds a new AI-driven strategy to the account
    public fun add_strategy(account: &signer, strategy_id: u64, name: vector<u8>, parameters: vector<u8>) {
        let owner = signer::address_of(account);
        let account_ref = borrow_global_mut<Account>(owner);
        let new_strategy = StrategyManager::create_strategy(strategy_id, name, parameters);
        vector::push_back(&mut account_ref.strategies, new_strategy);
        Events::log_event(b"Strategy added");
    }

    /// Executes an AI-driven strategy
    public fun execute_strategy(account: &signer, strategy_id: u64) {
        let owner = signer::address_of(account);
        let account_ref = borrow_global_mut<Account>(owner);
        AIExecution::execute(account_ref, strategy_id);
        Events::log_event(b"Strategy executed");
    }

    /// Performs AI-based risk assessment before executing a strategy
    public fun execute_with_risk_check(account: &signer, strategy_id: u64) {
        let owner = signer::address_of(account);
        let account_ref = borrow_global_mut<Account>(owner);
        if (RiskManager::assess_risk(account_ref.balance)) {
            AIExecution::execute(account_ref, strategy_id);
            Events::log_event(b"Strategy executed with risk check");
        } else {
            Events::log_event(b"Risk too high, strategy execution halted");
        }
    }

    /// Returns the balance of the AI-powered DeFi Smart Account
    public fun get_balance(account: &signer): u64 acquires Account {
        let owner = signer::address_of(account);
        let account_ref = borrow_global<Account>(owner);
        account_ref.balance
    }

    /// Returns the number of strategies stored in the AI-powered account
    public fun get_strategy_count(account: &signer): u64 acquires Account {
        let owner = signer::address_of(account);
        let account_ref = borrow_global<Account>(owner);
        vector::length(&account_ref.strategies)
    }
}
