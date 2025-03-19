
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

export type WalletType = 'Perta' | 'Petra' | 'Martian' | 'Pontem' | 'Rise';

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  walletBalance: string | null;
  walletType: WalletType | null;
  isWalletModalOpen: boolean;
  connectWallet: (walletType: WalletType) => Promise<boolean>;
  disconnectWallet: () => void;
  setIsWalletModalOpen: (isOpen: boolean) => void;
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
      toast({
        title: "Error",
        description: "Failed to fetch wallet balance",
        variant: "destructive",
      });
    }
  };

  const connectWallet = async (type: WalletType): Promise<boolean> => {
    try {
      // Check if the selected wallet is installed
      const isWalletAvailable = checkWalletAvailability(type);
      
      if (!isWalletAvailable) {
        toast({
          title: "Wallet Not Installed",
          description: `${type} wallet is not installed. Please install it to continue.`,
          variant: "destructive",
        });
        return false;
      }

      // Simulate wallet connection with the Aptos API
      // In a real implementation, we would use actual wallet connection code
      
      // For demo purposes - would be replaced with real wallet connection
      console.log(`Connecting to ${type}...`);
      
      // Simulate connection success
      const fakeAddress = `0x${Math.random().toString(16).substring(2, 14)}`;
      setWalletAddress(fakeAddress);
      setWalletType(type);
      setIsConnected(true);
      
      // Store wallet info in localStorage
      localStorage.setItem('walletInfo', JSON.stringify({
        address: fakeAddress,
        type
      }));
      
      // Fetch wallet balance
      fetchBalance(fakeAddress);
      
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${type} wallet`,
      });
      
      return true;
    } catch (error) {
      console.error(`Failed to connect ${type} wallet:`, error);
      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${type} wallet. Please try again.`,
        variant: "destructive",
      });
      return false;
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setWalletBalance(null);
    setWalletType(null);
    localStorage.removeItem('walletInfo');
    
    toast({
      title: "Wallet Disconnected",
      description: "You have successfully disconnected your wallet",
    });
  };

  const checkWalletAvailability = (walletType: WalletType): boolean => {
    // In a real implementation, check if the wallet is available in the window object
    // For demo purposes, we'll assume all wallets except 'Rise' are available
    
    // This is just for demonstration - replace with actual wallet detection
    // e.g. return window.aptos !== undefined for Petra wallet
    return walletType !== 'Rise';
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
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
