module DeFAI_Nexus::AIExecution {
    use DeFAI_Nexus::StrategyManager;
    use DeFAI_Nexus::Oracle;
    use DeFAI_Nexus::RiskManager;
    use DeFAI_Nexus::ExecutionEngine;
    use DeFAI_Nexus::Events;
    use std::vector;
    use std::option;
    
    /// Executes an AI-driven DeFi strategy
    public fun execute(account: &mut DeFAI_Nexus::DeFAINexus::Account, strategy_id: u64) {
        let strategies = &account.strategies;
        let len = vector::length(strategies);
        let mut found = false;
        let mut strategy: StrategyManager::Strategy;
        
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
        
        // Fetch real-time market data
        let market_data = Oracle::get_market_data();
        
        // Risk assessment before execution
        if (!RiskManager::assess_risk(&market_data)) {
            Events::log_event(b"Strategy execution aborted: High risk detected");
            return;
        }
        
        // Execute strategy based on type
        if (strategy.strategy_type == 0) {
            ExecutionEngine::execute_yield_farming(&strategy, &market_data);
            Events::log_event(b"Yield farming strategy executed");
        } else if (strategy.strategy_type == 1) {
            ExecutionEngine::execute_arbitrage(&strategy, &market_data);
            Events::log_event(b"Arbitrage strategy executed");
        } else if (strategy.strategy_type == 2) {
            ExecutionEngine::execute_rebalancing(&strategy, &market_data);
            Events::log_event(b"Rebalancing strategy executed");
        } else if (strategy.strategy_type == 3) {
            ExecutionEngine::execute_liquidity_management(&strategy, &market_data);
            Events::log_event(b"Liquidity management strategy executed");
        } else {
            Events::log_event(b"Strategy execution failed: Unknown strategy type");
        }
    }
}
