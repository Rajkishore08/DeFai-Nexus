
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Vaults', path: '/vaults' },
    { name: 'Market Maker', path: '/market-maker' },
    { name: 'Arbitrage', path: '/arbitrage' },
    { name: 'Copy Trading', path: '/copy-trading' },
    { name: 'Token Predictor', path: '/token-predictor' },
    { name: 'Meme Index', path: '/meme-index' },
    { name: 'MEV Protection', path: '/mev-protection' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="DeFAI Nexus Logo" className="h-8 w-8 md:h-10 md:w-10" />
            <div>
              <span className="font-bold text-xl md:text-2xl text-white">DeFAI</span>
              <span className="font-light text-xl md:text-2xl text-defi-teal"> Nexus</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-white/80 hover:text-white hover:glow transition-all"
              >
                {link.name}
              </Link>
            ))}
            <ConnectWalletButton />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ConnectWalletButton />
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-6 w-6 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-defi-gradient border-defi-violet/20">
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <img src="/logo.svg" alt="DeFAI Nexus Logo" className="h-8 w-8" />
                    <span className="font-bold text-xl text-white">DeFAI Nexus</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-6 w-6 text-white" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-white/80 hover:text-white py-2 hover:bg-white/5 rounded-md pl-2 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
