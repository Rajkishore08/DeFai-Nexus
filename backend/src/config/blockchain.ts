
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
    rpcUrl: "",
    chainId: 1,
    explorerUrl: "",
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
    chainId: 101, 
    explorerUrl: "https://solscan.io/",
    nativeToken: "SOL"
  },
  bsc: {
    name: "Binance Smart Chain",
    rpcUrl: "",
    chainId: 56,
    explorerUrl: "https://bscscan.com/",
    nativeToken: "BNB"
  }
};
