
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet, WalletType } from '@/contexts/WalletContext';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface WalletOptionsProps {
  onConnect: () => void;
}

const WalletOptions = ({ onConnect }: WalletOptionsProps) => {
  const { connectWallet } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<WalletType | null>(null);

  const handleConnectWallet = async (walletType: WalletType) => {
    setSelectedWallet(walletType);
    setIsConnecting(true);
    setError(null);
    
    try {
      // For wallets that might not be installed (like Rise), we'll show an install option
      if (walletType === 'Rise') {
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

  const walletOptions: { name: WalletType; logo: string }[] = [
    { 
      name: 'Perta', 
      logo: "https://aptoslabs.com/images/logos/PetraLogo.svg" 
    },
    { 
      name: 'Petra', 
      logo: "https://aptoslabs.com/images/logos/PetraLogo.svg" 
    },
    { 
      name: 'Martian', 
      logo: "https://martianwallet.xyz/assets/icon.png" 
    },
    { 
      name: 'Pontem', 
      logo: "https://pontem.network/assets/img/pontem-logo.svg" 
    },
    { 
      name: 'Rise', 
      logo: "https://risewallet.io/logo.png" 
    }
  ];

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
            {selectedWallet === 'Rise' && (
              <Button 
                variant="link" 
                className="text-amber-300 p-0 h-auto text-xs flex items-center mt-1"
                onClick={() => window.open('https://risewallet.io/', '_blank')}
              >
                Install {selectedWallet} Wallet <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}

      {walletOptions.map((wallet) => (
        <Button
          key={wallet.name}
          variant="outline"
          className="flex items-center justify-between px-4 py-6 hover:bg-white/5"
          onClick={() => handleConnectWallet(wallet.name)}
          disabled={isConnecting}
        >
          <span>{wallet.name} Wallet</span>
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
        Don't have an Aptos wallet? We recommend installing Perta wallet to get started.
      </p>
    </div>
  );
};

export default WalletOptions;
