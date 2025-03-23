module DeFAI_Nexus::YieldAggregator {
    use std::vector;
    use DeFAI_Nexus::Oracle;
    use DeFAI_Nexus::Events;

    struct YieldStrategy has copy, drop, store {
        protocol: vector<u8>,
        allocation: u64,
        apy: u64,
    }

    struct Portfolio has key, store {
        owner: address,
        strategies: vector<YieldStrategy>,
    }

    public fun initialize_portfolio(account: &signer) {
        let owner = signer::address_of(account);
        move_to(account, Portfolio { owner, strategies: vector::empty<YieldStrategy>() });
    }

    public fun optimize_allocation(account: &signer) acquires Portfolio {
        let owner = signer::address_of(account);
        let portfolio = borrow_global_mut<Portfolio>(owner);
        let market_data = Oracle::get_market_data();
        
        let new_strategies = vector::empty<YieldStrategy>();
        
        let protocol_1 = YieldStrategy { protocol: b"Aave", allocation: 50, apy: market_data.aave_apy };
        let protocol_2 = YieldStrategy { protocol: b"Compound", allocation: 50, apy: market_data.compound_apy };
        
        vector::push_back(&mut new_strategies, protocol_1);
        vector::push_back(&mut new_strategies, protocol_2);
        
        portfolio.strategies = new_strategies;
        Events::log_event(b"Yield allocation optimized");
    }
    
    public fun get_portfolio(account: &signer): vector<YieldStrategy> acquires Portfolio {
        let owner = signer::address_of(account);
        let portfolio = borrow_global<Portfolio>(owner);
        portfolio.strategies
    }
    
    public fun update_strategy(account: &signer, protocol: vector<u8>, new_allocation: u64) acquires Portfolio {
        let owner = signer::address_of(account);
        let portfolio = borrow_global_mut<Portfolio>(owner);
        let len = vector::length(&portfolio.strategies);
        
        let mut i = 0;
        while (i < len) {
            let strategy_ref = &vector::borrow_mut(&mut portfolio.strategies, i);
            if (strategy_ref.protocol == protocol) {
                strategy_ref.allocation = new_allocation;
                Events::log_event(b"Strategy updated");
                return;
            }
            i = i + 1;
        }
    }
}
