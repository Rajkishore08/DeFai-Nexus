
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Wallet } from 'lucide-react';
import WalletOptions from './WalletOptions';
import { useWallet } from '@/contexts/WalletContext';

const ConnectWalletButton = () => {
  const { isWalletModalOpen, setIsWalletModalOpen, isConnected } = useWallet();
  
  if (isConnected) {
    return null; // Don't render the button if already connected
  }
  
  return (
    <Dialog open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-button-gradient hover:opacity-90 transition-opacity text-white font-medium"
        >
          <Wallet className="h-4 w-4 mr-2" /> Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border border-white/10 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-2">Connect Wallet</DialogTitle>
        </DialogHeader>
        <WalletOptions onConnect={() => setIsWalletModalOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWalletButton;
