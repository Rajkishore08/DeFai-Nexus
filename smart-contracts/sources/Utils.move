module DeFAI_Nexus::Utils {
    use std::math;
    use std::vector;

    /// Computes a percentage of a given value
    public fun compute_percentage(value: u64, percentage: u64): u64 {
        (value * percentage) / 100
    }

    /// Computes compound interest given principal, rate, and time
    public fun compute_compound_interest(principal: u64, rate: u64, time: u64): u64 {
        let mut amount = principal;
        let mut t = time;
        while (t > 0) {
            amount = amount + (amount * rate) / 100;
            t = t - 1;
        }
        amount - principal
    }

    /// Normalizes a value to a specific scale
    public fun normalize(value: u64, min: u64, max: u64): u64 {
        if (max == min) { return 0; }
        ((value - min) * 100) / (max - min)
    }

    /// Calculates the moving average of a dataset
    public fun moving_average(data: vector<u64>, period: u64): u64 {
        let len = vector::length(&data);
        if (len < period) { return 0; }
        let mut sum = 0;
        let mut i = len - period;
        while (i < len) {
            sum = sum + vector::borrow(&data, i);
            i = i + 1;
        }
        sum / period
    }
}
