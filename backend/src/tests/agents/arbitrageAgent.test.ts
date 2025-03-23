import { ArbitrageAgent } from '../../src/agents/ArbitrageAgent';
import { BlockchainService } from '../../src/services/BlockchainService';

jest.mock('../../src/services/BlockchainService');

describe('ArbitrageAgent', () => {
  let agent: ArbitrageAgent;

  beforeEach(() => {
    agent = new ArbitrageAgent(new BlockchainService());
  });

  it('should detect arbitrage opportunities', async () => {
    const result = await agent.detectOpportunities();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should execute arbitrage trade successfully', async () => {
    const tradeResult = await agent.executeTrade({ tokenA: 'APT', tokenB: 'USDT', amount: 100 });
    expect(tradeResult.success).toBe(true);
  });
});
