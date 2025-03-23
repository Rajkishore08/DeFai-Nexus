module DeFAI_Nexus::IDeFiProtocol {
    use std::vector;
    use std::signer;
    use std::option;
    use std::math;

    /// Defines a DeFi protocol with its essential properties
    struct DeFiProtocol has key, store {
        id: u64,
        name: vector<u8>,
        interaction_type: vector<u8>, // Staking, Lending, Swapping, etc.
        is_active: bool,
    }

    struct ProtocolState has key, store {
        owner: address,
        registered_protocols: vector<DeFiProtocol>,
    }

    /// Initializes the DeFi Protocol module
    public fun initialize_protocol_module(account: &signer) {
        let owner = signer::address_of(account);
        move_to(account, ProtocolState {
            owner,
            registered_protocols: vector::empty<DeFiProtocol>(),
        });
    }

    /// Registers a new DeFi protocol
    public fun register_protocol(
        account: &signer,
        id: u64,
        name: vector<u8>,
        interaction_type: vector<u8>
    ) acquires ProtocolState {
        let state = borrow_global_mut<ProtocolState>(signer::address_of(account));

        let protocol = DeFiProtocol {
            id,
            name,
            interaction_type,
            is_active: true,
        };

        vector::push_back(&mut state.registered_protocols, protocol);
    }

    /// Executes interaction with a specific DeFi protocol
    public fun interact_with_protocol(account: &signer, protocol_id: u64, amount: u64) acquires ProtocolState {
        let state = borrow_global_mut<ProtocolState>(signer::address_of(account));

        let mut i = 0;
        while (i < vector::length(&state.registered_protocols)) {
            let protocol = &mut vector::borrow_mut(&mut state.registered_protocols, i);
            if (protocol.id == protocol_id && protocol.is_active) {
                // TODO: Implement actual DeFi interaction logic here (lending, staking, swapping)
            }
            i = i + 1;
        }
    }

    /// Deactivates a protocol to prevent interactions
    public fun deactivate_protocol(account: &signer, protocol_id: u64) acquires ProtocolState {
        let state = borrow_global_mut<ProtocolState>(signer::address_of(account));

        let mut i = 0;
        while (i < vector::length(&state.registered_protocols)) {
            let protocol = &mut vector::borrow_mut(&mut state.registered_protocols, i);
            if (protocol.id == protocol_id) {
                protocol.is_active = false;
            }
            i = i + 1;
        }
    }

    /// Retrieves protocol details by ID
    public fun get_protocol(account: &signer, protocol_id: u64) acquires ProtocolState: option::Option<DeFiProtocol> {
        let state = borrow_global<ProtocolState>(signer::address_of(account));

        let mut i = 0;
        while (i < vector::length(&state.registered_protocols)) {
            let protocol = vector::borrow(&state.registered_protocols, i);
            if (protocol.id == protocol_id) {
                return option::some(*protocol);
            }
            i = i + 1;
        }
        option::none<DeFiProtocol>()
    }

    /// Fetches all active DeFi protocols
    public fun get_all_protocols(account: &signer) acquires ProtocolState: vector<DeFiProtocol> {
        let state = borrow_global<ProtocolState>(signer::address_of(account));
        let mut active_protocols = vector::empty<DeFiProtocol>();

        let mut i = 0;
        while (i < vector::length(&state.registered_protocols)) {
            let protocol = vector::borrow(&state.registered_protocols, i);
            if (protocol.is_active) {
                vector::push_back(&mut active_protocols, *protocol);
            }
            i = i + 1;
        }
        active_protocols
    }
}
