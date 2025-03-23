import { DynamicTool } from "@langchain/core/tools";
import { ArbitrageService } from "../services/ArbitrageService";

export class ArbitrageAgent {
    async findArbitrageOpportunity(): Promise<string> {
        try {
            const opportunity = await ArbitrageService.getArbitrageOpportunities();
            return `Arbitrage opportunity found: ${JSON.stringify(opportunity)}`;
        } catch (error: any) {
            console.error("Error finding arbitrage opportunities:", error);
            return `Error finding arbitrage opportunities: ${error.message || error}`;
        }
    }

    async executeArbitrage(tradePath: string[]): Promise<string> {
        try {
            if (!tradePath || tradePath.length === 0) {
                throw new Error("Trade path is required for executing arbitrage.");
            }

            const result = await ArbitrageService.executeArbitrage(tradePath);
            return `Arbitrage executed successfully: ${JSON.stringify(result)}`;
        } catch (error: any) {
            console.error("Error executing arbitrage:", error);
            return `Error executing arbitrage: ${error.message || error}`;
        }
    }
}

export const getArbitrageOpportunitiesTool = new DynamicTool({
    name: "getArbitrageOpportunities",
    description: "Find arbitrage opportunities across decentralized exchanges (DEXs).",
    func: async (): Promise<string> => {
        return await new ArbitrageAgent().findArbitrageOpportunity();
    },
});

export const executeArbitrageTool = new DynamicTool({
    name: "executeArbitrage",
    description: "Execute an arbitrage trade based on a given trade path.",
    func: async (input: string): Promise<string> => {
        try {
            const tradePath: string[] = JSON.parse(input);
            return await new ArbitrageAgent().executeArbitrage(tradePath);
        } catch (error: any) {
            console.error("Error parsing trade path input:", error);
            return `Invalid input for trade path: ${error.message || error}`;
        }
    },
});
