module DeFAI_Nexus::IOracle {
    use std::vector;
    use std::signer;
    use std::option;
    use std::math;

    /// Stores price data for assets
    struct PriceData has key, store {
        asset: vector<u8>,
        price: u64,
        timestamp: u64, // Unix timestamp of last update
    }

    struct OracleState has key, store {
        owner: address,
        prices: vector<PriceData>,
    }

    /// Initializes the Oracle module
    public fun initialize_oracle(account: &signer) {
        let owner = signer::address_of(account);
        move_to(account, OracleState {
            owner,
            prices: vector::empty<PriceData>(),
        });
    }

    /// Updates the price of an asset (Only callable by the owner)
    public fun update_price(account: &signer, asset: vector<u8>, price: u64, timestamp: u64) acquires OracleState {
        let state = borrow_global_mut<OracleState>(signer::address_of(account));

        let mut i = 0;
        let mut found = false;
        while (i < vector::length(&state.prices)) {
            let data = &mut vector::borrow_mut(&mut state.prices, i);
            if (data.asset == asset) {
                data.price = price;
                data.timestamp = timestamp;
                found = true;
            }
            i = i + 1;
        }

        if (!found) {
            let new_price = PriceData { asset, price, timestamp };
            vector::push_back(&mut state.prices, new_price);
        }
    }

    /// Retrieves the latest price of an asset
    public fun get_price(asset: vector<u8>) acquires OracleState: option::Option<PriceData> {
        let state = borrow_global<OracleState>(@0x1); // Replace with Oracle address

        let mut i = 0;
        while (i < vector::length(&state.prices)) {
            let data = vector::borrow(&state.prices, i);
            if (data.asset == asset) {
                return option::some(*data);
            }
            i = i + 1;
        }
        option::none<PriceData>()
    }

    /// Retrieves all stored asset prices
    public fun get_all_prices() acquires OracleState: vector<PriceData> {
        let state = borrow_global<OracleState>(@0x1);
        state.prices
    }
}
