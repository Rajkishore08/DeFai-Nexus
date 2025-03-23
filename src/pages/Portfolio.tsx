
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PortfolioOverview from '@/components/portfolio/PortfolioOverview';
import InvestmentGoalsDialog from '@/components/portfolio/InvestmentGoalsDialog';
import RebalanceDialog from '@/components/portfolio/RebalanceDialog';
import InvestmentOpportunityDialog from '@/components/portfolio/InvestmentOpportunityDialog';
import RiskMitigationDialog from '@/components/portfolio/RiskMitigationDialog';
import ManageAssetDialog from '@/components/portfolio/ManageAssetDialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PieChart, 
  Target, 
  RefreshCw, 
  ArrowRight, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  AlertTriangle,
  LineChartIcon
} from 'lucide-react';
import { toast } from 'sonner';

type InvestmentGoal = 'growth' | 'income' | 'balanced';
type AssetType = 'staking' | 'liquidity-pool' | 'lending' | 'yield-farming';

const Portfolio = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [riskProtection, setRiskProtection] = useState(true);
  const [investmentGoal, setInvestmentGoal] = useState<InvestmentGoal>('balanced');
  const [isInvestmentGoalDialogOpen, setIsInvestmentGoalDialogOpen] = useState(false);
  
  // New dialog state
  const [isRebalanceDialogOpen, setIsRebalanceDialogOpen] = useState(false);
  const [isInvestmentOpportunityDialogOpen, setIsInvestmentOpportunityDialogOpen] = useState(false);
  const [isRiskMitigationDialogOpen, setIsRiskMitigationDialogOpen] = useState(false);
  const [isManageAssetDialogOpen, setIsManageAssetDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<{
    name: string;
    platform: string;
    strategy: AssetType;
    value: number;
    apy: number;
  } | null>(null);
  
  // Mock data
  const investmentOpportunity = {
    name: 'APT/ARB Farming Pool',
    platform: 'Pontem DEX',
    estimatedApy: '22.8%',
    description: 'This new farming pool offers boosted rewards for early liquidity providers. The pool is secured by the protocol and offers auto-compounding features.',
    minInvestment: 500,
    maxInvestment: 10000,
    duration: '30 days lock-up period',
    riskLevel: 'medium' as const
  };
  
  const riskWarningDetails = {
    title: 'Liquidation Risk',
    asset: 'WBTC Lending',
    description: 'Your collateral ratio is approaching minimum threshold (125%)',
    severity: 'high' as const,
    currentRatio: 132,
    minimumRatio: 125,
    recommendedAction: 'add-collateral' as const,
    recommendedAmount: 500
  };
  
  const handleOptimizePortfolio = () => {
    setIsOptimizing(true);
    // Simulate AI optimization process
    setTimeout(() => {
      setIsOptimizing(false);
      toast.success('Portfolio has been optimized for maximum performance');
    }, 2000);
  };

  const toggleRiskProtection = () => {
    setRiskProtection(!riskProtection);
    toast.success(riskProtection 
      ? 'Risk protection disabled' 
      : 'Risk protection enabled - your portfolio is now protected from MEV attacks and liquidation risks'
    );
  };

  const handleSaveInvestmentGoal = (goal: InvestmentGoal) => {
    setInvestmentGoal(goal);
    // In a real app, we would save this to the backend
    console.log(`Investment goal updated to: ${goal}`);
  };
  
  const handleManageAsset = (asset: {
    name: string;
    platform: string;
    strategy: AssetType;
    value: number;
    apy: number;
  }) => {
    setSelectedAsset(asset);
    setIsManageAssetDialogOpen(true);
  };
  
  // Mock portfolio data
  const portfolioValue = 12580.45;
  const dailyChange = 3.2;
  const weeklyChange = 5.8;
  const monthlyChange = -2.1;
  const allTimeChange = 24.6;
  
  const riskWarnings = [
    { 
      title: 'Impermanent Loss Risk', 
      asset: 'APT/USDC LP', 
      description: 'High price volatility may lead to impermanent loss in Econia liquidity pool',
      severity: 'medium'
    },
    { 
      title: 'Liquidation Risk', 
      asset: 'WBTC Lending', 
      description: 'Your collateral ratio is approaching minimum threshold (125%)',
      severity: 'high'
    },
  ];
  
  return (
    <DashboardLayout 
      title="Portfolio Dashboard"
      description="Detailed insights into your DeFi portfolio with AI-powered optimization and risk analytics."
    >
      {/* Top Cards */}
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
                <div className={`flex items-center mt-1 ${dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {dailyChange >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm">{Math.abs(dailyChange)}% today</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white/70 border-white/10"
                onClick={() => toast.success('Portfolio report exported')}
              >
                <Download className="h-4 w-4 mr-1" /> Export
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Performance - 1W */}
        <Card className="bg-black/20 border border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-white/80 text-sm font-normal">1 Week Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`flex items-center ${weeklyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {weeklyChange >= 0 ? (
                  <ArrowUpRight className="h-5 w-5 mr-1" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 mr-1" />
                )}
                <span className="text-2xl font-bold">{Math.abs(weeklyChange)}%</span>
              </div>
              <span className="text-white/60 text-sm ml-2">
                {weeklyChange >= 0 ? '+' : '-'}${(portfolioValue * Math.abs(weeklyChange) / 100).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
        
        {/* Performance - 1M */}
        <Card className="bg-black/20 border border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-white/80 text-sm font-normal">1 Month Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`flex items-center ${monthlyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {monthlyChange >= 0 ? (
                  <ArrowUpRight className="h-5 w-5 mr-1" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 mr-1" />
                )}
                <span className="text-2xl font-bold">{Math.abs(monthlyChange)}%</span>
              </div>
              <span className="text-white/60 text-sm ml-2">
                {monthlyChange >= 0 ? '+' : '-'}${(portfolioValue * Math.abs(monthlyChange) / 100).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
        
        {/* Performance - All Time */}
        <Card className="bg-black/20 border border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-white/80 text-sm font-normal">All Time Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`flex items-center ${allTimeChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {allTimeChange >= 0 ? (
                  <ArrowUpRight className="h-5 w-5 mr-1" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 mr-1" />
                )}
                <span className="text-2xl font-bold">{Math.abs(allTimeChange)}%</span>
              </div>
              <span className="text-white/60 text-sm ml-2">
                {allTimeChange >= 0 ? '+' : '-'}${(portfolioValue * Math.abs(allTimeChange) / 100).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Portfolio Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-black/20 border border-white/10 p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <PieChart className="h-5 w-5 mr-2 text-defi-teal" />
            <h3 className="font-medium text-white">Portfolio Optimization</h3>
          </div>
          
          <p className="text-sm text-white/70 mb-4 flex-grow">
            AI analyzes market conditions and rebalances your portfolio for optimal returns. 
            Enable auto-optimization or trigger it manually.
          </p>
          
          <Button 
            onClick={handleOptimizePortfolio} 
            disabled={isOptimizing} 
            className="w-full bg-defi-gradient hover:opacity-90"
          >
            {isOptimizing ? 'Optimizing...' : 'Optimize Portfolio'}
            <RefreshCw className={`ml-2 h-4 w-4 ${isOptimizing ? 'animate-spin' : ''}`} />
          </Button>
        </Card>
        
        <Card className="bg-black/20 border border-white/10 p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <Target className="h-5 w-5 mr-2 text-defi-purple" />
            <h3 className="font-medium text-white">Investment Goals</h3>
          </div>
          
          <p className="text-sm text-white/70 mb-4 flex-grow">
            {investmentGoal === 'growth' && 'Currently optimized for growth with higher risk tolerance and potential returns.'}
            {investmentGoal === 'income' && 'Currently optimized for stable income through staking and lending.'}
            {investmentGoal === 'balanced' && 'Currently using a balanced approach with diversified risk and return.'}
          </p>
          
          <Button 
            variant="outline" 
            className="w-full border-white/20 text-white hover:bg-white/10"
            onClick={() => setIsInvestmentGoalDialogOpen(true)}
          >
            Adjust Investment Goals
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
        
        <Card className="bg-black/20 border border-white/10 p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <ShieldCheck className="h-5 w-5 mr-2 text-defi-blue" />
            <h3 className="font-medium text-white">Risk Protection</h3>
          </div>
          
          <p className="text-sm text-white/70 mb-4 flex-grow">
            Enable AI-powered risk protection to prevent liquidations and protect against MEV attacks and market volatility.
          </p>
          
          <Button 
            variant={riskProtection ? "default" : "outline"} 
            className={riskProtection ? "w-full bg-defi-gradient hover:opacity-90" : "w-full border-white/20 text-white hover:bg-white/10"}
            onClick={toggleRiskProtection}
          >
            {riskProtection ? 'Protection Enabled' : 'Enable Protection'}
            <ShieldCheck className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </div>
      
      {/* Risk Warnings */}
      {riskWarnings.length > 0 && (
        <Card className="bg-black/20 border border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              Risk Alerts
            </CardTitle>
            <CardDescription className="text-white/60">
              AI-detected risks in your portfolio that need attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskWarnings.map((warning, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md border ${
                    warning.severity === 'high' 
                      ? 'border-red-500/50 bg-red-500/10' 
                      : 'border-amber-500/50 bg-amber-500/10'
                  }`}
                >
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium text-white">{warning.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      warning.severity === 'high' 
                        ? 'bg-red-500/20 text-red-500' 
                        : 'bg-amber-500/20 text-amber-500'
                    }`}>
                      {warning.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-white/80 mb-1">Asset: {warning.asset}</p>
                  <p className="text-sm text-white/60">{warning.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Portfolio Overview Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <PortfolioOverview />
        </TabsContent>
        
        <TabsContent value="assets">
          <Card className="bg-black/20 border border-white/10">
            <CardHeader>
              <CardTitle>Your DeFi Assets</CardTitle>
              <CardDescription>All your assets across Aptos DeFi protocols</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 text-white/60 font-medium">Asset</th>
                      <th className="py-3 px-4 text-white/60 font-medium">Platform</th>
                      <th className="py-3 px-4 text-white/60 font-medium">Strategy</th>
                      <th className="py-3 px-4 text-white/60 font-medium">Value</th>
                      <th className="py-3 px-4 text-white/60 font-medium">APY</th>
                      <th className="py-3 px-4 text-white/60 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white">APT</td>
                      <td className="py-3 px-4 text-white/80">Liquid Staking</td>
                      <td className="py-3 px-4 text-white/80">Staking</td>
                      <td className="py-3 px-4 text-white">$4,200</td>
                      <td className="py-3 px-4 text-defi-teal">4.8%</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleManageAsset({
                            name: 'APT',
                            platform: 'Liquid Staking',
                            strategy: 'staking',
                            value: 4200,
                            apy: 4.8
                          })}
                        >
                          Manage
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white">USDC/APT</td>
                      <td className="py-3 px-4 text-white/80">Econia</td>
                      <td className="py-3 px-4 text-white/80">Liquidity Pool</td>
                      <td className="py-3 px-4 text-white">$3,800</td>
                      <td className="py-3 px-4 text-defi-teal">18.5%</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleManageAsset({
                            name: 'USDC/APT',
                            platform: 'Econia',
                            strategy: 'liquidity-pool',
                            value: 3800,
                            apy: 18.5
                          })}
                        >
                          Manage
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white">WBTC</td>
                      <td className="py-3 px-4 text-white/80">Aries</td>
                      <td className="py-3 px-4 text-white/80">Lending</td>
                      <td className="py-3 px-4 text-white">$2,500</td>
                      <td className="py-3 px-4 text-defi-teal">3.1%</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleManageAsset({
                            name: 'WBTC',
                            platform: 'Aries',
                            strategy: 'lending',
                            value: 2500,
                            apy: 3.1
                          })}
                        >
                          Manage
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-white">APT/USDT</td>
                      <td className="py-3 px-4 text-white/80">Aptoswap</td>
                      <td className="py-3 px-4 text-white/80">Yield Farming</td>
                      <td className="py-3 px-4 text-white">$2,080</td>
                      <td className="py-3 px-4 text-defi-teal">24.1%</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleManageAsset({
                            name: 'APT/USDT',
                            platform: 'Aptoswap',
                            strategy: 'yield-farming',
                            value: 2080,
                            apy: 24.1
                          })}
                        >
                          Manage
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card className="bg-black/20 border border-white/10">
            <CardHeader>
              <CardTitle>Performance History</CardTitle>
              <CardDescription>Track your portfolio's performance over time</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-center text-white/60">
                <LineChartIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Performance chart would appear here</p>
                <p className="text-sm">Showing daily, weekly, and monthly returns</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-insights">
          <Card className="bg-black/20 border border-white/10">
            <CardHeader>
              <CardTitle>AI Investment Recommendations</CardTitle>
              <CardDescription>Personalized recommendations based on your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-black/40 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <h4 className="text-white font-medium">Rebalance Recommendation</h4>
                    <span className="text-defi-teal text-sm">+3.4% potential improvement</span>
                  </div>
                  <p className="text-white/70 text-sm mb-3">
                    Our AI suggests reducing your exposure to WBTC by 10% and increasing your 
                    position in the APT/USDT liquidity pool for better risk-adjusted returns.
                  </p>
                  <Button 
                    className="bg-defi-gradient hover:opacity-90"
                    onClick={() => setIsRebalanceDialogOpen(true)}
                  >
                    Apply Recommendation
                  </Button>
                </div>
                
                <div className="bg-black/40 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <h4 className="text-white font-medium">New Investment Opportunity</h4>
                    <span className="text-defi-teal text-sm">22.8% estimated APY</span>
                  </div>
                  <p className="text-white/70 text-sm mb-3">
                    Consider allocating $1,200 to the newly launched Aptos/ARB farming pool on Pontem DEX,
                    which is offering boosted rewards for early liquidity providers.
                  </p>
                  <Button 
                    className="bg-defi-gradient hover:opacity-90"
                    onClick={() => setIsInvestmentOpportunityDialogOpen(true)}
                  >
                    Invest Now
                  </Button>
                </div>
                
                <div className="bg-black/40 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <h4 className="text-white font-medium">Risk Mitigation Action</h4>
                    <span className="text-amber-500 text-sm">High Priority</span>
                  </div>
                  <p className="text-white/70 text-sm mb-3">
                    To prevent potential liquidation, we recommend adding more collateral to your 
                    WBTC lending position or withdrawing a portion of your borrowed assets.
                  </p>
                  <Button 
                    className="bg-defi-gradient hover:opacity-90"
                    onClick={() => setIsRiskMitigationDialogOpen(true)}
                  >
                    Take Action
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* All Dialogs */}
      <InvestmentGoalsDialog
        open={isInvestmentGoalDialogOpen}
        onOpenChange={setIsInvestmentGoalDialogOpen}
        currentGoal={investmentGoal}
        onSave={handleSaveInvestmentGoal}
      />
      
      <RebalanceDialog
        open={isRebalanceDialogOpen}
        onOpenChange={setIsRebalanceDialogOpen}
        potentialImprovement="+3.4%"
        recommendation="Our AI suggests reducing your exposure to WBTC by 10% and increasing your position in the APT/USDT liquidity pool for better risk-adjusted returns."
      />
      
      <InvestmentOpportunityDialog
        open={isInvestmentOpportunityDialogOpen}
        onOpenChange={setIsInvestmentOpportunityDialogOpen}
        opportunity={investmentOpportunity}
      />
      
      <RiskMitigationDialog
        open={isRiskMitigationDialogOpen}
        onOpenChange={setIsRiskMitigationDialogOpen}
        risk={riskWarningDetails}
      />
      
      {selectedAsset && (
        <ManageAssetDialog
          open={isManageAssetDialogOpen}
          onOpenChange={setIsManageAssetDialogOpen}
          asset={selectedAsset}
        />
      )}
    </DashboardLayout>
  );
};

export default Portfolio;
