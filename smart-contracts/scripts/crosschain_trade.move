module DeFAI_Nexus::CrossChainTrade {
    use std::signer;
    use std::vector;
    use std::assert;
    use DeFAI_Nexus::BridgeProtocol;
    use DeFAI_Nexus::DEX;
    use DeFAI_Nexus::AssetManager;
    use DeFAI_Nexus::Events;

    struct TradeResult has key, store {
        success: bool,
        profit: u64,
        source_chain: vector<u8>,
        destination_chain: vector<u8>,
    }

    public fun execute_cross_chain_trade(account: &signer, asset: vector<u8>, amount: u64, source_chain: vector<u8>, destination_chain: vector<u8>) {
        let owner = signer::address_of(account);

        assert!(BridgeProtocol::can_transfer(source_chain, destination_chain, asset, amount), b"Insufficient liquidity for cross-chain transfer");

        BridgeProtocol::transfer_asset(account, asset, amount, source_chain, destination_chain);

        let price_source = DEX::get_price(source_chain, asset);
        let price_destination = DEX::get_price(destination_chain, asset);

        assert!(price_source > 0 && price_destination > 0, b"Invalid asset prices from DEXs");

        let mut profit = 0;
        let mut success = false;

        if (price_source < price_destination) {
            let amount_received = DEX::swap(account, destination_chain, asset, amount);
            profit = amount_received - amount;
        }

        if (profit > 0) {
            success = true;
            AssetManager::update_assets(owner);
        }

        let log_message = if success {
            b"Cross-chain trade executed successfully with profit"
        } else {
            b"Cross-chain trade execution failed"
        };

        Events::log_event(account, log_message);

        let result = TradeResult {
            success,
            profit,
            source_chain,
            destination_chain,
        };

        store_trade_result(owner, result);
    }

    public fun store_trade_result(owner: address, result: TradeResult) acquires TradeResult {
        move_to(&owner, result);
    }

    public fun get_last_trade_result(owner: address): TradeResult acquires TradeResult {
        borrow_global<TradeResult>(owner)
    }
}
