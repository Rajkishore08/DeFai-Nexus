import { AptosBalanceTool } from '../../../src/services/tools/AptosBalanceTool';

describe('AptosBalanceTool', () => {
  const balanceTool = new AptosBalanceTool();

  it('should return correct balance', async () => {
    const balance = await balanceTool.getBalance('walletAddress');
    expect(balance).toBeGreaterThanOrEqual(0);
  });
});
