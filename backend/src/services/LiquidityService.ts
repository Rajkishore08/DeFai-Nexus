import { AptosClient, AptosAccount } from "aptos";
import dotenv from "dotenv";

dotenv.config();

const RPC_URL: string = process.env.RPC_URL_MAINNET || "https://fullnode.mainnet.aptoslabs.com";
const client = new AptosClient(RPC_URL);

class LiquidityService {
  private account: AptosAccount;

  constructor() {
    if (!process.env.PRIVATE_KEY) {
      throw new Error("PRIVATE_KEY is not set in environment variables");
    }
    const privateKeyBuffer = Buffer.from(process.env.PRIVATE_KEY, "hex");
    this.account = new AptosAccount(new Uint8Array(privateKeyBuffer));
  }

  /**
   * Provide liquidity to a pool
   * @param {number} amount - Amount of tokens to provide
   * @returns {Promise<string>} - Transaction hash
   */
  async provideLiquidity(amount: number): Promise<string> {
    try {
      // Example payload, assuming custom module for liquidity
      const payload = {
        type: "entry_function_payload",
        function: `${this.account.address().hex()}::LiquidityPool::add_liquidity`,
        type_arguments: [],
        arguments: [amount.toString()],
      };

      const txnRequest = await client.generateTransaction(this.account.address(), payload);
      const signedTxn = await client.signTransaction(this.account, txnRequest);
      const transactionRes = await client.submitTransaction(signedTxn);
      await client.waitForTransaction(transactionRes.hash);

      return transactionRes.hash;
    } catch (error) {
      console.error("Error providing liquidity:", error);
      throw error;
    }
  }

  /**
   * Withdraw liquidity from a pool
   * @param {number} amount - Amount to withdraw
   * @returns {Promise<string>} - Transaction hash
   */
  async withdrawLiquidity(amount: number): Promise<string> {
    try {
      // Example payload, assuming custom module for liquidity
      const payload = {
        type: "entry_function_payload",
        function: `${this.account.address().hex()}::LiquidityPool::remove_liquidity`,
        type_arguments: [],
        arguments: [amount.toString()],
      };

      const txnRequest = await client.generateTransaction(this.account.address(), payload);
      const signedTxn = await client.signTransaction(this.account, txnRequest);
      const transactionRes = await client.submitTransaction(signedTxn);
      await client.waitForTransaction(transactionRes.hash);

      return transactionRes.hash;
    } catch (error) {
      console.error("Error withdrawing liquidity:", error);
      throw error;
    }
  }
}

export default new LiquidityService();
