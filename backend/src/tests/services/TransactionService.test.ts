import { TransactionService } from '../../src/services/TransactionService';

describe('TransactionService', () => {
  const txService = new TransactionService();

  it('should check transaction status', async () => {
    const status = await txService.getTransactionStatus('sampleTxHash');
    expect(['pending', 'confirmed', 'failed']).toContain(status);
  });
});
