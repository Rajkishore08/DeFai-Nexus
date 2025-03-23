import { AptosTransferTool } from '../../../src/services/tools/AptosTransferTool';

describe('AptosTransferTool', () => {
  const transferTool = new AptosTransferTool();

  it('should perform token transfer successfully', async () => {
    const result = await transferTool.transfer('fromAddr', 'toAddr', 50);
    expect(result.txHash).toBeDefined();
  });
});
