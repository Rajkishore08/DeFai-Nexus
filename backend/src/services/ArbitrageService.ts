import { ChatAnthropic } from "@langchain/anthropic";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";
import { DynamicTool } from "@langchain/core/tools";
import dotenv from "dotenv";

dotenv.config();

class ArbitrageService {
    /**
     * Scans multiple DEXs to identify arbitrage opportunities.
     * @returns {Promise<{opportunity: string, details: object}>}
     */
    static async getArbitrageOpportunities() {
        try {
            // Simulated arbitrage opportunity detection logic
            const opportunity = {
                opportunity: "Found arbitrage between Uniswap & SushiSwap",
                details: {
                    buyOn: "Uniswap",
                    sellOn: "SushiSwap",
                    profitPotential: "0.5% per trade",
                },
            };
            return opportunity;
        } catch (error) {
            return { error: `Failed to fetch arbitrage opportunities: ${error.message || error}` };
        }
    }

    /**
     * Executes an arbitrage trade across different DEXs.
     * @param {string[]} tradePath - The sequence of trades to execute.
     * @returns {Promise<{status: string, tradePath: string[], txHash: string}>}
     */
    static async executeArbitrage(tradePath: string[]) {
        try {
            if (!Array.isArray(tradePath) || tradePath.length < 2) {
                throw new Error("Invalid trade path. Must contain at least a buy and sell DEX.");
            }

            // Simulate trade execution (in a real scenario, this would interact with smart contracts)
            const transactionHash = `0x${Math.random().toString(36).substring(2, 15)}`;

            return {
                status: "Success",
                tradePath,
                txHash: transactionHash,
            };
        } catch (error) {
            return { error: `Failed to execute arbitrage trade: ${error.message || error}` };
        }
    }
}

const llm = new ChatAnthropic({
    temperature: 0.7,
    model: "claude-3-5-sonnet-20241022",
    apiKey: process.env.ANTHROPIC_API_KEY,
});

const memory = new MemorySaver();

// Define arbitrage tools
const getArbitrageOpportunities = {
    name: "getArbitrageOpportunities",
    description: "Finds arbitrage opportunities between different DEXs.",
    parameters: [],
    execute: async () => {
        return await ArbitrageService.getArbitrageOpportunities();
    },
};

const executeArbitrage = {
    name: "executeArbitrage",
    description: "Executes an arbitrage trade sequence.",
    parameters: [{ name: "tradePath", type: "array", description: "List of DEXs for arbitrage trading" }],
    execute: async ({ tradePath }: { tradePath: string[] }) => {
        return await ArbitrageService.executeArbitrage(tradePath);
    },
};

const getArbitrageOpportunitiesTool = new DynamicTool({
    name: "getArbitrageOpportunities",
    description: "Find arbitrage opportunities across decentralized exchanges.",
    func: async () => {
        return await ArbitrageService.getArbitrageOpportunities();
    },
});

// Create the AI agent with arbitrage tools
const agent = createReactAgent({
    llm,
    tools: {
        getArbitrageOpportunities: async () => await ArbitrageService.getArbitrageOpportunities(),
        executeArbitrage: async (tradePath: string[]) => await ArbitrageService.executeArbitrage(tradePath),
    },
    
    
        checkpointSaver: memory,
    messageModifier: `
        You are an AI-powered arbitrage assistant. You can scan decentralized exchanges for arbitrage opportunities 
        and execute profitable trades across different DEXs. Provide clear insights and execution results.
    `,
});

// Function to process AI arbitrage requests
async function processArbitrageRequest(userMessage: string) {
    if (typeof userMessage !== "string") {
        console.error("Invalid user message format.");
        return;
    }
    try {
        const stream = await agent.stream({ messages: [new HumanMessage(userMessage)] });

        for await (const chunk of stream) {
            if (chunk.agent) {
                console.log(`Agent Response: ${chunk.agent.messages[0].content}`);
            } else if (chunk.tools) {
                console.log(`Tool Response: ${chunk.tools.messages[0].content}`);
            }
            console.log("-------------------");
        }
    } catch (error) {
        console.error(`Error processing arbitrage request: ${error.message || error}`);
    }
}

export { ArbitrageService, processArbitrageRequest };
