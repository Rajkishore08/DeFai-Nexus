module DeFAI_Nexus::Events {
    use std::vector;
    use std::signer;
    use std::option;

    struct EventLog has key, store {
        owner: address,
        events: vector<vector<u8>>,
    }

    public fun initialize_event_log(account: &signer) {
        let owner = signer::address_of(account);
        move_to(account, EventLog { owner, events: vector::empty<vector<u8>>() });
    }

    public fun log_event(account: &signer, event_data: vector<u8>) acquires EventLog {
        let owner = signer::address_of(account);
        let event_log = borrow_global_mut<EventLog>(owner);
        vector::push_back(&mut event_log.events, event_data);
    }

    public fun get_events(account: &signer): vector<vector<u8>> acquires EventLog {
        let owner = signer::address_of(account);
        let event_log = borrow_global<EventLog>(owner);
        event_log.events
    }

    public fun clear_events(account: &signer) acquires EventLog {
        let owner = signer::address_of(account);
        let event_log = borrow_global_mut<EventLog>(owner);
        event_log.events = vector::empty<vector<u8>>();
    }

    public fun get_last_event(account: &signer): option::Option<vector<u8>> acquires EventLog {
        let owner = signer::address_of(account);
        let event_log = borrow_global<EventLog>(owner);
        let len = vector::length(&event_log.events);
        if (len > 0) {
            option::some(vector::borrow(&event_log.events, len - 1))
        } else {
            option::none()
        }
    }
}
