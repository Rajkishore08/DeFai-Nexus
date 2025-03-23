import { AptosClient, AptosAccount, FaucetClient } from 'aptos';
import { logger } from '../utils/logger';

export class AptosTransferTool {
  private client: AptosClient;

  constructor(nodeUrl: string) {
    this.client = new AptosClient(nodeUrl);
  }

  async transfer(from: AptosAccount, to: string, amount: number): Promise<{ txHash: string }> {
    try {
      const txn = await this.client.transfer(from, to, amount);
      logger.info(`Transfer successful: ${txn.hash}`);
      return { txHash: txn.hash };
    } catch (error) {
      logger.error(`Transfer failed: ${error}`);
      throw error;
    }
  }
}
