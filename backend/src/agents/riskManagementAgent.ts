import { ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber } from 'bignumber.js';
import dotenv from 'dotenv';

dotenv.config();

interface RiskParameters {
  maxTransactionAmount: BigNumber;
  minLiquidityThreshold: BigNumber;
  approvedTokens: string[];
}

class RiskManagementAgent {
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private riskParameters: RiskParameters;

  constructor(
    rpcUrl: string,
    privateKey: string,
    riskParameters: RiskParameters
  ) {
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.riskParameters = riskParameters;
  }

  /**
   * Checks token balance of the wallet
   */
  private async getTokenBalance(tokenAddress: string): Promise<BigNumber> {
    const erc20ABI = [
      'function balanceOf(address owner) view returns (uint256)',
      'function decimals() view returns (uint8)',
    ];

    const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, this.provider);
    const balance = await tokenContract.balanceOf(this.wallet.address);
    const decimals = await tokenContract.decimals();
    return new BigNumber(balance.toString()).dividedBy(new BigNumber(10).pow(decimals));
  }

  /**
   * Checks if token is approved and transaction amount is within limits
   */
  private async assessTransactionRisk(
    tokenAddress: string,
    amount: BigNumber
  ): Promise<boolean> {
    if (!this.riskParameters.approvedTokens.map(t => t.toLowerCase()).includes(tokenAddress.toLowerCase())) {
      console.error(`❌ Token ${tokenAddress} is NOT approved.`);
      return false;
    }

    if (amount.isGreaterThan(this.riskParameters.maxTransactionAmount)) {
      console.error(`❌ Transaction amount ${amount.toString()} exceeds max limit.`);
      return false;
    }

    const balance = await this.getTokenBalance(tokenAddress);
    if (amount.isGreaterThan(balance)) {
      console.error(`❌ Insufficient token balance. Available: ${balance.toString()}`);
      return false;
    }

    console.log(`✅ Transaction risk assessment passed for ${amount.toString()} tokens of ${tokenAddress}.`);
    return true;
  }

  /**
   * Executes the transaction after risk check
   */
  public async executeTransaction(
    tokenAddress: string,
    recipient: string,
    amount: BigNumber
  ): Promise<TransactionResponse | null> {
    const isRiskAcceptable = await this.assessTransactionRisk(tokenAddress, amount);
    if (!isRiskAcceptable) {
      console.error('❌ Transaction blocked due to risk.');
      return null;
    }

    const erc20ABI = [
      'function transfer(address to, uint256 amount) returns (bool)',
      'function decimals() view returns (uint8)',
    ];
    const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, this.wallet);
    const decimals = await tokenContract.decimals();

    try {
      const tx = await tokenContract.transfer(
        recipient,
        ethers.utils.parseUnits(amount.toString(), decimals)
      );
      console.log(`📤 Transaction submitted: ${tx.hash}`);
      await tx.wait();
      console.log('✅ Transaction confirmed.');
      return tx;
    } catch (error: any) {
      console.error('❌ Transaction failed:', error.reason || error.message);
      return null;
    }
  }

  /**
   * Monitors the wallet's liquidity across all approved tokens
   */
  public async monitorLiquidity(): Promise<void> {
    console.log('🔍 Monitoring liquidity...');
    for (const tokenAddress of this.riskParameters.approvedTokens) {
      const balance = await this.getTokenBalance(tokenAddress);
      console.log(`💰 Token: ${tokenAddress} | Balance: ${balance.toString()}`);
      if (balance.isLessThan(this.riskParameters.minLiquidityThreshold)) {
        console.warn(`⚠️ Liquidity WARNING: Balance ${balance.toString()} is below threshold.`);
      }
    }
  }
}

// Example usage
const rpcUrl = process.env.RPC_URL || '';
const privateKey = process.env.PRIVATE_KEY || '';

if (!rpcUrl || !privateKey) {
  throw new Error('Missing RPC_URL or PRIVATE_KEY in environment variables!');
}

const riskParameters: RiskParameters = {
  maxTransactionAmount: new BigNumber('1000'), // 1000 tokens
  minLiquidityThreshold: new BigNumber('500'), // Warn if below 500 tokens
  approvedTokens: [
    '0xTokenAddress1',
    '0xTokenAddress2',
  ],
};

const agent = new RiskManagementAgent(rpcUrl, privateKey, riskParameters);

(async () => {
  const tokenAddress = '';
  const recipient = '';
  const amount = new BigNumber('');

  await agent.monitorLiquidity();
  await agent.executeTransaction(tokenAddress, recipient, amount);
})();
