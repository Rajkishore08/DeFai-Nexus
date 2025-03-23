import { ethers } from 'ethers';
import { UniswapV2Router02 } from '@uniswap/v2-periphery/build/UniswapV2Router02.json';
import { ERC20 } from '@openzeppelin/contracts/build/contracts/ERC20.json';

class LiquidityAgent {
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private router: ethers.Contract;

  constructor(
    rpcUrl: string,
    privateKey: string,
    routerAddress: string
  ) {
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.router = new ethers.Contract(
      routerAddress,
      UniswapV2Router02.abi,
      this.wallet
    );
  }

  async addLiquidity(
    tokenAAddress: string,
    tokenBAddress: string,
    amountADesired: ethers.BigNumber,
    amountBDesired: ethers.BigNumber,
    amountAMin: ethers.BigNumber,
    amountBMin: ethers.BigNumber,
    to: string,
    deadline: number
  ): Promise<ethers.ContractTransaction> {
    const tokenA = new ethers.Contract(tokenAAddress, ERC20.abi, this.wallet);
    const tokenB = new ethers.Contract(tokenBAddress, ERC20.abi, this.wallet);

    // Approve token transfers
    await tokenA.approve(this.router.address, amountADesired);
    await tokenB.approve(this.router.address, amountBDesired);

    // Add liquidity
    return this.router.addLiquidity(
      tokenAAddress,
      tokenBAddress,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      to,
      deadline
    );
  }

  async removeLiquidity(
    tokenAAddress: string,
    tokenBAddress: string,
    liquidity: ethers.BigNumber,
    amountAMin: ethers.BigNumber,
    amountBMin: ethers.BigNumber,
    to: string,
    deadline: number
  ): Promise<ethers.ContractTransaction> {
    const pairAddress = await this.router.getPair(tokenAAddress, tokenBAddress);
    const pair = new ethers.Contract(pairAddress, ERC20.abi, this.wallet);

    // Approve liquidity token transfer
    await pair.approve(this.router.address, liquidity);

    // Remove liquidity
    return this.router.removeLiquidity(
      tokenAAddress,
      tokenBAddress,
      liquidity,
      amountAMin,
      amountBMin,
      to,
      deadline
    );
  }
}

export default LiquidityAgent;
