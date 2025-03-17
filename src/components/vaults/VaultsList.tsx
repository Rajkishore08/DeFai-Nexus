
import { useState } from 'react';
import { TrendingUp, ArrowRight, Info, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import VaultDetailsDialog from './VaultDetailsDialog';

type Vault = {
  id: string;
  name: string;
  description: string;
  apy: number;
  risk: 'high' | 'balanced' | 'low';
  tvl: number;
  strategy: string;
  platform: string;
  tokens: string[];
};

// Mock data for vaults
const mockVaults: Vault[] = [
  {
    id: '1',
    name: 'ETH/USDC High Yield',
    description: 'AI-managed liquidity pool with dynamic fee optimization',
    apy: 24.5,
    risk: 'high',
    tvl: 8500000,
    strategy: 'Dynamic LP management with auto-compounding',
    platform: 'Uniswap V3',
    tokens: ['ETH', 'USDC']
  },
  {
    id: '2',
    name: 'Stable Coins Basket',
    description: 'Multi-chain stablecoin strategy with yield farming',
    apy: 12.8,
    risk: 'low',
    tvl: 14200000,
    strategy: 'Cross-chain stablecoin yield optimization',
    platform: 'Curve & Convex',
    tokens: ['USDC', 'USDT', 'DAI']
  },
  {
    id: '3',
    name: 'BTC/ETH Hedged',
    description: 'Hedged exposure to major cryptos with yield generation',
    apy: 18.2,
    risk: 'balanced',
    tvl: 6700000,
    strategy: 'Optimized LP positions with volatility hedging',
    platform: 'Balancer',
    tokens: ['WBTC', 'ETH']
  },
  {
    id: '4',
    name: 'DeFi Blue Chips',
    description: 'Auto-compounding strategy on top DeFi tokens',
    apy: 32.5,
    risk: 'high',
    tvl: 3200000,
    strategy: 'Auto-stake governance tokens with yield optimization',
    platform: 'Compound & Aave',
    tokens: ['UNI', 'AAVE', 'MKR', 'COMP']
  },
  {
    id: '5',
    name: 'ETH Staking Enhanced',
    description: 'Liquid staking with additional yield layers',
    apy: 8.4,
    risk: 'low',
    tvl: 22500000,
    strategy: 'ETH staking with yield-bearing derivatives',
    platform: 'Lido & Convex',
    tokens: ['ETH', 'stETH']
  },
  {
    id: '6',
    name: 'Polygon Yield Farmer',
    description: 'Cross-protocol yield farming on Polygon network',
    apy: 19.8,
    risk: 'balanced',
    tvl: 4700000,
    strategy: 'Multi-pool optimization with auto-compounding',
    platform: 'QuickSwap & AAVE',
    tokens: ['MATIC', 'USDC', 'WETH']
  }
];

type VaultsListProps = {
  riskLevel: 'high' | 'balanced' | 'low';
};

const VaultsList = ({ riskLevel }: VaultsListProps) => {
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  
  // Filter vaults based on selected risk level
  const filteredVaults = riskLevel === 'balanced' 
    ? mockVaults 
    : mockVaults.filter(vault => vault.risk === riskLevel);
    
  const handleOpenDetails = (vault: Vault) => {
    setSelectedVault(vault);
  };
  
  const handleDeposit = (vault: Vault) => {
    setSelectedVault(vault);
    setIsDepositOpen(true);
  };
  
  const handleDepositSubmit = () => {
    // This would handle the actual deposit transaction in a real implementation
    console.log(`Depositing ${depositAmount} into vault ${selectedVault?.name}`);
    setIsDepositOpen(false);
    setDepositAmount('');
    // Notification would go here in real implementation
  };
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVaults.map((vault) => (
          <Card key={vault.id} className="bg-black/20 border border-white/5 hover:border-white/20 transition-all p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-white font-medium text-lg">{vault.name}</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      vault.risk === 'high' ? 'bg-red-500/20 text-red-400' : 
                      vault.risk === 'balanced' ? 'bg-yellow-500/20 text-yellow-400' : 
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {vault.risk.charAt(0).toUpperCase() + vault.risk.slice(1)} Risk
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{
                      vault.risk === 'high' ? 'Higher potential returns but more volatility' : 
                      vault.risk === 'balanced' ? 'Moderate risk and returns' : 
                      'Lower but more stable returns'
                    }</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <p className="text-white/60 text-sm mt-2 mb-4">{vault.description}</p>
            
            <div className="flex items-center mb-1">
              <TrendingUp className="h-4 w-4 mr-2 text-defi-purple" />
              <span className="text-sm text-white/80">Platform:</span>
              <span className="text-sm ml-2 text-white">{vault.platform}</span>
            </div>
            
            <div className="flex items-center mb-1">
              <BarChart3 className="h-4 w-4 mr-2 text-defi-teal" />
              <span className="text-sm text-white/80">Assets:</span>
              <span className="text-sm ml-2 text-white">{vault.tokens.join(', ')}</span>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-col">
                <span className="text-xs text-white/60">APY</span>
                <span className="text-2xl font-bold text-defi-teal">{vault.apy}%</span>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-xs text-white/60">TVL</span>
                <span className="text-lg font-medium text-white">${(vault.tvl / 1000000).toFixed(1)}M</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button variant="outline" onClick={() => handleOpenDetails(vault)} className="border-white/20 text-white hover:bg-white/10">
                View Details <Info className="ml-1 h-4 w-4" />
              </Button>
              <Button onClick={() => handleDeposit(vault)} className="bg-defi-gradient hover:opacity-90 text-white">
                Deposit <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Details Dialog */}
      {selectedVault && (
        <VaultDetailsDialog 
          vault={selectedVault} 
          isOpen={!!selectedVault && !isDepositOpen} 
          onClose={() => setSelectedVault(null)} 
          onDeposit={() => setIsDepositOpen(true)}
        />
      )}
      
      {/* Deposit Dialog */}
      <Dialog open={isDepositOpen} onOpenChange={(open) => {
        setIsDepositOpen(open);
        if (!open) setDepositAmount('');
      }}>
        <DialogContent className="glass border border-white/10 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Deposit to Vault</DialogTitle>
            <DialogDescription>
              {selectedVault?.name} - Current APY: {selectedVault?.apy}%
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Deposit</Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
              <p className="text-sm text-white/60">
                AI will optimally allocate your funds based on your risk preference: <span className="font-medium text-defi-teal">{riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}</span>
              </p>
            </div>
            
            <div className="bg-black/20 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2">Estimated Returns</h4>
              {depositAmount && !isNaN(Number(depositAmount)) ? (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Daily:</span>
                    <span className="text-white">${((Number(depositAmount) * (selectedVault?.apy || 0) / 100) / 365).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Monthly:</span>
                    <span className="text-white">${((Number(depositAmount) * (selectedVault?.apy || 0) / 100) / 12).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Yearly:</span>
                    <span className="text-white">${(Number(depositAmount) * (selectedVault?.apy || 0) / 100).toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-white/60">Enter an amount to see estimated returns</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDepositOpen(false)}>Cancel</Button>
            <Button 
              className="bg-defi-gradient hover:opacity-90 text-white"
              onClick={handleDepositSubmit}
              disabled={!depositAmount || isNaN(Number(depositAmount)) || Number(depositAmount) <= 0}
            >
              Confirm Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VaultsList;
