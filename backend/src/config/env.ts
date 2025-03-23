// config/blockchain.ts

interface ChainConfig {
  name: string;
  rpcUrl: string;
  chainId: number;
  explorerUrl: string;
  nativeToken: string;
}

export const BLOCKCHAIN_CONFIG: Record<string, ChainConfig> = {
  aptos: {
    name: "Aptos",
    rpcUrl: "https://fullnode.mainnet.aptoslabs.com",
    chainId: 1,
    explorerUrl: "https://explorer.aptoslabs.com/",
    nativeToken: "APT"
  },
  ethereum: {
    name: "Ethereum",
    rpcUrl: "https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}",
    chainId: 1,
    explorerUrl: "https://etherscan.io/",
    nativeToken: "ETH"
  },
  solana: {
    name: "Solana",
    rpcUrl: "https://api.mainnet-beta.solana.com",
    chainId: 101, // Example placeholder
    explorerUrl: "https://solscan.io/",
    nativeToken: "SOL"
  },
  bsc: {
    name: "Binance Smart Chain",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    chainId: 56,
    explorerUrl: "https://bscscan.com/",
    nativeToken: "BNB"
  }
};
