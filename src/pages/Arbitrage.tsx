
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeftRight, Zap, ArrowRight, BarChart3, History, Activity, AlertTriangle, CheckCircle2, XCircle, TrendingUp, DollarSign, Percent, Shield } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for arbitrage opportunities
const mockArbitrageOpportunities = [
  { 
    id: 1,
    pair: 'ETH/USDC',
    sourceExchange: 'Uniswap V3',
    sourcePrice: 2345.67,
    targetExchange: 'SushiSwap',
    targetPrice: 2349.82,
    priceDifference: 4.15,
    profitPercent: 0.18,
    estimatedProfit: 12.45,
    confidence: 'high',
    timeDetected: '2 mins ago',
  },
  { 
    id: 2,
    pair: 'ARB/USDC',
    sourceExchange: 'Balancer',
    sourcePrice: 1.025,
    targetExchange: 'Curve',
    targetPrice: 1.032,
    priceDifference: 0.007,
    profitPercent: 0.68,
    estimatedProfit: 20.4,
    confidence: 'medium',
    timeDetected: '5 mins ago',
  },
  { 
    id: 3,
    pair: 'WBTC/USDC',
    sourceExchange: 'SushiSwap',
    sourcePrice: 65432.55,
    targetExchange: 'Uniswap V3',
    targetPrice: 65512.18,
    priceDifference: 79.63,
    profitPercent: 0.12,
    estimatedProfit: 7.96,
    confidence: 'high',
    timeDetected: '8 mins ago',
  },
  { 
    id: 4,
    pair: 'MATIC/USDC',
    sourceExchange: 'Curve',
    sourcePrice: 0.578,
    targetExchange: 'Balancer',
    targetPrice: 0.581,
    priceDifference: 0.003,
    profitPercent: 0.52,
    estimatedProfit: 9.0,
    confidence: 'medium',
    timeDetected: '12 mins ago',
  },
  { 
    id: 5,
    pair: 'LINK/USDC',
    sourceExchange: 'Uniswap V3',
    sourcePrice: 17.82,
    targetExchange: 'SushiSwap',
    targetPrice: 17.89,
    priceDifference: 0.07,
    profitPercent: 0.39,
    estimatedProfit: 5.25,
    confidence: 'low',
    timeDetected: '15 mins ago',
  },
];

// Mock data for arbitrage history
const mockArbitrageHistory = [
  {
    id: 1,
    pair: 'ETH/USDC',
    sourceExchange: 'Uniswap V3',
    targetExchange: 'SushiSwap',
    amount: 2.5,
    profit: 28.75,
    profitPercent: 0.21,
    status: 'completed',
    timestamp: '25 mins ago',
    gasFee: 5.23,
  },
  {
    id: 2,
    pair: 'WBTC/USDC',
    sourceExchange: 'Curve',
    targetExchange: 'Balancer',
    amount: 0.015,
    profit: 15.62,
    profitPercent: 0.17,
    status: 'completed',
    timestamp: '45 mins ago',
    gasFee: 4.89,
  },
  {
    id: 3,
    pair: 'ARB/USDC',
    sourceExchange: 'SushiSwap',
    targetExchange: 'Uniswap V3',
    amount: 250,
    profit: 12.50,
    profitPercent: 0.45,
    status: 'completed',
    timestamp: '1 hr ago',
    gasFee: 3.75,
  },
  {
    id: 4,
    pair: 'AVAX/USDC',
    sourceExchange: 'Balancer',
    targetExchange: 'Curve',
    amount: 10,
    profit: 0,
    profitPercent: 0,
    status: 'failed',
    timestamp: '2 hrs ago',
    gasFee: 4.12,
    failReason: 'Price moved before execution',
  },
];

// Monitored DEXs
const monitoredDexs = [
  { name: 'Uniswap V3', logo: '🦄', status: 'active' },
  { name: 'SushiSwap', logo: '🍣', status: 'active' },
  { name: 'Curve', logo: '🔁', status: 'active' },
  { name: 'Balancer', logo: '⚖️', status: 'active' },
  { name: 'PancakeSwap', logo: '🥞', status: 'active' },
  { name: 'dYdX', logo: '📊', status: 'pending' },
];

