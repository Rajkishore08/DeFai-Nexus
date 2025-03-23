import { AptosClient } from 'aptos';
import { logger } from '../utils/logger';

export class TransactionStatusTool {
  private client: AptosClient;

  constructor(nodeUrl: string) {
    this.client = new AptosClient(nodeUrl);
  }

  async getTransactionStatus(txHash: string): Promise<string> {
    try {
      const tx = await this.client.getTransaction(txHash);
      return tx.success ? 'confirmed' : 'failed';
    } catch (error) {
      logger.error(`Error fetching transaction status: ${error}`);
      return 'pending';
    }
  }
}
