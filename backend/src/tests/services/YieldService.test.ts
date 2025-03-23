import { YieldService } from '../../src/services/YieldService';

describe('YieldService', () => {
  const yieldService = new YieldService();

  it('should find optimal yield opportunities', async () => {
    const opportunities = await yieldService.findOptimalYield('APT', 500);
    expect(opportunities).toBeDefined();
    expect(opportunities.length).toBeGreaterThan(0);
  });
});
