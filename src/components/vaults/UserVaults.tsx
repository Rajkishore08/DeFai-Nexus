
import { useState } from 'react';
import { TrendingUp, BarChart3, ArrowRightLeft, ArrowDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

type UserVault = {
  id: string;
  name: string;
  depositAmount: number;
  currentValue: number;
  apy: number;
  tokens: string[];
  platform: string;
  risk: 'high' | 'balanced' | 'low';
  lastOptimized: string;
};

// Mock data for user's active vaults
const mockUserVaults: UserVault[] = [
  {
    id: '1',
    name: 'ETH/USDC High Yield',
    depositAmount: 5000,
    currentValue: 5450,
    apy: 24.5,
    tokens: ['ETH', 'USDC'],
    platform: 'Uniswap V3',
    risk: 'high',
    lastOptimized: '2 hours ago'
  },
  {
    id: '3',
    name: 'BTC/ETH Hedged',
    depositAmount: 3000,
    currentValue: 3180,
    apy: 18.2,
    tokens: ['WBTC', 'ETH'],
    platform: 'Balancer',
    risk: 'balanced',
    lastOptimized: '5 hours ago'
  }
];

const UserVaults = () => {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [selectedVault, setSelectedVault] = useState<UserVault | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const totalValue = mockUserVaults.reduce((sum, vault) => sum + vault.currentValue, 0);
  const totalProfit = mockUserVaults.reduce((sum, vault) => sum + (vault.currentValue - vault.depositAmount), 0);
  
  const handleWithdraw = (vault: UserVault) => {
    setSelectedVault(vault);
    setIsWithdrawOpen(true);
  };
  
  const handleWithdrawSubmit = () => {
    // This would handle the actual withdrawal transaction in a real implementation
    toast.success(`Successfully withdrew $${withdrawAmount} from ${selectedVault?.name}`);
    setIsWithdrawOpen(false);
    setWithdrawAmount('');
  };
  
  const handleOptimize = () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
      toast.success('AI has optimized your vault allocations for maximum yield');
    }, 2000);
  };
  
  if (mockUserVaults.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium mb-2">You don't have any active vaults</h3>
        <p className="text-white/70 mb-6">Deposit funds into a vault to start earning AI-optimized yields</p>
        <Button className="bg-defi-gradient hover:opacity-90 text-white">Explore Vaults</Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-black/20 border border-white/10 p-6">
          <h3 className="text-white/70 text-sm mb-1">Total Value</h3>
          <p className="text-3xl font-bold text-white">${totalValue.toFixed(2)}</p>
        </Card>
        
        <Card className="bg-black/20 border border-white/10 p-6">
          <h3 className="text-white/70 text-sm mb-1">Total Profit/Loss</h3>
          <p className={`text-3xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ${totalProfit.toFixed(2)}
          </p>
        </Card>
        
        <Card className="bg-black/20 border border-white/10 p-6">
          <h3 className="text-white/70 text-sm mb-1">AI Optimization</h3>
          <Button 
            onClick={handleOptimize} 
            disabled={isOptimizing}
            className="w-full mt-2 bg-defi-gradient hover:opacity-90"
          >
            {isOptimizing ? 'Optimizing...' : 'Optimize Allocation'}
            <ArrowRightLeft className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockUserVaults.map((vault) => {
          const profit = vault.currentValue - vault.depositAmount;
          const profitPercentage = (profit / vault.depositAmount) * 100;
          
          return (
            <Card key={vault.id} className="bg-black/20 border border-white/10 p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white font-medium text-lg">{vault.name}</h3>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  vault.risk === 'high' ? 'bg-red-500/20 text-red-400' : 
                  vault.risk === 'balanced' ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-green-500/20 text-green-400'
                }`}>
                  {vault.risk.charAt(0).toUpperCase() + vault.risk.slice(1)} Risk
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-white/60 text-sm">Current Value</p>
                  <p className="text-xl font-bold text-white">${vault.currentValue.toFixed(2)}</p>
                </div>
                
                <div>
                  <p className="text-white/60 text-sm">Profit/Loss</p>
                  <div className="flex items-center">
                    <p className={`text-xl font-bold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${profit.toFixed(2)}
                    </p>
                    <span className={`ml-2 text-sm ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ({profitPercentage.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-1">
                <TrendingUp className="h-4 w-4 mr-2 text-defi-purple" />
                <span className="text-sm text-white/80">Current APY:</span>
                <span className="text-sm ml-2 text-defi-teal">{vault.apy}%</span>
              </div>
              
              <div className="flex items-center mb-1">
                <BarChart3 className="h-4 w-4 mr-2 text-defi-teal" />
                <span className="text-sm text-white/80">Assets:</span>
                <span className="text-sm ml-2 text-white">{vault.tokens.join(', ')}</span>
              </div>
              
              <div className="flex items-center mb-4">
                <ArrowRightLeft className="h-4 w-4 mr-2 text-defi-blue" />
                <span className="text-sm text-white/80">Last Optimized:</span>
                <span className="text-sm ml-2 text-white">{vault.lastOptimized}</span>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full border-white/20 text-white hover:bg-white/10"
                onClick={() => handleWithdraw(vault)}
              >
                Withdraw Funds <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          );
        })}
      </div>
      
      {/* Withdraw Dialog */}
      <Dialog open={isWithdrawOpen} onOpenChange={(open) => {
        setIsWithdrawOpen(open);
        if (!open) setWithdrawAmount('');
      }}>
        <DialogContent className="glass border border-white/10 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Withdraw Funds</DialogTitle>
            <DialogDescription>
              {selectedVault?.name} - Current Value: ${selectedVault?.currentValue.toFixed(2)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Amount to Withdraw</Label>
              <Input
                id="withdraw-amount"
                placeholder="Enter amount"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                min={0}
                max={selectedVault?.currentValue}
              />
              <div className="flex justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setWithdrawAmount((selectedVault?.currentValue || 0) / 4 + '')}
                >
                  25%
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setWithdrawAmount((selectedVault?.currentValue || 0) / 2 + '')}
                >
                  50%
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setWithdrawAmount((selectedVault?.currentValue || 0) * 0.75 + '')}
                >
                  75%
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setWithdrawAmount(selectedVault?.currentValue + '')}
                >
                  Max
                </Button>
              </div>
            </div>
            
            <div className="bg-black/20 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2">Withdrawal Details</h4>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Available Balance:</span>
                <span className="text-white">${selectedVault?.currentValue.toFixed(2)}</span>
              </div>
              
              {Number(withdrawAmount) > 0 && (
                <>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-white/60">Withdrawal Amount:</span>
                    <span className="text-white">${Number(withdrawAmount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Remaining Balance:</span>
                    <span className="text-white">
                      ${((selectedVault?.currentValue || 0) - Number(withdrawAmount)).toFixed(2)}
                    </span>
                  </div>
                </>
              )}
              
              <p className="text-xs text-white/60 mt-2">
                AI will optimize the withdrawal to minimize gas fees and slippage.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawOpen(false)}>Cancel</Button>
            <Button 
              className="bg-defi-gradient hover:opacity-90 text-white"
              onClick={handleWithdrawSubmit}
              disabled={!withdrawAmount || isNaN(Number(withdrawAmount)) || 
                Number(withdrawAmount) <= 0 || 
                Number(withdrawAmount) > (selectedVault?.currentValue || 0)}
            >
              Confirm Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserVaults;
