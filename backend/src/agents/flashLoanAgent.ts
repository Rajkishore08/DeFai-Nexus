import { FlashLoanService } from "../services/FlashLoanService";

export class FlashLoanAgent {
    async executeFlashLoan(amount: number, asset: string, strategy: string) {
        try {
            const resuimport { DynamicTool } from "@langchain/core/tools";
            import { FlashLoanService } from "../services/FlashLoanService";
            
            export class FlashLoanAgent {
                async executeFlashLoan(amount: number, asset: string, strategy: string): Promise<string> {
                    try {
                        if (!amount || amount <= 0) throw new Error("Invalid flash loan amount.");
                        if (!asset) throw new Error("Asset type is required.");
                        if (!strategy) throw new Error("Strategy type is required.");
            
                        const result = await FlashLoanService.execute(amount, asset, strategy);
                        return `Flash loan executed successfully: ${JSON.stringify(result)}`;
                    } catch (error: any) {
                        console.error("Error executing flash loan:", error);
                        return `Error executing flash loan: ${error.message || error}`;
                    }
                }
            }
            
            export const executeFlashLoanTool = new DynamicTool({
                name: "executeFlashLoan",
                description: "Execute a flash loan by specifying the amount, asset, and strategy.",
                func: async (input: string): Promise<string> => {
                    try {
                        const { amount, asset, strategy } = JSON.parse(input);
                        return await new FlashLoanAgent().executeFlashLoan(amount, asset, strategy);
                    } catch (error: any) {
                        console.error("Error parsing flash loan input:", error);
                        return `Invalid input for flash loan execution: ${error.message || error}`;
                    }
                },
            });
            lt = await FlashLoanService.execute(amount, asset, strategy);
            return `Flash loan executed successfully: ${JSON.stringify(result)}`;
        } catch (error) {
            return `Error executing flash loan: ${error.message}`;
        }
    }
}
