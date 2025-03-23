import { AptosClient } from 'aptos';
import { logger } from '../utils/logger';

export class AptosBalanceTool {
  private client: AptosClient;

  constructor(nodeUrl: string) {
    this.client = new AptosClient(nodeUrl);
  }

  async getBalance(walletAddress: string): Promise<number> {
    try {
      const account = await this.client.getAccount(walletAddress);
      return parseInt(account.sequence_number, 10);
    } catch (error) {
      logger.error(`Error fetching balance: ${error}`);
      throw error;
    }
  }
}
