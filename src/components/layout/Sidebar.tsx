
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

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="w-64 h-screen fixed left-0 top-0 pt-20 glass overflow-y-auto hidden md:block">
      <div className="p-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive 
                    ? "bg-defi-gradient text-white" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
                {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