const Arbitrage = () => {
  const [isAutoTradingEnabled, setIsAutoTradingEnabled] = useState(false);
  const [minProfitPercent, setMinProfitPercent] = useState([0.1]);
  const [maxTradeSize, setMaxTradeSize] = useState('1000');
  const [riskLevel, setRiskLevel] = useState('balanced');
  const [currentOpportunities, setCurrentOpportunities] = useState(mockArbitrageOpportunities);
  const [executedTrades, setExecutedTrades] = useState(mockArbitrageHistory);
  const [isExecutingTrade, setIsExecutingTrade] = useState(false);
  
  const totalProfit = executedTrades
    .filter(trade => trade.status === 'completed')
    .reduce((sum, trade) => sum + trade.profit, 0);
  
  const successfulTrades = executedTrades.filter(trade => trade.status === 'completed').length;
  const failedTrades = executedTrades.filter(trade => trade.status === 'failed').length;
  const successRate = executedTrades.length > 0 
    ? ((successfulTrades / executedTrades.length) * 100).toFixed(0) 
    : '0';
  
  const handleMinProfitChange = (value: number[]) => {
    setMinProfitPercent(value);
  };
  
  const handleRiskLevelChange = (value: string) => {
    setRiskLevel(value);
    toast.success(`Risk level set to ${value}`);
  };
  
  const toggleAutoTrading = () => {
    setIsAutoTradingEnabled(!isAutoTradingEnabled);
    toast.success(`Auto-trading ${!isAutoTradingEnabled ? 'enabled' : 'disabled'}`);
  };
  
  const handleExecuteTrade = (opportunityId: number) => {
    setIsExecutingTrade(true);
    
    // Find the opportunity to execute
    const opportunity = currentOpportunities.find(opp => opp.id === opportunityId);
    
    // Simulate trade execution with a delay
    setTimeout(() => {
      // Add the trade to history
      if (opportunity) {
        const newTrade = {
          id: executedTrades.length + 1,
          pair: opportunity.pair,
          sourceExchange: opportunity.sourceExchange,
          targetExchange: opportunity.targetExchange,
          amount: parseFloat((Math.random() * 5).toFixed(2)),
          profit: opportunity.estimatedProfit,
          profitPercent: opportunity.profitPercent,
          status: 'completed' as const,
          timestamp: 'Just now',
          gasFee: parseFloat((Math.random() * 5 + 1).toFixed(2)),
        };
        
        setExecutedTrades([newTrade, ...executedTrades]);
        
        // Remove the opportunity from the list
        setCurrentOpportunities(currentOpportunities.filter(opp => opp.id !== opportunityId));
        
        toast.success(`Successfully executed ${opportunity.pair} arbitrage trade!`);
      }
      
      setIsExecutingTrade(false);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">DEX Arbitrage Trader</h1>
          <p className="text-white/70">
            Our system scans multiple DEXs in milliseconds to find and execute profitable arbitrage trades.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Settings & Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-black/20 border border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-defi-teal" />
                  Auto-Trading
                </CardTitle>
                <CardDescription>
                  Let AI find and execute profitable trades 24/7
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-1">
                    <h4 className="font-medium">Enable Auto-Trading</h4>
                    <p className="text-sm text-white/60">
                      AI will execute trades that meet your criteria
                    </p>
                  </div>
                  <Switch
                    checked={isAutoTradingEnabled}
                    onCheckedChange={toggleAutoTrading}
                  />
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="min-profit">Minimum Profit</Label>
                      <span className="text-defi-teal font-medium">{minProfitPercent[0]}%</span>
                    </div>
                    <Slider
                      id="min-profit"
                      defaultValue={[0.1]}
                      max={2}
                      min={0.05}
                      step={0.05}
                      value={minProfitPercent}
                      onValueChange={handleMinProfitChange}
                    />
                    <p className="text-xs text-white/60">
                      Only execute trades with at least this profit percentage
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="max-trade-size">Max Trade Size (USDC)</Label>
                    <Input
                      id="max-trade-size"
                      value={maxTradeSize}
                      onChange={(e) => setMaxTradeSize(e.target.value)}
                      type="number"
                      min="0"
                    />
                    <p className="text-xs text-white/60">
                      Maximum capital allocation per trade
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-defi-purple" />
                  Risk Settings
                </CardTitle>
                <CardDescription>
                  Adjust how aggressive the AI should be
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={riskLevel}
                  onValueChange={handleRiskLevelChange}
                  className="space-y-4"
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="conservative" id="conservative" />
                    <div className="grid gap-1">
                      <Label htmlFor="conservative" className="font-medium">
                        Conservative
                      </Label>
                      <p className="text-sm text-white/60">
                        Only highest confidence trades with 99% success probability
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="balanced" id="balanced" />
                    <div className="grid gap-1">
                      <Label htmlFor="balanced" className="font-medium">
                        Balanced
                      </Label>
                      <p className="text-sm text-white/60">
                        Medium confidence trades with 95% success probability
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="aggressive" id="aggressive" />
                    <div className="grid gap-1">
                      <Label htmlFor="aggressive" className="font-medium">
                        Aggressive
                      </Label>
                      <p className="text-sm text-white/60">
                        More trades with 90% success probability, higher returns
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-defi-blue" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-white/70">Total Profit</p>
                    <p className="text-2xl font-bold text-green-500">+{totalProfit.toFixed(2)} USDC</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-white/70">Success Rate</p>
                    <p className="text-2xl font-bold text-defi-teal">{successRate}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-white/70">Successful Trades</p>
                    <p className="text-xl font-bold">{successfulTrades}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-white/70">Failed Trades</p>
                    <p className="text-xl font-bold text-red-500">{failedTrades}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Middle & Right Columns - Opportunities & History */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black/20 border border-white/10">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl flex items-center">
                    <ArrowLeftRight className="mr-2 h-5 w-5 text-defi-teal" />
                    Live Arbitrage Opportunities
                  </CardTitle>
                  <div className="text-xs text-white/70">
                    Updated 5 seconds ago
                  </div>
                </div>
                <CardDescription>
                  AI-detected price discrepancies between DEXs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pair</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead className="text-right">Price Diff</TableHead>
                        <TableHead className="text-right">Profit %</TableHead>
                        <TableHead className="text-right">Est. Profit</TableHead>
                        <TableHead>Confidence</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOpportunities.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-white/60">
                            No arbitrage opportunities found at the moment
                          </TableCell>
                        </TableRow>
                      ) : (
                        currentOpportunities.map((opportunity) => (
                          <TableRow key={opportunity.id}>
                            <TableCell className="font-medium">{opportunity.pair}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <span>{opportunity.sourceExchange}</span>
                                <ArrowRight className="h-3 w-3" />
                                <span>{opportunity.targetExchange}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">${opportunity.priceDifference.toFixed(4)}</TableCell>
                            <TableCell className="text-right text-green-500">
                              {opportunity.profitPercent.toFixed(2)}%
                            </TableCell>
                            <TableCell className="text-right text-green-500">
                              ${opportunity.estimatedProfit.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                ${opportunity.confidence === 'high' ? 'bg-green-100 text-green-800' : 
                                  opportunity.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-orange-100 text-orange-800'}`}>
                                {opportunity.confidence}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button 
                                size="sm"
                                onClick={() => handleExecuteTrade(opportunity.id)}
                                disabled={isExecutingTrade}
                                className="bg-defi-gradient hover:opacity-90 h-8"
                              >
                                {isExecutingTrade ? 'Executing...' : 'Execute'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center">
                  <History className="mr-2 h-5 w-5 text-defi-purple" />
                  Trade History
                </CardTitle>
                <CardDescription>
                  Recently executed arbitrage trades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pair</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Profit</TableHead>
                        <TableHead className="text-right">Gas Fee</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {executedTrades.map((trade) => (
                        <TableRow key={trade.id}>
                          <TableCell className="font-medium">{trade.pair}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <span>{trade.sourceExchange}</span>
                              <ArrowRight className="h-3 w-3" />
                              <span>{trade.targetExchange}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{trade.amount}</TableCell>
                          <TableCell className="text-right">
                            {trade.status === 'completed' ? (
                              <span className="text-green-500">+${trade.profit.toFixed(2)}</span>
                            ) : (
                              <span className="text-red-500">$0.00</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right text-white/70">
                            ${trade.gasFee.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            {trade.status === 'completed' ? (
                              <span className="inline-flex items-center gap-1 text-green-500">
                                <CheckCircle2 className="h-3 w-3" /> Success
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-red-500" title={trade.failReason}>
                                <XCircle className="h-3 w-3" /> Failed
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-white/70">{trade.timestamp}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/20 border border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-defi-blue" />
                    Market Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">Market Volatility</h4>
                        <p className="text-xs text-white/60">Affects arbitrage frequency</p>
                      </div>
                      <span className="px-2.5 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                        Medium
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">DEX Liquidity</h4>
                        <p className="text-xs text-white/60">Affects slippage & max trade size</p>
                      </div>
                      <span className="px-2.5 py-1 rounded text-xs bg-green-100 text-green-800">
                        High
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">Gas Prices</h4>
                        <p className="text-xs text-white/60">Affects minimum profitable trade size</p>
                      </div>
                      <span className="px-2.5 py-1 rounded text-xs bg-red-100 text-red-800">
                        23 Gwei
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">Arbitrage Opportunity Rate</h4>
                        <p className="text-xs text-white/60">New opportunities per hour</p>
                      </div>
                      <span className="text-sm font-medium text-defi-teal">
                        12.4/hr
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20 border border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-defi-teal" />
                    Monitored DEXs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {monitoredDexs.map((dex, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-black/20 rounded-lg p-2">
                        <div className="text-xl">{dex.logo}</div>
                        <div>
                          <div className="text-sm font-medium">{dex.name}</div>
                          <div className="flex items-center">
                            <div className={`h-1.5 w-1.5 rounded-full mr-1 ${dex.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            <span className="text-xs text-white/70">{dex.status === 'active' ? 'Active' : 'Pending'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Arbitrage;
