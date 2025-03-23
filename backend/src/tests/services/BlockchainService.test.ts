import { BlockchainService } from '../../src/services/BlockchainService';

describe('BlockchainService', () => {
  let service: BlockchainService;

  beforeEach(() => {
    service = new BlockchainService();
  });

  it('should fetch wallet balance', async () => {
    const balance = await service.getBalance('walletAddress');
    expect(balance).toBeGreaterThanOrEqual(0);
  });

  it('should transfer tokens successfully', async () => {
    const result = await service.transferTokens('fromAddr', 'toAddr', 'APT', 10);
    expect(result.txHash).toBeDefined();
  });
});
