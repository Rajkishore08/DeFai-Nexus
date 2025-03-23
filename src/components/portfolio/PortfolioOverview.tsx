import { Card, CardContent } from '@/components/ui/card';
import { PieChart, LineChart, ArrowUpRight, ArrowDownRight, Target, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type AssetAllocation = {
  category: string;
  percentage: number;
  value: number;
  color: string;
};

const mockAssetAllocation: AssetAllocation[] = [
  { category: 'Staking', percentage: 35, value: 3500, color: 'bg-defi-teal' },
  { category: 'Yield Farming', percentage: 25, value: 2500, color: 'bg-defi-blue' },
  { category: 'Lending', percentage: 20, value: 2000, color: 'bg-defi-purple' },
  { category: 'Liquidity Pools', percentage: 15, value: 1500, color: 'bg-defi-pink' },
  { category: 'Market Position', percentage: 5, value: 500, color: 'bg-defi-violet' },
];

const PortfolioOverview = () => {
  const totalPortfolioValue = mockAssetAllocation.reduce((total, asset) => total + asset.value, 0);
  const dailyChange = 3.2; // Mock daily percentage change
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/20 border border-white/10 p-6 col-span-1 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium text-white">Portfolio Value</h3>
            <div className={`flex items-center ${dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {dailyChange >= 0 ? (
                <ArrowUpRight className="h-5 w-5 mr-1" />
              ) : (
                <ArrowDownRight className="h-5 w-5 mr-1" />
              )}
              <span className="font-medium">{Math.abs(dailyChange)}% today</span>
            </div>
          </div>
          <p className="text-4xl font-bold text-white mb-2">${totalPortfolioValue.toLocaleString()}</p>
          <p className="text-white/60">Total value across all platforms</p>
          
          <div className="h-48 mt-6 flex items-center justify-center border border-white/10 rounded-md">
            <LineChart className="h-10 w-10 text-white/40" />
            <span className="ml-2 text-white/40">Value trend chart would appear here</span>
          </div>
        </Card>
        
        <Card className="bg-black/20 border border-white/10 p-6">
          <div className="flex items-center mb-4">
            <PieChart className="h-5 w-5 mr-2 text-defi-teal" />
            <h3 className="text-xl font-medium text-white">Asset Allocation</h3>
          </div>
          
          <div className="h-48 mt-2 mb-6 flex items-center justify-center">
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 rounded-full border-4 border-white/10 flex items-center justify-center">
                <span className="text-sm font-medium">AI Optimized</span>
              </div>
              <div className="h-full w-full" style={{ position: 'relative' }}>
                {mockAssetAllocation.map((asset, index) => (
                  <div 
                    key={asset.category}
                    className={`absolute h-8 w-8 rounded-full ${asset.color}`}
                    style={{ 
                      top: `${Math.sin(index * (Math.PI * 2 / mockAssetAllocation.length)) * 50 + 50}%`,
                      left: `${Math.cos(index * (Math.PI * 2 / mockAssetAllocation.length)) * 50 + 50}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {mockAssetAllocation.map((asset) => (
              <div key={asset.category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full ${asset.color} mr-2`} />
                  <span className="text-white/80">{asset.category}</span>
                </div>
                <span className="text-white font-medium">{asset.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue="assets">
        <TabsList className="grid grid-cols-3 md:w-auto mb-6">
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assets">
          <Card className="bg-black/20 border border-white/10 p-6">
            <h3 className="text-xl font-medium text-white mb-4">DeFi Assets</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-white/60 font-medium">Asset</th>
                    <th className="py-3 px-4 text-white/60 font-medium">Platform</th>
                    <th className="py-3 px-4 text-white/60 font-medium">Strategy</th>
                    <th className="py-3 px-4 text-white/60 font-medium">Value</th>
                    <th className="py-3 px-4 text-white/60 font-medium">APY</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-white">ETH</td>
                    <td className="py-3 px-4 text-white/80">Lido</td>
                    <td className="py-3 px-4 text-white/80">Staking</td>
                    <td className="py-3 px-4 text-white">$2,400</td>
                    <td className="py-3 px-4 text-defi-teal">4.2%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-white">USDC/ETH</td>
                    <td className="py-3 px-4 text-white/80">Uniswap V3</td>
                    <td className="py-3 px-4 text-white/80">Liquidity Pool</td>
                    <td className="py-3 px-4 text-white">$1,500</td>
                    <td className="py-3 px-4 text-defi-teal">18.5%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-white">wBTC</td>
                    <td className="py-3 px-4 text-white/80">AAVE</td>
                    <td className="py-3 px-4 text-white/80">Lending</td>
                    <td className="py-3 px-4 text-white">$1,800</td>
                    <td className="py-3 px-4 text-defi-teal">3.1%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-white">MATIC</td>
                    <td className="py-3 px-4 text-white/80">Polygon</td>
                    <td className="py-3 px-4 text-white/80">Staking</td>
                    <td className="py-3 px-4 text-white">$1,100</td>
                    <td className="py-3 px-4 text-defi-teal">5.6%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white">BAL/ETH</td>
                    <td className="py-3 px-4 text-white/80">Balancer</td>
                    <td className="py-3 px-4 text-white/80">Yield Farming</td>
                    <td className="py-3 px-4 text-white">$2,200</td>
                    <td className="py-3 px-4 text-defi-teal">12.3%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card className="bg-black/20 border border-white/10 p-6">
            <h3 className="text-xl font-medium text-white mb-4">Performance Metrics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-black/40 p-4 rounded-md">
                <p className="text-white/60 text-sm mb-1">30-Day Return</p>
                <p className="text-2xl font-bold text-defi-teal">+8.4%</p>
                <p className="text-white/60 text-xs">+$410 USD</p>
              </div>
              
              <div className="bg-black/40 p-4 rounded-md">
                <p className="text-white/60 text-sm mb-1">90-Day Return</p>
                <p className="text-2xl font-bold text-defi-teal">+21.2%</p>
                <p className="text-white/60 text-xs">+$985 USD</p>
              </div>
              
              <div className="bg-black/40 p-4 rounded-md">
                <p className="text-white/60 text-sm mb-1">Average APY</p>
                <p className="text-2xl font-bold text-defi-teal">14.3%</p>
                <p className="text-white/60 text-xs">Across all assets</p>
              </div>
            </div>
            
            <div className="h-64 flex items-center justify-center border border-white/10 rounded-md">
              <LineChart className="h-10 w-10 text-white/40" />
              <span className="ml-2 text-white/40">Performance chart would appear here</span>
            </div>
            
            <div className="mt-6">
              <h4 className="text-lg font-medium text-white mb-3">Risk Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/40 p-4 rounded-md">
                  <p className="text-white/60 text-sm mb-1">Risk Exposure</p>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-defi-teal h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <span className="ml-2 text-white">Low</span>
                  </div>
                  <p className="text-white/60 text-xs mt-2">AI is maintaining a lower risk exposure due to market volatility</p>
                </div>
                
                <div className="bg-black/40 p-4 rounded-md">
                  <p className="text-white/60 text-sm mb-1">Impermanent Loss Protection</p>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-defi-blue h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="ml-2 text-white">75%</span>
                  </div>
                  <p className="text-white/60 text-xs mt-2">AI has optimized LP positions to minimize impermanent loss</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card className="bg-black/20 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 text-defi-teal" />
                <h3 className="text-xl font-medium text-white">AI-Optimized Portfolio Strategy</h3>
              </div>
              <span className="text-white/60 text-sm">Last updated: 2 hours ago</span>
            </div>
            
            <div className="space-y-6">
              <div className="bg-black/40 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <Target className="h-5 w-5 mr-2 text-defi-purple" />
                  <h4 className="text-lg font-medium text-white">Investment Goal</h4>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="bg-defi-purple/20 border border-defi-purple/50 text-defi-purple rounded-full px-3 py-1 text-sm font-medium">
                    Growth
                  </div>
                  <div className="bg-white/5 border border-white/10 text-white/70 rounded-full px-3 py-1 text-sm">
                    Income
                  </div>
                  <div className="bg-white/5 border border-white/10 text-white/70 rounded-full px-3 py-1 text-sm">
                    Balanced
                  </div>
                </div>
                
                <p className="text-white/80 text-sm">
                  Your portfolio is currently optimized for <span className="text-defi-purple font-medium">Growth</span>, 
                  which prioritizes capital appreciation over stable income.
                </p>
              </div>
              
              <div className="bg-black/40 p-4 rounded-md">
                <h4 className="text-lg font-medium text-white mb-3">Recommended Reallocations</h4>
                
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-white font-medium">USDC/ETH (Uniswap V3)</span>
                      <span className="text-defi-teal">+$500</span>
                    </div>
                    <p className="text-white/60 text-sm">
                      Increase allocation to take advantage of high trading fees and expected ETH price movement.
                    </p>
                  </div>
                  
                  <div className="border-b border-white/10 pb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-white font-medium">wBTC (AAVE)</span>
                      <span className="text-red-400">-$250</span>
                    </div>
                    <p className="text-white/60 text-sm">
                      Reduce lending position due to declining yields and move to more profitable strategies.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white font-medium">MATIC/USDC (QuickSwap)</span>
                      <span className="text-defi-teal">+$250</span>
                    </div>
                    <p className="text-white/60 text-sm">
                      New opportunity: Add position to capture high APY from liquidity mining incentives.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 p-4 rounded-md">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-medium text-white">Auto-Rebalancing</h4>
                  <div className="flex items-center gap-2 bg-defi-teal/20 text-defi-teal px-2 py-1 rounded-full text-xs font-medium">
                    <span className="h-2 w-2 bg-defi-teal rounded-full"></span>
                    Enabled
                  </div>
                </div>
                
                <p className="text-white/80 text-sm mb-3">
                  AI will automatically rebalance your portfolio to maintain optimal allocation. Next rebalance scheduled in 48 hours.
                </p>
                
                <div className="text-white/60 text-sm flex items-center gap-1">
                  <span>Last rebalance:</span>
                  <span className="text-white">4 days ago</span>
                  <span>(+1.2% improvement)</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioOverview;
