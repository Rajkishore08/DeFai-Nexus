
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  PieChart, 
  Rocket, 
  Coins, 
  RefreshCw, 
  Zap, 
  Search, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'Portfolio', icon: PieChart, path: '/portfolio' },
  { name: 'AI Trading Agents', icon: Rocket, path: '/market-maker' },
  { name: 'Yield Optimization', icon: Coins, path: '/vaults' },
  { name: 'Portfolio Rebalancing', icon: RefreshCw, path: '/copy-trading' },
  { name: 'Arbitrage Trader', icon: Zap, path: '/arbitrage' },
  { name: 'Token Predictor', icon: Search, path: '/token-predictor' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const MobileSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 text-white" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="glass border-defi-violet/20 p-0">
        <div className="pt-14 h-full overflow-y-auto">
          <nav className="space-y-2 p-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive 
                      ? "bg-defi-gradient text-white" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
