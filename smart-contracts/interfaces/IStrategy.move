module DeFAI_Nexus::IStrategy {
    use std::vector;
    use std::signer;
    use std::option;

    /// Structure to store strategy details
    struct Strategy has key, store {
        id: u64,
        name: vector<u8>,
        description: vector<u8>,
        active: bool,
    }

    struct StrategyState has key, store {
        owner: address,
        strategies: vector<Strategy>,
    }

    /// Initializes Strategy Management
    public fun initialize_strategy_module(account: &signer) {
        let owner = signer::address_of(account);
        move_to(account, StrategyState {
            owner,
            strategies: vector::empty<Strategy>(),
        });
    }

    /// Creates a new strategy
    public fun create_strategy(account: &signer, id: u64, name: vector<u8>, description: vector<u8>) acquires StrategyState {
        let state = borrow_global_mut<StrategyState>(signer::address_of(account));

        let strategy = Strategy {
            id,
            name,
            description,
            active: true,
        };

        vector::push_back(&mut state.strategies, strategy);
    }

    /// Executes a strategy by ID
    public fun execute_strategy(account: &signer, strategy_id: u64) acquires StrategyState {
        let state = borrow_global_mut<StrategyState>(signer::address_of(account));

        let mut i = 0;
        while (i < vector::length(&state.strategies)) {
            let strategy = &mut vector::borrow_mut(&mut state.strategies, i);
            if (strategy.id == strategy_id && strategy.active) {
                // TODO: Implement actual strategy execution logic
            }
            i = i + 1;
        }
    }

    /// Deactivates a strategy
    public fun deactivate_strategy(account: &signer, strategy_id: u64) acquires StrategyState {
        let state = borrow_global_mut<StrategyState>(signer::address_of(account));

        let mut i = 0;
        while (i < vector::length(&state.strategies)) {
            let strategy = &mut vector::borrow_mut(&mut state.strategies, i);
            if (strategy.id == strategy_id) {
                strategy.active = false;
            }
            i = i + 1;
        }
    }

    /// Retrieves a strategy by ID
    public fun get_strategy(account: &signer, strategy_id: u64) acquires StrategyState: option::Option<Strategy> {
        let state = borrow_global<StrategyState>(signer::address_of(account));

        let mut i = 0;
        while (i < vector::length(&state.strategies)) {
            let strategy = vector::borrow(&state.strategies, i);
            if (strategy.id == strategy_id) {
                return option::some(*strategy);
            }
            i = i + 1;
        }
        option::none<Strategy>()
    }

    /// Fetches all active strategies
    public fun get_all_strategies(account: &signer) acquires StrategyState: vector<Strategy> {
        let state = borrow_global<StrategyState>(signer::address_of(account));
        let mut active_strategies = vector::empty<Strategy>();

        let mut i = 0;
        while (i < vector::length(&state.strategies)) {
            let strategy = vector::borrow(&state.strategies, i);
            if (strategy.active) {
                vector::push_back(&mut active_strategies, *strategy);
            }
            i = i + 1;
        }
        active_strategies
    }
}
