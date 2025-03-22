
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type WalletType = 'Petra' | 'Martian' | 'Pontem' | 'Rise';

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  walletBalance: string | null;
  walletType: WalletType | null;
  isWalletModalOpen: boolean;
  connectWallet: (walletType: WalletType) => Promise<boolean>;
  disconnectWallet: () => void;
  setIsWalletModalOpen: (isOpen: boolean) => void;
  executeTransaction: (payload: any) => Promise<{ success: boolean; hash?: string; error?: string }>;
  checkWalletAvailability: (walletType: WalletType) => Promise<boolean>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<WalletType | null>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Check for existing connection on load
  useEffect(() => {
    const storedWalletInfo = localStorage.getItem('walletInfo');
    if (storedWalletInfo) {
      try {
        const { address, type } = JSON.parse(storedWalletInfo);
        setWalletAddress(address);
        setWalletType(type as WalletType);
        setIsConnected(true);
        
        // Fetch the balance
        fetchBalance(address);
      } catch (error) {
        console.error('Failed to restore wallet connection:', error);
        localStorage.removeItem('walletInfo');
      }
    }
  }, []);

  const fetchBalance = async (address: string) => {
    // This would be replaced with actual balance fetching from Aptos blockchain
    // Simulating balance fetch for now
    try {
      // For demo purposes - in real implementation, call Aptos API
      setTimeout(() => {
        setWalletBalance('128.45');
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      toast.error("Failed to fetch wallet balance");
    }
  };

  const checkWalletAvailability = async (type: WalletType): Promise<boolean> => {
    // Check if the wallet extension is present in the window object
    switch (type) {
      case 'Petra':
        return typeof window.aptos !== 'undefined';
      case 'Martian':
        return typeof window.martian !== 'undefined';
      case 'Pontem':
        return typeof window.pontem !== 'undefined';
      case 'Rise':
        return typeof window.rise !== 'undefined';
      default:
        return false;
    }
  };

  const connectWallet = async (type: WalletType): Promise<boolean> => {
    try {
      // Check if the selected wallet is installed
      const isWalletAvailable = await checkWalletAvailability(type);
      
      if (!isWalletAvailable) {
        toast.error(`${type} wallet is not installed. Please install it to continue.`);
        return false;
      }

      // Connect to the wallet based on its type
      let walletAddress;
      
      switch (type) {
        case 'Petra':
          if (window.aptos) {
            try {
              const response = await window.aptos.connect();
              walletAddress = response.address;
            } catch (error) {
              console.error('Petra connection error:', error);
              toast.error('Failed to connect to Petra wallet');
              return false;
            }
          }
          break;
          
        case 'Martian':
          if (window.martian) {
            try {
              const response = await window.martian.connect();
              walletAddress = response.address;
            } catch (error) {
              console.error('Martian connection error:', error);
              toast.error('Failed to connect to Martian wallet');
              return false;
            }
          }
          break;
          
        case 'Pontem':
          if (window.pontem) {
            try {
              const response = await window.pontem.connect();
              walletAddress = response.address;
            } catch (error) {
              console.error('Pontem connection error:', error);
              toast.error('Failed to connect to Pontem wallet');
              return false;
            }
          }
          break;
          
        case 'Rise':
          if (window.rise) {
            try {
              const response = await window.rise.connect();
              walletAddress = response.address;
            } catch (error) {
              console.error('Rise connection error:', error);
              toast.error('Failed to connect to Rise wallet');
              return false;
            }
          }
          break;
          
        default:
          // For demo purposes - if wallet connection fails or is not implemented
          console.log(`Simulating connection to ${type}...`);
          walletAddress = `0x${Math.random().toString(16).substring(2, 14)}`;
      }
      
      if (!walletAddress) {
        throw new Error('Failed to get wallet address');
      }
      
      setWalletAddress(walletAddress);
      setWalletType(type);
      setIsConnected(true);
      
      // Store wallet info in localStorage
      localStorage.setItem('walletInfo', JSON.stringify({
        address: walletAddress,
        type
      }));
      
      // Fetch wallet balance
      fetchBalance(walletAddress);
      
      toast.success(`Successfully connected to ${type} wallet`);
      
      return true;
    } catch (error) {
      console.error(`Failed to connect ${type} wallet:`, error);
      toast.error(`Failed to connect to ${type} wallet. Please try again.`);
      return false;
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setWalletBalance(null);
    setWalletType(null);
    localStorage.removeItem('walletInfo');
    
    toast.success("You have successfully disconnected your wallet");
  };

  // Execute a transaction through the connected wallet
  const executeTransaction = async (payload: any): Promise<{ success: boolean; hash?: string; error?: string }> => {
    if (!isConnected || !walletAddress || !walletType) {
      return { success: false, error: 'Wallet not connected' };
    }
    
    try {
      // Execute transaction based on wallet type
      switch (walletType) {
        case 'Petra':
          if (window.aptos) {
            try {
              const response = await window.aptos.signAndSubmitTransaction(payload);
              return { success: true, hash: response.hash };
            } catch (error) {
              console.error('Petra transaction error:', error);
              return { success: false, error: 'Failed to execute transaction with Petra' };
            }
          }
          break;
          
        case 'Martian':
          if (window.martian) {
            try {
              const response = await window.martian.signAndSubmitTransaction(payload);
              return { success: true, hash: response.hash };
            } catch (error) {
              console.error('Martian transaction error:', error);
              return { success: false, error: 'Failed to execute transaction with Martian' };
            }
          }
          break;
          
        case 'Pontem':
          if (window.pontem) {
            try {
              const response = await window.pontem.signAndSubmitTransaction(payload);
              return { success: true, hash: response.hash };
            } catch (error) {
              console.error('Pontem transaction error:', error);
              return { success: false, error: 'Failed to execute transaction with Pontem' };
            }
          }
          break;
          
        case 'Rise':
          if (window.rise) {
            try {
              const response = await window.rise.signAndSubmitTransaction(payload);
              return { success: true, hash: response.hash };
            } catch (error) {
              console.error('Rise transaction error:', error);
              return { success: false, error: 'Failed to execute transaction with Rise' };
            }
          }
          break;
          
        default:
          // Simulate transaction for demo purposes
          if (Math.random() < 0.9) {
            const fakeHash = `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
            return { success: true, hash: fakeHash };
          } else {
            return { success: false, error: 'Transaction rejected by user or blockchain' };
          }
      }
      
      // Fallback for simulation
      console.log('Executing transaction with payload:', payload);
      if (Math.random() < 0.9) {
        const fakeHash = `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
        return { success: true, hash: fakeHash };
      } else {
        return { success: false, error: 'Transaction rejected by user or blockchain' };
      }
    } catch (error) {
      console.error('Transaction error:', error);
      return {
        success: false,
        error: 'Failed to execute transaction'
      };
    }
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress,
        walletBalance,
        walletType,
        isWalletModalOpen,
        connectWallet,
        disconnectWallet,
        setIsWalletModalOpen,
        executeTransaction,
        checkWalletAvailability,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
