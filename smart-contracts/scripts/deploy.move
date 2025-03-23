script {
    use std::signer;
    use DeFAI_Nexus::DeFAINexus;
    use DeFAI_Nexus::Oracle;
    use DeFAI_Nexus::StrategyManager;
    use DeFAI_Nexus::RiskManager;
    use DeFAI_Nexus::YieldAggregator;
    use DeFAI_Nexus::AIOracle;
    use DeFAI_Nexus::Governance;
    use DeFAI_Nexus::Events;
    use DeFAI_Nexus::SecurityManager;
    use DeFAI_Nexus::LiquiditySwarm;
    use DeFAI_Nexus::CrossChainExecutor;

    /// Fully initializes the DeFAI Nexus system
    public fun main(account: &signer) {
        let owner = signer::address_of(account);

      
        DeFAINexus::create_account(account);


        Oracle::initialize_oracle(account);
        StrategyManager::initialize_strategy_manager(account);
        RiskManager::initialize_risk_manager(account);
        YieldAggregator::initialize_yield_aggregator(account);
        AIOracle::initialize_oracle(account);
        Governance::initialize_governance(account);
        Events::initialize_event_log(account);
        SecurityManager::initialize_security_system(account);
        LiquiditySwarm::initialize_liquidity_swarm(account);
        CrossChainExecutor::initialize_cross_chain_executor(account);

      
        Events::log_event(account, b"DeFAI Nexus Initialized");

        
        assert!(DeFAINexus::is_initialized(owner), b"Initialization failed");
    }
}
