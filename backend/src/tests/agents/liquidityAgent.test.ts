import { LiquidityAgent } from '../../src/agents/LiquidityAgent';
import { BlockchainService } from '../../src/services/BlockchainService';

jest.mock('../../src/services/BlockchainService');

describe('LiquidityAgent', () => {
  let agent: LiquidityAgent;

  beforeEach(() => {
    agent = new LiquidityAgent(new BlockchainService());
  });

  it('should add liquidity successfully', async () => {
    const result = await agent.addLiquidity('APT', 'USDC', 1000);
    expect(result.txHash).toBeDefined();
  });

  it('should remove liquidity successfully', async () => {
    const result = await agent.removeLiquidity('APT', 'USDC', 500);
    expect(result.success).toBe(true);
  });
});
