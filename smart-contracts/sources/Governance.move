module DeFAI_Nexus::Governance {
    use std::vector;
    use std::signer;
    use std::math;
    use std::option;

    struct Proposal has key, store {
        id: u64,
        description: vector<u8>,
        votes_for: u64,
        votes_against: u64,
        executed: bool,
    }

    struct GovernanceState has key, store {
        owner: address,
        proposals: vector<Proposal>,
    }

    /// Initializes Governance Module
    public fun initialize_governance(account: &signer) {
        let owner = signer::address_of(account);
        move_to(account, GovernanceState {
            owner,
            proposals: vector::empty<Proposal>(),
        });
    }

    /// Creates a new governance proposal
    public fun create_proposal(account: &signer, id: u64, description: vector<u8>) acquires GovernanceState {
        let state = borrow_global_mut<GovernanceState>(signer::address_of(account));

        let proposal = Proposal {
            id,
            description,
            votes_for: 0,
            votes_against: 0,
            executed: false,
        };

        vector::push_back(&mut state.proposals, proposal);
    }

    /// Votes on a proposal (true = for, false = against)
    public fun vote(account: &signer, proposal_id: u64, support: bool) acquires GovernanceState {
        let state = borrow_global_mut<GovernanceState>(signer::address_of(account));

        let mut i = 0;
        while (i < vector::length(&state.proposals)) {
            let p = &mut vector::borrow_mut(&mut state.proposals, i);
            if (p.id == proposal_id) {
                if (support) {
                    p.votes_for = p.votes_for + 1;
                } else {
                    p.votes_against = p.votes_against + 1;
                }
            }
            i = i + 1;
        }
    }

    /// Executes a proposal if it has enough votes
    public fun execute_proposal(account: &signer, proposal_id: u64) acquires GovernanceState {
        let state = borrow_global_mut<GovernanceState>(signer::address_of(account));

        let mut i = 0;
        while (i < vector::length(&state.proposals)) {
            let p = &mut vector::borrow_mut(&mut state.proposals, i);
            if (p.id == proposal_id && !p.executed) {
                if (p.votes_for > p.votes_against) {
                    p.executed = true;
                    // TODO: Implement proposal execution logic
                }
            }
            i = i + 1;
        }
    }

    /// Retrieves a proposal by ID
    public fun get_proposal(account: &signer, proposal_id: u64) acquires GovernanceState: option::Option<Proposal> {
        let state = borrow_global<GovernanceState>(signer::address_of(account));

        let mut i = 0;
        while (i < vector::length(&state.proposals)) {
            let p = vector::borrow(&state.proposals, i);
            if (p.id == proposal_id) {
                return option::some(*p);
            }
            i = i + 1;
        }
        option::none<Proposal>()
    }

    /// Fetches all proposals
    public fun get_all_proposals(account: &signer) acquires GovernanceState: vector<Proposal> {
        let state = borrow_global<GovernanceState>(signer::address_of(account));
        state.proposals
    }
}
