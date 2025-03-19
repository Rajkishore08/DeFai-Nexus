
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PieChart, 
  LineChart, 
  Rocket, 
  Zap, 
  Coins, 
  ArrowRight, 
  ArrowUpRight, 
  ArrowDownRight, 
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from 'sonner';

const Dashboard = () => {
  const { walletAddress, walletBalance } = useWallet();
  const [aiEnabled, setAiEnabled] = useState(false);
  
  const toggleAI = () => {
    setAiEnabled(!aiEnabled);
    toast.success(aiEnabled ? 'AI Trading disabled' : 'AI Trading enabled');
  };
  
  // Mock data for dashboard
  const portfolioValue = 12580.45;
  const dailyChange = 3.2;
  const portfolioDistribution = [
    { asset: 'APT', percentage: 60, value: 7548.27 },
    { asset: 'USDC', percentage: 20, value: 2516.09 },
    { asset: 'Staked Assets', percentage: 20, value: 2516.09 },
  ];
  
  const aiPerformance = [
    { name: 'Yield Optimization', value: '+12.3%', description: 'Increased APY through staking & lending' },
    { name: 'Arbitrage Success', value: '17 trades', description: 'Profitable arbitrage opportunities executed' },
    { name: 'Investment Growth', value: '+8.7%', description: 'AI-driven asset allocation improvements' },
  ];
  
  const investmentOptions = [
    { name: 'Aries Lending', apy: '5.2%', platform: 'Aries', asset: 'APT' },
    { name: 'Econia Liquidity', apy: '18.5%', platform: 'Econia', asset: 'APT/USDC' },
    { name: 'Aptoswap Farming', apy: '24.1%', platform: 'Aptoswap', asset: 'APT/USDT' },
  ];
  
  const arbitrageOpportunities = [
    { pairs: 'APT/USDC', exchanges: 'Econia → Aptoswap', profit: '0.8%' },
    { pairs: 'APT/USDT', exchanges: 'Hippo → Econia', profit: '0.5%' },
    { pairs: 'APTOS/ARB', exchanges: 'Liquid → Pontem', profit: '1.2%' },
  ];
  
  return (
    <DashboardLayout 
      title="Dashboard"
      description="Monitor your DeFi portfolio, analyze AI performance, and access investment opportunities."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Portfolio Value */}
        <Card className="bg-black/20 border border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-white/80 text-sm font-normal">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">${portfolioValue.toLocaleString()}</p>
                <p className="text-sm text-white/60">{walletBalance} APT</p>
              </div>
              <div className={`flex items-center ${dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {dailyChange >= 0 ? (
                  <ArrowUpRight className="h-5 w-5 mr-1" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 mr-1" />
                )}
                <span className="font-medium">{Math.abs(dailyChange)}% today</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Health Score */}
        <Card className="bg-black/20 border border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-white/80 text-sm font-normal">Portfolio Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-2xl font-bold">85/100</p>
                </div>
                <p className="text-sm text-white/60">Well-balanced portfolio</p>
              </div>
              <Target className="h-6 w-6 text-white/60" />
            </div>
          </CardContent>
        </Card>

        {/* AI Trading Status */}
        <Card className="bg-black/20 border border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-white/80 text-sm font-normal">AI Trading Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{aiEnabled ? 'Enabled' : 'Disabled'}</p>
                <p className="text-sm text-white/60">
                  {aiEnabled ? 'Actively managing assets' : 'Manual management only'}
                </p>
              </div>
              <Button 
                variant={aiEnabled ? "destructive" : "default"} 
                className={aiEnabled ? "" : "bg-defi-gradient"}
                onClick={toggleAI}
              >
                {aiEnabled ? 'Disable AI' : 'Enable AI'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Address */}
        <Card className="bg-black/20 border border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-white/80 text-sm font-normal">Wallet Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-mono font-medium truncate max-w-[180px]">
                  {walletAddress}
                </p>
                <p className="text-sm text-white/60">Aptos Network</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => {
                navigator.clipboard.writeText(walletAddress || '');
                toast.success('Address copied to clipboard');
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Portfolio Overview */}
        <Card className="bg-black/20 border border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-defi-teal" />
                Portfolio Overview
              </CardTitle>
              <Link to="/portfolio">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription className="text-white/60">
              Your asset allocation and holdings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden flex">
                  <div className="h-full bg-defi-teal" style={{ width: '60%' }}></div>
                  <div className="h-full bg-defi-blue" style={{ width: '20%' }}></div>
                  <div className="h-full bg-defi-purple" style={{ width: '20%' }}></div>
                </div>
              </div>
              
              <div className="space-y-3">
                {portfolioDistribution.map((asset) => (
                  <div key={asset.asset} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-2 ${
                        asset.asset === 'APT' ? 'bg-defi-teal' : 
                        asset.asset === 'USDC' ? 'bg-defi-blue' : 'bg-defi-purple'
                      }`} />
                      <span className="text-white/80">{asset.asset}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-medium">{asset.percentage}%</span>
                      <span className="text-white/60 ml-2 text-sm">${asset.value.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Performance Insights */}
        <Card className="bg-black/20 border border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium flex items-center">
                <Rocket className="h-5 w-5 mr-2 text-defi-purple" />
                AI Performance Insights
              </CardTitle>
              
              <Button 
                variant={aiEnabled ? "outline" : "default"}
                onClick={toggleAI}
                className={aiEnabled ? "border-white/20 text-white hover:bg-white/10" : "bg-defi-gradient"}
              >
                {aiEnabled ? 'AI Enabled' : 'Enable AI'}
              </Button>
            </div>
            <CardDescription className="text-white/60">
              Performance metrics for AI-managed positions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiPerformance.map((metric) => (
                <div key={metric.name} className="bg-black/40 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-white font-medium">{metric.name}</h4>
                    <span className="text-defi-teal font-bold">{metric.value}</span>
                  </div>
                  <p className="text-white/60 text-sm">{metric.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DeFi Investment Options */}
        <Card className="bg-black/20 border border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium flex items-center">
                <Coins className="h-5 w-5 mr-2 text-defi-teal" />
                DeFi Investment Options
              </CardTitle>
              
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Deposit Funds
              </Button>
            </div>
            <CardDescription className="text-white/60">
              Top yield opportunities on Aptos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investmentOptions.map((option) => (
                <div key={option.name} className="bg-black/40 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h4 className="text-white font-medium">{option.name}</h4>
                      <p className="text-white/60 text-sm">{option.platform} • {option.asset}</p>
                    </div>
                    <span className="text-defi-teal font-bold">{option.apy}</span>
                  </div>
                </div>
              ))}
              
              <Link to="/vaults">
                <Button variant="default" className="w-full bg-defi-gradient hover:opacity-90">
                  View All Investment Options
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Trading & Arbitrage */}
        <Card className="bg-black/20 border border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium flex items-center">
                <Zap className="h-5 w-5 mr-2 text-defi-teal" />
                Trading & Arbitrage
              </CardTitle>
              
              <Link to="/arbitrage">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Start Arbitrage
                </Button>
              </Link>
            </div>
            <CardDescription className="text-white/60">
              Live DEX price differences and opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {arbitrageOpportunities.map((opportunity) => (
                <div key={opportunity.pairs} className="bg-black/40 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h4 className="text-white font-medium">{opportunity.pairs}</h4>
                      <p className="text-white/60 text-sm">{opportunity.exchanges}</p>
                    </div>
                    <span className="text-defi-teal font-bold">{opportunity.profit}</span>
                  </div>
                </div>
              ))}
              
              <Link to="/arbitrage">
                <Button variant="default" className="w-full bg-defi-gradient hover:opacity-90">
                  View All Arbitrage Opportunities
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
