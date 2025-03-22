
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet, WalletType } from '@/contexts/WalletContext';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface WalletOptionsProps {
  onConnect: () => void;
}

const WalletOptions = ({ onConnect }: WalletOptionsProps) => {
  const { connectWallet, checkWalletAvailability } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<WalletType | null>(null);
  const [availableWallets, setAvailableWallets] = useState<{
    name: WalletType;
    logo: string;
    isInstalled: boolean;
    installUrl: string;
  }[]>([]);

  // Define wallet options with proper data
  const allWalletOptions: {
    name: WalletType;
    logo: string;
    installUrl: string;
  }[] = [
    {
      name: 'Petra',
      logo: "https://aptoslabs.com/images/logos/PetraLogo.svg",
      installUrl: "https://petra.app/download",
    },
    {
      name: 'Martian',
      logo: "https://martianwallet.xyz/assets/icon.png",
      installUrl: "https://martianwallet.xyz/",
    },
    {
      name: 'Pontem',
      logo: "https://pontem.network/assets/img/pontem-logo.svg",
      installUrl: "https://pontem.network/pontem-wallet",
    },
    {
      name: 'Rise',
      logo: "https://risewallet.io/logo.png",
      installUrl: "https://risewallet.io/",
    }
  ];

  // Check which wallets are installed
  useEffect(() => {
    const checkInstalledWallets = async () => {
      const walletAvailability = await Promise.all(
        allWalletOptions.map(async (wallet) => {
          const isInstalled = await checkWalletAvailability(wallet.name);
          return {
            ...wallet,
            isInstalled
          };
        })
      );
      
      setAvailableWallets(walletAvailability);
    };
    
    checkInstalledWallets();
  }, [checkWalletAvailability]);

  const handleConnectWallet = async (walletType: WalletType) => {
    setSelectedWallet(walletType);
    setIsConnecting(true);
    setError(null);
    
    try {
      const walletInfo = availableWallets.find(w => w.name === walletType);
      
      if (!walletInfo?.isInstalled) {
        setError(`${walletType} wallet is not installed. Please install it to continue.`);
        setIsConnecting(false);
        return;
      }
      
      const success = await connectWallet(walletType);
      if (success) {
        onConnect();
      } else {
        setError(`Failed to connect to ${walletType} wallet. Please try again.`);
      }
    } catch (err) {
      console.error('Wallet connection error:', err);
      setError(`An unexpected error occurred while connecting to ${walletType}.`);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="grid gap-4 py-4">
      <p className="text-sm text-white/70 text-center mb-2">
        Connect your preferred Aptos wallet to access the DeFAI Nexus ecosystem.
      </p>

      {error && (
        <Alert className="glass border-amber-500/20 bg-amber-500/10">
          <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
          <AlertDescription className="text-amber-200 text-sm">
            {error}
            {selectedWallet && (
              <Button 
                variant="link" 
                className="text-amber-300 p-0 h-auto text-xs flex items-center mt-1"
                onClick={() => {
                  const wallet = availableWallets.find(w => w.name === selectedWallet);
                  if (wallet) {
                    window.open(wallet.installUrl, '_blank');
                  }
                }}
              >
                Install {selectedWallet} Wallet <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}

      {availableWallets.map((wallet) => (
        <Button
          key={wallet.name}
          variant="outline"
          className={`flex items-center justify-between px-4 py-6 ${
            wallet.isInstalled ? 'hover:bg-white/5' : 'opacity-70 hover:bg-white/5'
          }`}
          onClick={() => handleConnectWallet(wallet.name)}
          disabled={isConnecting}
        >
          <div className="flex items-center">
            <span>{wallet.name} Wallet</span>
            {!wallet.isInstalled && (
              <span className="ml-2 text-xs text-amber-300">(Not Installed)</span>
            )}
          </div>
          <img 
            src={wallet.logo} 
            alt={`${wallet.name} Wallet`} 
            className="h-8 w-8" 
            onError={(e) => {
              // Fallback for broken images
              (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg";
            }} 
          />
        </Button>
      ))}

      <p className="text-xs text-white/50 text-center mt-2">
        Don't have an Aptos wallet? We recommend installing Petra wallet to get started.
      </p>
    </div>
  );
};

export default WalletOptions;
