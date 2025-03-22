
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton';
import WalletHeader from '@/components/wallet/WalletHeader';
import { useWallet } from '@/contexts/WalletContext';
import MobileSidebar from './MobileSidebar';
import BackButton from '@/components/shared/BackButton';

const Header = () => {
  const { isConnected } = useWallet();
  const location = useLocation();
  const showBackButton = location.pathname !== '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <MobileSidebar />
            {showBackButton && (
              <BackButton />
            )}
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="DeFAI Nexus Logo" className="h-8 w-8 md:h-10 md:w-10" />
              <div>
                <span className="font-bold text-xl md:text-2xl text-white">DeFAI</span>
                <span className="font-light text-xl md:text-2xl text-defi-teal"> Nexus</span>
              </div>
            </Link>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center gap-4">
            {isConnected ? <WalletHeader /> : <ConnectWalletButton />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
