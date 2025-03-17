
import { LineChart, BarChart3, Zap, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

type VaultDetailsDialogProps = {
  vault: Vault;
  isOpen: boolean;
  onClose: () => void;
  onDeposit: () => void;
};

const VaultDetailsDialog = ({ vault, isOpen, onClose, onDeposit }: VaultDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="glass border border-white/10 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{vault.name}</DialogTitle>
          <DialogDescription>
            {vault.description}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="py-2">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 mr-2 text-defi-teal" />
                  <h3 className="font-medium">Current APY</h3>
                </div>
                <p className="text-3xl font-bold text-defi-teal">{vault.apy}%</p>
              </div>
              
              <div className="bg-black/20 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <BarChart3 className="h-5 w-5 mr-2 text-defi-purple" />
                  <h3 className="font-medium">Total Value Locked</h3>
                </div>
                <p className="text-3xl font-bold text-white">${(vault.tvl / 1000000).toFixed(1)}M</p>
              </div>
            </div>
            
            <div className="bg-black/20 p-4 rounded-md">
              <h3 className="font-medium mb-2">Assets</h3>
              <div className="flex flex-wrap gap-2">
                {vault.tokens.map(token => (
                  <div key={token} className="bg-white/10 rounded-full px-3 py-1 text-sm">
                    {token}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-black/20 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <Info className="h-5 w-5 mr-2 text-defi-blue" />
                <h3 className="font-medium">Platform & Risk</h3>
              </div>
              <p><span className="text-white/70">Platform:</span> {vault.platform}</p>
              <p><span className="text-white/70">Risk Level:</span> <span className={
                vault.risk === 'high' ? 'text-red-400' : 
                vault.risk === 'balanced' ? 'text-yellow-400' : 
                'text-green-400'
              }>{vault.risk.charAt(0).toUpperCase() + vault.risk.slice(1)}</span></p>
            </div>
          </TabsContent>
          
          <TabsContent value="strategy" className="space-y-4 pt-4">
            <div className="bg-black/20 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 mr-2 text-defi-teal" />
                <h3 className="font-medium">Strategy Details</h3>
              </div>
              <p className="mb-4">{vault.strategy}</p>
              
              <h4 className="font-medium text-sm mb-2">AI Optimization Features:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 mr-2 text-defi-purple mt-0.5" />
                  <span>Auto-rebalancing based on market conditions</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 mr-2 text-defi-purple mt-0.5" />
                  <span>Dynamic fee optimization for maximum efficiency</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 mr-2 text-defi-purple mt-0.5" />
                  <span>24/7 risk monitoring with automated adjustments</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 mr-2 text-defi-purple mt-0.5" />
                  <span>MEV protection for all transactions</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-black/20 p-4 rounded-md">
              <h3 className="font-medium mb-2">How It Works</h3>
              <p className="text-sm text-white/80">
                This vault uses AI to continuously scan for the best yield opportunities across multiple protocols. 
                When you deposit funds, the AI automatically allocates them to optimize returns while managing risk 
                according to your preferences. All rewards are auto-compounded to maximize growth.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4 pt-4">
            <div className="bg-black/20 p-4 rounded-md">
              <h3 className="font-medium mb-4">Historical Performance</h3>
              <div className="h-48 flex items-center justify-center border border-white/10 rounded-md">
                <LineChart className="h-10 w-10 text-white/40" />
                <span className="ml-2 text-white/40">Chart visualization would appear here</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black/20 p-4 rounded-md">
                <h4 className="text-sm text-white/70 mb-1">7 Day APY</h4>
                <p className="text-xl font-bold text-defi-teal">{(vault.apy * 0.98).toFixed(1)}%</p>
              </div>
              <div className="bg-black/20 p-4 rounded-md">
                <h4 className="text-sm text-white/70 mb-1">30 Day APY</h4>
                <p className="text-xl font-bold text-defi-teal">{(vault.apy * 0.95).toFixed(1)}%</p>
              </div>
              <div className="bg-black/20 p-4 rounded-md">
                <h4 className="text-sm text-white/70 mb-1">90 Day APY</h4>
                <p className="text-xl font-bold text-defi-teal">{(vault.apy * 0.92).toFixed(1)}%</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={onDeposit} className="bg-defi-gradient hover:opacity-90 text-white">
            Deposit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VaultDetailsDialog;
