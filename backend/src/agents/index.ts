import { LiquidityAgent } from "./liquidityAgent";
import { ArbitrageAgent } from "./arbitrageAgent";
import { YieldOptimizationAgent } from "./yieldOptimizationAgent";
import { RiskManagementAgent } from "./riskManagementAgent";
import { FlashLoanAgent } from "./flashLoanAgent";

export const agents = {
    liquidityAgent: new LiquidityAgent(),
    arbitrageAgent: new ArbitrageAgent(),
    yieldOptimizationAgent: new YieldOptimizationAgent(),
    riskManagementAgent: new RiskManagementAgent(),
    flashLoanAgent: new FlashLoanAgent(),
};

console.log("All AI agents initialized successfully.");
