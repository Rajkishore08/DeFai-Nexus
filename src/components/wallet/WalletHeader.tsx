
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { 
  Wallet, 
  LogOut, 
  RefreshCw, 
  ChevronDown 
} from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Alert, 
  AlertDescription 
} from '@/components/ui/alert';

const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const WalletHeader = () => {
  const { 
    isConnected, 
    walletAddress, 
    walletBalance, 
    walletType, 
    disconnectWallet 
  } = useWallet();

  if (!isConnected || !walletAddress) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="border-white/10 bg-white/5 hover:bg-white/10"
        >
          <Wallet className="h-4 w-4 mr-2" />
          <span className="mr-1">{truncateAddress(walletAddress)}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-72 glass border border-white/10 text-white"
        align="end"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm opacity-70">Connected Wallet</h4>
            <div className="flex items-center justify-between">
              <div className="font-mono text-sm">{walletAddress}</div>
              <div className="text-xs bg-white/10 rounded px-2 py-1">{walletType}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm opacity-70">APT Balance</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2"
                onClick={() => console.log('Refresh balance')}
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
            <Alert className="glass border-white/10">
              <AlertDescription className="flex items-center justify-between font-medium">
                <span>{walletBalance} APT</span>
                <span className="text-xs opacity-70">
                  ≈ ${(parseFloat(walletBalance || '0') * 10.42).toFixed(2)}
                </span>
              </AlertDescription>
            </Alert>
          </div>
          
          <Button 
            variant="destructive" 
            className="w-full mt-2"
            onClick={disconnectWallet}
          >
            <LogOut className="h-4 w-4 mr-2" /> Disconnect Wallet
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WalletHeader;
