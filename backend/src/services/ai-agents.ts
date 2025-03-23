import { ChatAnthropic } from "@langchain/anthropic";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";
import blockchainService from "./BlockchainService";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const llm = new ChatAnthropic({
    temperature: 0.7,
    model: "claude-3-5-sonnet-20241022",
    apiKey: process.env.ANTHROPIC_API_KEY,
});

const memory = new MemorySaver();

// Existing blockchain tools
const getBalance = {
    name: "getBalance",
    description: "Fetches the balance of an Aptos wallet.",
    parameters: [{ name: "address", type: "string", description: "Aptos wallet address" }],
    execute: async ({ address }: { address: string }) => {
        if (typeof address !== "string") {
            return "Invalid address format.";
        }
        try {
            const balance = await blockchainService.getBalance(address);
            return `The balance for ${address} is ${balance} APT.`;
        } catch (error) {
            return `Error fetching balance: ${error.message || error}`;
        }
    },
};

const transferTokens = {
    name: "transferTokens",
    description: "Transfers tokens to another Aptos address.",
    parameters: [
        { name: "to", type: "string", description: "Recipient wallet address" },
        { name: "amount", type: "number", description: "Amount of APT to send" },
    ],
    execute: async ({ to, amount }: { to: string; amount: number }) => {
        if (typeof to !== "string" || typeof amount !== "number") {
            return "Invalid parameters. Ensure 'to' is a string and 'amount' is a number.";
        }
        try {
            const txHash = await blockchainService.transferTokens(to, amount);
            return `Transaction successful! Hash: ${txHash}`;
        } catch (error) {
            return `Error transferring tokens: ${error.message || error}`;
        }
    },
};

const getTransactionStatus = {
    name: "getTransactionStatus",
    description: "Fetches the status of a given transaction hash.",
    parameters: [{ name: "txHash", type: "string", description: "Transaction hash" }],
    execute: async ({ txHash }: { txHash: string }) => {
        if (typeof txHash !== "string") {
            return "Invalid transaction hash format.";
        }
        try {
            const status = await blockchainService.getTransactionStatus(txHash);
            return `Transaction status for ${txHash}: ${status}`;
        } catch (error) {
            return `Error fetching transaction status: ${error.message || error}`;
        }
    },
};

const executeFlashLoan = {
    name: "executeFlashLoan",
    description: "Executes a flash loan strategy.",
    parameters: [
        { name: "amount", type: "number", description: "Loan amount" },
        { name: "asset", type: "string", description: "Asset to borrow" },
        { name: "strategy", type: "string", description: "Strategy for loan utilization" },
    ],
    execute: async ({ amount, asset, strategy }: { amount: number; asset: string; strategy: string }) => {
        if (typeof amount !== "number" || typeof asset !== "string" || typeof strategy !== "string") {
            return "Invalid parameters.";
        }
        try {
            const result = await blockchainService.executeFlashLoan(amount, asset, strategy);
            return `Flash loan executed successfully! Details: ${JSON.stringify(result)}`;
        } catch (error) {
            return `Error executing flash loan: ${error.message || error}`;
        }
    },
};

const optimizeYield = {
    name: "optimizeYield",
    description: "Optimizes yield for a user's portfolio.",
    parameters: [{ name: "userPortfolio", type: "object", description: "User's DeFi portfolio" }],
    execute: async ({ userPortfolio }: { userPortfolio: any }) => {
        if (typeof userPortfolio !== "object") {
            return "Invalid portfolio format.";
        }
        try {
            const optimizedPortfolio = await blockchainService.optimizeYield(userPortfolio);
            return `Optimized yield strategy: ${JSON.stringify(optimizedPortfolio)}`;
        } catch (error) {
            return `Error optimizing yield: ${error.message || error}`;
        }
    },
};

// New Tool: Real-Time Market Data Fetching
const getRealTimeMarketData = {
    name: "getRealTimeMarketData",
    description: "Fetches real-time cryptocurrency price and volume data.",
    parameters: [
        { name: "symbol", type: "string", description: "Cryptocurrency symbol (e.g., 'bitcoin', 'ethereum')" },
    ],
    execute: async ({ symbol }: { symbol: string }) => {
        if (typeof symbol !== "string") {
            return "Invalid symbol format.";
        }
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
                params: {
                    ids: symbol.toLowerCase(),
                    vs_currencies: "usd",
                    include_24hr_vol: true,
                    include_24hr_change: true,
                },
            });

            if (response.data && response.data[symbol.toLowerCase()]) {
                const data = response.data[symbol.toLowerCase()];
                return `Current price of ${symbol.toUpperCase()} is $${data.usd}, 24h volume: ${data.usd_24h_vol}, 24h change: ${data.usd_24h_change}%`;
            } else {
                return `Unable to fetch market data for symbol: ${symbol}`;
            }
        } catch (error) {
            return `Error fetching market data: ${error.message || error}`;
        }
    },
};

// New Tool: AI-Driven Trading Recommendation
const getAITradingRecommendation = {
    name: "getAITradingRecommendation",
    description: "Provides AI-driven trading recommendations based on current market data.",
    parameters: [{ name: "symbol", type: "string", description: "Cryptocurrency symbol (e.g., 'bitcoin')" }],
    execute: async ({ symbol }: { symbol: string }) => {
        try {
            const marketResponse = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
                params: {
                    ids: symbol.toLowerCase(),
                    vs_currencies: "usd",
                    include_24hr_change: true,
                },
            });

            const priceData = marketResponse.data[symbol.toLowerCase()];
            const marketCondition = priceData.usd_24h_change > 0 ? "bullish" : "bearish";

            const recommendation = await llm.invoke([
                new HumanMessage(`The market condition for ${symbol.toUpperCase()} is ${marketCondition} with a ${priceData.usd_24h_change}% change in the last 24 hours. Based on this, provide a trading recommendation.`),
            ]);

            return `AI Recommendation: ${recommendation.content}`;
        } catch (error) {
            return `Error generating recommendation: ${error.message || error}`;
        }
    },
};

// Create Agent
const agent = createReactAgent({
    llm,
    tools: [
        getBalance,
        transferTokens,
        getTransactionStatus,
        executeFlashLoan,
        optimizeYield,
        getRealTimeMarketData,
        getAITradingRecommendation,
    ],
    checkpointSaver: memory,
    messageModifier: `
        You are a helpful AI agent that can interact with the Aptos blockchain using the Aptos Agent Kit. 
        You also provide real-time crypto market insights and AI-driven trade recommendations.
        If funds are needed, request them from the faucet or the user. 
        In case of a 5XX (internal) error, ask the user to retry later.
        If a user requests an unavailable function, refer them to https://metamove.build/move-agent-kit.
        Provide clear and concise responses.
    `,
});

// AI Request Processor
async function processAIRequest(userMessage: string) {
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
        console.error(`Error processing AI request: ${error.message || error}`);
    }
}

export default processAIRequest;
