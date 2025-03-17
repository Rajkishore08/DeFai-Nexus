
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface WalletOptionsProps {
  onConnect: () => void;
}

const WalletOptions = ({ onConnect }: WalletOptionsProps) => {
  const connectWallet = (walletName: string) => {
    // This would be replaced with actual wallet connection logic
    console.log(`Connecting to ${walletName}...`);
    
    // Simulate successful connection
    setTimeout(() => {
      toast({
        title: "Wallet Connected",
        description: `Successfully connected ${walletName}`,
      });
      onConnect();
    }, 1000);
  };

  return (
    <div className="grid gap-4 py-4">
      <p className="text-sm text-white/70 text-center mb-2">
        Connect your preferred wallet to access the DeFAI Nexus ecosystem.
      </p>

      <Button
        variant="outline"
        className="flex items-center justify-between px-4 py-6 hover:bg-white/5"
        onClick={() => connectWallet('MetaMask')}
      >
        <span>MetaMask</span>
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="h-8 w-8" />
      </Button>

      <Button
        variant="outline"
        className="flex items-center justify-between px-4 py-6 hover:bg-white/5"
        onClick={() => connectWallet('WalletConnect')}
      >
        <span>WalletConnect</span>
        <img src="https://1000logos.net/wp-content/uploads/2022/05/WalletConnect-Logo.png" alt="WalletConnect" className="h-8 w-8" />
      </Button>

      <Button
        variant="outline"
        className="flex items-center justify-between px-4 py-6 hover:bg-white/5"
        onClick={() => connectWallet('Coinbase Wallet')}
      >
        <span>Coinbase Wallet</span>
        <img src="https://uploads-ssl.webflow.com/63112dbc532ea60c7d707c96/637b4fe2a8d20c0f8a85f14c_Logo.svg" alt="Coinbase Wallet" className="h-8 w-8" />
      </Button>
    </div>
  );
};

export default WalletOptions;
