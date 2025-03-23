module DeFAI_Nexus::Oracle {
    use std::vector;
    use std::signer;
    use std::map;
    use std::option;

    struct PriceData has copy, drop, store {
        asset: vector<u8>,
        price: u64,
        timestamp: u64,
    }

    struct Oracle has key, store {
        owner: address,
        prices: map<vector<u8>, PriceData>,
    }

    public fun initialize_oracle(account: &signer) {
        let owner = signer::address_of(account);
        move_to(account, Oracle { owner, prices: map::new<vector<u8>, PriceData>() });
    }

    public fun update_price(account: &signer, asset: vector<u8>, price: u64, timestamp: u64) acquires Oracle {
        let owner = signer::address_of(account);
        let oracle = borrow_global_mut<Oracle>(owner);
        let price_data = PriceData { asset: asset, price: price, timestamp: timestamp };
        map::insert(&mut oracle.prices, asset, price_data);
    }

    public fun get_price(asset: vector<u8>): option::Option<PriceData> acquires Oracle {
        let oracle = borrow_global<Oracle>(signer::address_of(&signer::borrow()));
        map::get(&oracle.prices, asset)
    }
}
