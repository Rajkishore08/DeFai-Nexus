module DeFAI_Nexus::StrategyManager {
    use std::vector;
    use std::signer;
    use std::option;
    use DeFAI_Nexus::Events;
    use DeFAI_Nexus::AIExecution;
    use DeFAI_Nexus::RiskManager;
    use DeFAI_Nexus::Oracle;
    use DeFAI_Nexus::CrossChainExecutor;

    /// Defines different DeFi strategies
    struct Strategy has copy, drop, store {
        id: u64,
        name: vector<u8>,
        parameters: vector<u8>,
        strategy_type: u8, // 0: Yield Farming, 1: Arbitrage, 2: Rebalancing, 3: Liquidity Management
    }

    /// Stores all strategies created within the system
    struct StrategyBook has key, store {
        owner: address,
        strategies: vector<Strategy>,
    }

    /// Initializes the StrategyBook for the signer
    public fun initialize_strategy_book(account: &signer) {
        let owner = signer::address_of(account);
        move_to(account, StrategyBook { owner, strategies: vector::empty<Strategy>() });
    }

    /// Creates a new DeFi strategy
    public fun create_strategy(id: u64, name: vector<u8>, parameters: vector<u8>, strategy_type: u8): Strategy {
        Strategy { id, name, parameters, strategy_type }
    }

    /// Adds a new strategy to the user's strategy book
    public fun add_strategy(account: &signer, id: u64, name: vector<u8>, parameters: vector<u8>, strategy_type: u8) acquires StrategyBook {
        let owner = signer::address_of(account);
        let strategy_book = borrow_global_mut<StrategyBook>(owner);
        let new_strategy = Strategy { id, name, parameters, strategy_type };
        vector::push_back(&mut strategy_book.strategies, new_strategy);
        Events::log_event(b"New strategy added");
    }

    /// Executes a strategy by ID with AI & Risk Checks
    public fun execute_strategy(account: &signer, strategy_id: u64) acquires StrategyBook {
        let owner = signer::address_of(account);
        let strategy_book = borrow_global<StrategyBook>(owner);
        let strategies = &strategy_book.strategies;
        let len = vector::length(strategies);
        let mut found = false;
        let mut strategy: Strategy;

        let mut i = 0;
        while (i < len) {
            let strategy_ref = &vector::borrow(strategies, i);
            if (strategy_ref.id == strategy_id) {
                strategy = *strategy_ref;
                found = true;
                break;
            }
            i = i + 1;
        }

        if (!found) {
            Events::log_event(b"Strategy execution failed: Not found");
            return;
        }

        // Fetch market conditions
        let market_data = Oracle::get_market_data();

        // Risk assessment before execution
        if (!RiskManager::assess_risk(&market_data)) {
            Events::log_event(b"Execution halted: High risk");
            return;
        }

        // AI-driven execution based on strategy type
        if (strategy.strategy_type == 0) {
            AIExecution::execute_yield_farming(&strategy);
        } else if (strategy.strategy_type == 1) {
            AIExecution::execute_arbitrage(&strategy);
        } else if (strategy.strategy_type == 2) {
            AIExecution::execute_rebalancing(&strategy);
        } else if (strategy.strategy_type == 3) {
            AIExecution::execute_liquidity_management(&strategy);
        }
        Events::log_event(b"Strategy executed successfully");
    }

    /// Executes a cross-chain strategy
    public fun execute_cross_chain_strategy(account: &signer, strategy_id: u64) acquires StrategyBook {
        let owner = signer::address_of(account);
        let strategy_book = borrow_global<StrategyBook>(owner);
        let strategies = &strategy_book.strategies;
        let len = vector::length(strategies);
        let mut found = false;
        let mut strategy: Strategy;

        let mut i = 0;
        while (i < len) {
            let strategy_ref = &vector::borrow(strategies, i);
            if (strategy_ref.id == strategy_id) {
                strategy = *strategy_ref;
                found = true;
                break;
            }
            i = i + 1;
        }

        if (!found) {
            Events::log_event(b"Cross-chain strategy execution failed: Not found");
            return;
        }

        // Execute using cross-chain module
        CrossChainExecutor::execute(&strategy);
        Events::log_event(b"Cross-chain strategy executed successfully");
    }

    /// Removes a strategy from the StrategyBook
    public fun remove_strategy(account: &signer, strategy_id: u64) acquires StrategyBook {
        let owner = signer::address_of(account);
        let strategy_book = borrow_global_mut<StrategyBook>(owner);
        let len = vector::length(&strategy_book.strategies);
        
        let mut i = 0;
        while (i < len) {
            let strategy_ref = &vector::borrow(&strategy_book.strategies, i);
            if (strategy_ref.id == strategy_id) {
                vector::swap_remove(&mut strategy_book.strategies, i);
                Events::log_event(b"Strategy removed");
                return;
            }
            i = i + 1;
        }
        Events::log_event(b"Strategy removal failed: Not found");
    }
}
