script {
    use std::signer;
    use std::vector;
    use std::string;
    use std::assert;
    use DeFAI_Nexus::PortfolioManager;
    use DeFAI_Nexus::Events;
    use DeFAI_Nexus::AssetManager;

    public fun main(account: &signer) {
        let owner = signer::address_of(account);
        let current_allocations = PortfolioManager::get_portfolio_allocations(owner);
        let optimized_allocations = PortfolioManager::compute_optimized_allocations(current_allocations);
        PortfolioManager::rebalance_portfolio(account, optimized_allocations);
        let event_message = string::utf8(b"Portfolio rebalanced successfully for ");
        let log_message = string::concat(event_message, &string::from_utf8(vector::to_bytes(owner)));
        Events::log_event(account, log_message);
        assert!(PortfolioManager::is_rebalanced(owner), b"Rebalancing failed");
        AssetManager::update_assets(owner);
    }
}
