script {
    use std::signer;
    use std::assert;
    use std::string;
    use std::vector;
    use DeFAI_Nexus::AIExecution;
    use DeFAI_Nexus::Events;

    public fun main(account: &signer, strategy_id: u64) {
        let owner = signer::address_of(account);
        AIExecution::execute(account, strategy_id);
        let event_message = string::utf8(b"AI strategy executed successfully for strategy ID: ");
        let strategy_id_bytes = vector::to_bytes(strategy_id);
        let log_message = string::concat(event_message, &string::from_utf8(strategy_id_bytes));
        Events::log_event(account, log_message);
        assert!(AIExecution::is_executed(owner, strategy_id), b"Strategy execution failed");
    }
}
