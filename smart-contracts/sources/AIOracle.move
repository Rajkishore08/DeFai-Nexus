module DeFAI_Nexus::AIOracle {
    use std::vector;
    use std::signer;
    use std::math;
    use std::option;
    use std::timestamp;

    struct Prediction has key, store {
        asset: vector<u8>,
        predicted_price: u64,
        confidence: u8, // Confidence level in percentage (0-100)
        timestamp: u64, // Time of prediction (block time)
    }

    struct AIOracleState has key, store {
        owner: address,
        predictions: vector<Prediction>,
    }

    /// Initializes AI Oracle State
    public fun initialize_oracle(account: &signer) {
        let owner = signer::address_of(account);
        move_to(account, AIOracleState {
            owner,
            predictions: vector::empty<Prediction>(),
        });
    }

    /// AI-driven price prediction based on historical and real-time market data
    public fun generate_prediction(account: &signer, asset: vector<u8>, market_price: u64) acquires AIOracleState {
        let state = borrow_global_mut<AIOracleState>(signer::address_of(account));

        // Simulate AI model for price prediction
        let adjustment = math::max(1, market_price / 20); // Ensure adjustment is at least 1
        let predicted_price = if (market_price % 2 == 0) { 
            market_price + adjustment 
        } else { 
            market_price - adjustment 
        };

        let confidence = 85 + (market_price % 6) as u8; // Simulated confidence between 85-90%
        let timestamp = timestamp::now_seconds(); // Blockchain timestamp for accuracy

        let prediction = Prediction {
            asset,
            predicted_price,
            confidence,
            timestamp,
        };

        vector::push_back(&mut state.predictions, prediction);
    }

    /// Retrieves the latest AI prediction for an asset
    public fun get_latest_prediction(account: &signer, asset: vector<u8>) acquires AIOracleState: option::Option<Prediction> {
        let state = borrow_global<AIOracleState>(signer::address_of(account));

        let mut latest_prediction: option::Option<Prediction> = option::none<Prediction>();
        let mut i = 0;
        while (i < vector::length(&state.predictions)) {
            let p = vector::borrow(&state.predictions, i);
            if (p.asset == asset) {
                latest_prediction = option::some(*p);
            }
            i = i + 1;
        }
        latest_prediction
    }

    /// Clears old predictions from the Oracle state
    public fun clear_predictions(account: &signer) acquires AIOracleState {
        let state = borrow_global_mut<AIOracleState>(signer::address_of(account));
        state.predictions = vector::empty<Prediction>();
    }

    /// Fetches all stored predictions
    public fun get_all_predictions(account: &signer) acquires AIOracleState: vector<Prediction> {
        let state = borrow_global<AIOracleState>(signer::address_of(account));
        state.predictions
    }
}
