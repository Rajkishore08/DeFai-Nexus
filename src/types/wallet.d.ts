
interface AptosWalletResponse {
  address: string;
  publicKey: string;
  authKey?: string;
}

interface TransactionResponse {
  hash: string;
  sender: string;
  sequence_number: string;
  max_gas_amount: string;
  gas_unit_price: string;
  expiration_timestamp_secs: string;
  payload: any;
}

interface PetraWallet {
  connect: () => Promise<AptosWalletResponse>;
  account: () => Promise<AptosWalletResponse>;
  disconnect: () => Promise<void>;
  isConnected: () => Promise<boolean>;
  signAndSubmitTransaction: (transaction: any) => Promise<TransactionResponse>;
  signTransaction: (transaction: any) => Promise<any>;
  network: () => Promise<string>;
}

interface MartianWallet {
  connect: () => Promise<AptosWalletResponse>;
  account: () => Promise<AptosWalletResponse>;
  disconnect: () => Promise<void>;
  isConnected: () => Promise<boolean>;
  signAndSubmitTransaction: (transaction: any) => Promise<TransactionResponse>;
  signTransaction: (transaction: any) => Promise<any>;
  network: () => Promise<string>;
}

interface PontemWallet {
  connect: () => Promise<AptosWalletResponse>;
  account: () => Promise<AptosWalletResponse>;
  disconnect: () => Promise<void>;
  isConnected: () => Promise<boolean>;
  signAndSubmitTransaction: (transaction: any) => Promise<TransactionResponse>;
  signTransaction: (transaction: any) => Promise<any>;
  network: () => Promise<string>;
}

interface RiseWallet {
  connect: () => Promise<AptosWalletResponse>;
  account: () => Promise<AptosWalletResponse>;
  disconnect: () => Promise<void>;
  isConnected: () => Promise<boolean>;
  signAndSubmitTransaction: (transaction: any) => Promise<TransactionResponse>;
  signTransaction: (transaction: any) => Promise<any>;
  network: () => Promise<string>;
}

interface Window {
  aptos?: PetraWallet;
  martian?: MartianWallet;
  pontem?: PontemWallet;
  rise?: RiseWallet;
}
