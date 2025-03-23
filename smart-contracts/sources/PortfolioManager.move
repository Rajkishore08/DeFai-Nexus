module DeFAI_Nexus::PortfolioManager {
    use DeFAI_Nexus::YieldAggregator;
    use std::vector;
    use std::signer;
    use std::option;
    use DeFAI_Nexus::Events;

    struct Portfolio has key, store {
        owner: address,
        assets: vector<YieldAggregator::YieldStrategy>,
    }

    public fun initialize_portfolio(account: &signer) {
        let owner = signer::address_of(account);
        move_to(account, Portfolio { owner, assets: vector::empty<YieldAggregator::YieldStrategy>() });
        Events::log_event(b"Portfolio initialized");
    }

    public fun rebalance_portfolio(account: &signer) acquires Portfolio {
        let owner = signer::address_of(account);
        let portfolio = borrow_global_mut<Portfolio>(owner);
        let optimized_allocations = YieldAggregator::optimize_allocation();
        
        portfolio.assets = optimized_allocations;
        Events::log_event(b"Portfolio rebalanced");
    }

    public fun get_portfolio(account: &signer): vector<YieldAggregator::YieldStrategy> acquires Portfolio {
        let owner = signer::address_of(account);
        let portfolio = borrow_global<Portfolio>(owner);
        portfolio.assets
    }

    public fun add_asset(account: &signer, strategy: YieldAggregator::YieldStrategy) acquires Portfolio {
        let owner = signer::address_of(account);
        let portfolio = borrow_global_mut<Portfolio>(owner);
        vector::push_back(&mut portfolio.assets, strategy);
        Events::log_event(b"Asset added to portfolio");
    }

    public fun remove_asset(account: &signer, index: u64) acquires Portfolio {
        let owner = signer::address_of(account);
        let portfolio = borrow_global_mut<Portfolio>(owner);
        if (index < vector::length(&portfolio.assets)) {
            vector::swap_remove(&mut portfolio.assets, index);
            Events::log_event(b"Asset removed from portfolio");
        } else {
            Events::log_event(b"Asset removal failed: Index out of bounds");
        }
    }
}
