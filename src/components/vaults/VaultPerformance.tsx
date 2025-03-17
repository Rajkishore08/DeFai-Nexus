
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, LineChart } from 'lucide-react';

const VaultPerformance = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-black/20 border border-white/10 p-6">
          <div className="flex items-center mb-2">
            <BarChart3 className="h-5 w-5 mr-2 text-defi-teal" />
            <h3 className="text-white font-medium">Average APY</h3>
          </div>
          <p className="text-3xl font-bold text-defi-teal">18.7%</p>
          <p className="text-sm text-white/60 mt-1">Across all vaults</p>
        </Card>
        
        <Card className="bg-black/20 border border-white/10 p-6">
          <div className="flex items-center mb-2">
            <TrendingUp className="h-5 w-5 mr-2 text-defi-purple" />
            <h3 className="text-white font-medium">Total TVL</h3>
          </div>
          <p className="text-3xl font-bold text-white">$59.8M</p>
          <p className="text-sm text-white/60 mt-1">+12.4% this month</p>
        </Card>
        
        <Card className="bg-black/20 border border-white/10 p-6">
          <div className="flex items-center mb-2">
            <LineChart className="h-5 w-5 mr-2 text-defi-blue" />
            <h3 className="text-white font-medium">AI Optimizations</h3>
          </div>
          <p className="text-3xl font-bold text-defi-blue">142</p>
          <p className="text-sm text-white/60 mt-1">Last 24 hours</p>
        </Card>
      </div>
      
      <Tabs defaultValue="apy-trends">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="apy-trends">APY Trends</TabsTrigger>
          <TabsTrigger value="tvl-growth">TVL Growth</TabsTrigger>
          <TabsTrigger value="strategy-shifts">Strategy Shifts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apy-trends">
          <Card className="bg-black/20 border border-white/10 p-6">
            <h3 className="font-medium mb-4">Historical APY Trends</h3>
            <div className="h-64 flex items-center justify-center border border-white/10 rounded-md">
              <LineChart className="h-10 w-10 text-white/40" />
              <span className="ml-2 text-white/40">APY trend chart would appear here</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-black/40 p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">Top Performing Vault</h4>
                <p className="text-xl font-bold text-defi-teal">DeFi Blue Chips</p>
                <p className="text-defi-teal">32.5% APY</p>
              </div>
              
              <div className="bg-black/40 p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">Most Improved</h4>
                <p className="text-xl font-bold text-defi-blue">Polygon Yield Farmer</p>
                <p className="text-defi-blue">+3.2% this week</p>
              </div>
              
              <div className="bg-black/40 p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">Most Stable</h4>
                <p className="text-xl font-bold text-defi-purple">ETH Staking Enhanced</p>
                <p className="text-defi-purple">8.4% APY (±0.2%)</p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="tvl-growth">
          <Card className="bg-black/20 border border-white/10 p-6">
            <h3 className="font-medium mb-4">Total Value Locked Growth</h3>
            <div className="h-64 flex items-center justify-center border border-white/10 rounded-md">
              <BarChart3 className="h-10 w-10 text-white/40" />
              <span className="ml-2 text-white/40">TVL growth chart would appear here</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-black/40 p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">Fastest Growing Vault</h4>
                <p className="text-xl font-bold text-defi-teal">Stable Coins Basket</p>
                <p className="text-white/80">+$2.3M this month</p>
              </div>
              
              <div className="bg-black/40 p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">Highest TVL</h4>
                <p className="text-xl font-bold text-defi-purple">ETH Staking Enhanced</p>
                <p className="text-white/80">$22.5M total locked</p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="strategy-shifts">
          <Card className="bg-black/20 border border-white/10 p-6">
            <h3 className="font-medium mb-4">AI Strategy Adaptations</h3>
            
            <div className="space-y-6">
              <div className="bg-black/40 p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">Recent Strategy Shifts</h4>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <div>
                      <p className="font-medium">ETH/USDC High Yield</p>
                      <p className="text-sm text-white/60">Adjusted position ranges for better fee capture</p>
                    </div>
                    <p className="text-sm text-defi-teal">+2.1% APY</p>
                  </div>
                  
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <div>
                      <p className="font-medium">Stable Coins Basket</p>
                      <p className="text-sm text-white/60">Shifted allocation to optimize for USDC yield</p>
                    </div>
                    <p className="text-sm text-defi-teal">+0.8% APY</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">BTC/ETH Hedged</p>
                      <p className="text-sm text-white/60">Rebalanced to increase BTC exposure</p>
                    </div>
                    <p className="text-sm text-defi-teal">+1.2% APY</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">AI Strategy Response to Market Events</h4>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <div>
                      <p className="font-medium">Fed Rate Increase</p>
                      <p className="text-sm text-white/60">AI increased stablecoin allocation across vaults</p>
                    </div>
                    <p className="text-xs text-white/60">2 days ago</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">ETH Price Volatility</p>
                      <p className="text-sm text-white/60">AI adjusted hedging strategies to minimize impermanent loss</p>
                    </div>
                    <p className="text-xs text-white/60">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VaultPerformance;
