import { ethers } from 'ethers';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import dotenv from 'dotenv';

dotenv.config();

interface YieldOpportunity {
  protocolName: string;
  apy: BigNumber;
  contractAddress: string;
}

class YieldOptimizationAgent {
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private opportunities: YieldOpportunity[];

  constructor(rpcUrl: string, privateKey: string) {
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.opportunities = [];
  }

  // Fetch yield opportunities from various DeFi protocols
  public async fetchYieldOpportunities(): Promise<void> {
    try {
      const response = await axios.get('https://api.defipulse.com/api/v1/defipulse/api/GetProjects');
      const data = response.data;

      this.opportunities = data.map((item: any) => ({
        protocolName: item.name,
        apy: new BigNumber(item.apy),
        contractAddress: item.contractAddress,
      }));

      console.log('Fetched yield opportunities:', this.opportunities);
    } catch (error) {
      console.error('Error fetching yield opportunities:', error);
    }
  }

  // Allocate assets to the highest yield opportunity
  public async allocateAssets(amount: BigNumber): Promise<void> {
    if (this.opportunities.length === 0) {
      console.error('No yield opportunities available.');
      return;
    }

    // Sort opportunities by APY in descending order
    const sortedOpportunities = this.opportunities.sort((a, b) => b.apy.minus(a.apy).toNumber());
    const bestOpportunity = sortedOpportunities[0];

    console.log(`Allocating ${amount.toString()} tokens to ${bestOpportunity.protocolName} with APY ${bestOpportunity.apy.toString()}%`);

    // Interact with the DeFi protocol's smart contract to allocate assets
    const contract = new ethers.Contract(
      bestOpportunity.contractAddress,
      [
        'function deposit(uint256 amount) public',
      ],
      this.wallet
    );

    try {
      const tx = await contract.deposit(amount.toFixed());
      console.log(`Transaction submitted: ${tx.hash}`);
      await tx.wait();
      console.log('Assets allocated successfully.');
    } catch (error) {
      console.error('Error allocating assets:', error);
    }
  }

  // Monitor performance of allocated assets
  public async monitorPerformance(): Promise<void> {
    console.log('Monitoring performance of allocated assets...');
  }
}

// Initialize the YieldOptimizationAgent with environment variables
const rpcUrl = process.env.RPC_URL || '';
const privateKey = process.env.PRIVATE_KEY || '';
const agent = new YieldOptimizationAgent(rpcUrl, privateKey);

// Fetch yield opportunities and allocate assets
(async () => {
  await agent.fetchYieldOpportunities();
  const amountToAllocate = new BigNumber('100e18'); // 100 tokens with 18 decimals
  await agent.allocateAssets(amountToAllocate);
})();
