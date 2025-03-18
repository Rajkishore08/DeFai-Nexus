
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Check, ChevronsUpDown, Users, TrendingUp, AlertCircle, Unlink, Zap } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Trader {
  id: string;
  name: string;
  avatar: string;
  roi: number;
  winRate: number;
  strategy: string;
  followers: number;
  trades30d: number;
}

interface FollowedTrader extends Trader {
  allocation: number;
  copyPercentage: number;
}

const CopyTrading = () => {
  const { toast } = useToast();
  const [topTraders, setTopTraders] = useState<Trader[]>([
    {
      id: '1',
      name: 'CryptoWhale',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      roi: 87.4,
      winRate: 76,
      strategy: 'Swing Trading',
      followers: 2840,
      trades30d: 42
    },
    {
      id: '2',
      name: 'DegenInvestor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      roi: 134.2,
      winRate: 62,
      strategy: 'DeFi Arbitrage',
      followers: 1420,
      trades30d: 87
    },
    {
      id: '3',
      name: 'TokenMaster',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daisy',
      roi: 59.8,
      winRate: 83,
      strategy: 'Momentum Trading',
      followers: 3650,
      trades30d: 31
    },
    {
      id: '4',
      name: 'BlockchainBaron',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pepper',
      roi: 45.3,
      winRate: 71,
      strategy: 'Technical Analysis',
      followers: 1850,
      trades30d: 28
    },
    {
      id: '5',
      name: 'AlphaHunter',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bandit',
      roi: 92.1,
      winRate: 68,
      strategy: 'Event-based Trading',
      followers: 2100,
      trades30d: 53
    }
  ]);
  
  const [followedTraders, setFollowedTraders] = useState<FollowedTrader[]>([]);
  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);
  const [allocation, setAllocation] = useState<number>(100);
  const [copyPercentage, setCopyPercentage] = useState<number>(100);
  const [tradeSize, setTradeSize] = useState<number>(25);
  const [maxLossPerDay, setMaxLossPerDay] = useState<number>(50);
  const [riskLevel, setRiskLevel] = useState<string>("medium");
  
  const handleFollow = () => {
    if (!selectedTrader) return;
    
    if (followedTraders.find(t => t.id === selectedTrader.id)) {
      toast({
        title: "Already following this trader",
        description: "You are already copying this trader's trades.",
        variant: "destructive"
      });
      return;
    }
    
    const newFollowedTrader: FollowedTrader = {
      ...selectedTrader,
      allocation,
      copyPercentage
    };
    
    setFollowedTraders([...followedTraders, newFollowedTrader]);
    setSelectedTrader(null);
    
    toast({
      title: "Trader followed!",
      description: `You are now copying ${newFollowedTrader.name}'s trades.`,
    });
  };
  
  const handleUnfollow = (traderId: string) => {
    setFollowedTraders(followedTraders.filter(t => t.id !== traderId));
    
    toast({
      title: "Trader unfollowed",
      description: "You have stopped copying this trader's trades."
    });
  };

  const recentTrades = [
    { date: "2023-06-15 14:32", pair: "ETH/USDT", type: "BUY", amount: "1.25 ETH", price: "$2,150.48", profit: "+$124.50" },
    { date: "2023-06-15 10:15", pair: "BTC/USDT", type: "SELL", amount: "0.15 BTC", price: "$27,850.12", profit: "+$318.75" },
    { date: "2023-06-14 22:08", pair: "SOL/USDT", type: "BUY", amount: "18.5 SOL", price: "$43.25", profit: "-$16.20" },
    { date: "2023-06-14 16:47", pair: "LINK/USDT", type: "SELL", amount: "45 LINK", price: "$14.87", profit: "+$85.32" },
    { date: "2023-06-14 09:30", pair: "AVAX/USDT", type: "BUY", amount: "8.3 AVAX", price: "$22.16", profit: "+$41.65" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-20">
        <div className="mt-6 mb-4">
          <BackButton />
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Copy Trading Agent</h1>
          <p className="text-white/70">Follow top-performing traders and automatically copy their strategies</p>
        </div>

        <Tabs defaultValue="browse" className="mb-8">
          <TabsList className="mb-6 bg-defi-blue/20 border border-white/10">
            <TabsTrigger value="browse">Browse Traders</TabsTrigger>
            <TabsTrigger value="followed">My Followed Traders</TabsTrigger>
            <TabsTrigger value="parameters">Trading Parameters</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topTraders.map((trader) => (
                <Card 
                  key={trader.id} 
                  className={`cursor-pointer border border-white/5 bg-defi-blue/10 hover:bg-defi-blue/20 transition-all ${selectedTrader?.id === trader.id ? 'ring-2 ring-defi-teal' : ''}`}
                  onClick={() => setSelectedTrader(trader)}
                >
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <img 
                      src={trader.avatar} 
                      alt={trader.name} 
                      className="rounded-full w-12 h-12 border border-white/20"
                    />
                    <div>
                      <CardTitle className="text-xl">{trader.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Users size={14} />
                        {trader.followers.toLocaleString()} followers
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-white/5 rounded p-2">
                        <p className="text-xs text-white/70">ROI (30d)</p>
                        <p className={`text-xl font-bold ${trader.roi > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {trader.roi > 0 ? '+' : ''}{trader.roi}%
                        </p>
                      </div>
                      <div className="bg-white/5 rounded p-2">
                        <p className="text-xs text-white/70">Win Rate</p>
                        <p className="text-xl font-bold">{trader.winRate}%</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <Badge variant="outline" className="bg-white/10">
                        {trader.strategy}
                      </Badge>
                      <span className="text-sm text-white/70">{trader.trades30d} trades (30d)</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {selectedTrader && (
              <Card className="mt-8 border border-white/10 bg-defi-blue/5 overflow-hidden">
                <CardHeader>
                  <CardTitle>Configure Copy Trading</CardTitle>
                  <CardDescription>
                    Set up how you want to copy {selectedTrader.name}'s trades
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="allocation">Capital Allocation (USDT)</Label>
                    <Input
                      id="allocation"
                      type="number"
                      value={allocation}
                      onChange={(e) => setAllocation(Number(e.target.value))}
                      className="bg-white/5 border-white/10"
                    />
                    <p className="text-sm text-white/70">
                      Amount of capital you want to allocate for copying this trader
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Copy Percentage: {copyPercentage}%</Label>
                    <Slider
                      defaultValue={[100]}
                      max={100}
                      step={5}
                      value={[copyPercentage]}
                      onValueChange={(values) => setCopyPercentage(values[0])}
                      className="py-4"
                    />
                    <p className="text-sm text-white/70">
                      Percentage of each trade you want to copy
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="bg-black/20 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setSelectedTrader(null)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-button-gradient hover:opacity-90 transition-opacity"
                    onClick={handleFollow}
                  >
                    <Check className="mr-2 h-4 w-4" /> Follow Trader
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="followed">
            {followedTraders.length === 0 ? (
              <Card className="border border-white/10 bg-defi-blue/5">
                <CardHeader>
                  <CardTitle>No Traders Followed Yet</CardTitle>
                  <CardDescription>
                    Browse top traders and select ones to follow to get started with copy trading
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-8">
                  <Button
                    variant="outline"
                    onClick={() => document.querySelector('[data-value="browse"]')?.click()}
                  >
                    <Users className="mr-2 h-4 w-4" /> Browse Traders
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {followedTraders.map((trader) => (
                  <Card key={trader.id} className="border border-white/10 bg-defi-blue/5 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center gap-4">
                        <img 
                          src={trader.avatar} 
                          alt={trader.name} 
                          className="rounded-full w-12 h-12 border border-white/20"
                        />
                        <div>
                          <CardTitle className="text-xl">{trader.name}</CardTitle>
                          <CardDescription>{trader.strategy}</CardDescription>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-white/5 hover:bg-white/10 border-white/10 text-red-400 hover:text-red-300"
                        onClick={() => handleUnfollow(trader.id)}
                      >
                        <Unlink className="mr-1 h-4 w-4" /> Unfollow
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        <div className="bg-white/5 rounded p-3">
                          <p className="text-xs text-white/70">ROI (30d)</p>
                          <p className={`text-xl font-bold ${trader.roi > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {trader.roi > 0 ? '+' : ''}{trader.roi}%
                          </p>
                        </div>
                        <div className="bg-white/5 rounded p-3">
                          <p className="text-xs text-white/70">Win Rate</p>
                          <p className="text-xl font-bold">{trader.winRate}%</p>
                        </div>
                        <div className="bg-white/5 rounded p-3">
                          <p className="text-xs text-white/70">Allocation</p>
                          <p className="text-xl font-bold">{trader.allocation} USDT</p>
                        </div>
                        <div className="bg-white/5 rounded p-3">
                          <p className="text-xs text-white/70">Copy %</p>
                          <p className="text-xl font-bold">{trader.copyPercentage}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="parameters">
            <Card className="border border-white/10 bg-defi-blue/5">
              <CardHeader>
                <CardTitle>Copy Trading Parameters</CardTitle>
                <CardDescription>
                  Configure global settings for all your copy trading activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tradeSize">Max Trade Size (% of allocation)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="tradeSize"
                      defaultValue={[25]}
                      max={100}
                      step={5}
                      value={[tradeSize]}
                      onValueChange={(values) => setTradeSize(values[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{tradeSize}%</span>
                  </div>
                  <p className="text-sm text-white/70">
                    Maximum percentage of your allocation used per trade
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Risk Level</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {['low', 'medium', 'high'].map((level) => (
                      <Button
                        key={level}
                        variant={riskLevel === level ? "default" : "outline"}
                        className={
                          riskLevel === level 
                            ? "bg-button-gradient hover:opacity-90 transition-opacity" 
                            : "border-white/10 bg-white/5"
                        }
                        onClick={() => setRiskLevel(level)}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-white/70">
                    Controls AI modifications to improve execution and manage risk
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxLoss">Max Loss Per Day (USDT)</Label>
                  <Input
                    id="maxLoss"
                    type="number"
                    value={maxLossPerDay}
                    onChange={(e) => setMaxLossPerDay(Number(e.target.value))}
                    className="bg-white/5 border-white/10"
                  />
                  <p className="text-sm text-white/70">
                    Copy trading will pause if daily losses reach this amount
                  </p>
                </div>
              </CardContent>
              <CardFooter className="bg-black/20 justify-end">
                <Button 
                  className="bg-button-gradient hover:opacity-90 transition-opacity"
                  onClick={() => {
                    toast({
                      title: "Parameters Saved",
                      description: "Your copy trading parameters have been updated."
                    });
                  }}
                >
                  Save Parameters
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border border-white/10 bg-defi-blue/5 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Copied Trades</CardTitle>
                  <CardDescription>
                    Recent trades copied from traders you follow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 text-white/70">Date</th>
                          <th className="text-left py-3 px-4 text-white/70">Pair</th>
                          <th className="text-left py-3 px-4 text-white/70">Type</th>
                          <th className="text-left py-3 px-4 text-white/70">Amount</th>
                          <th className="text-left py-3 px-4 text-white/70">Price</th>
                          <th className="text-left py-3 px-4 text-white/70">Profit/Loss</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTrades.map((trade, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-3 px-4 text-sm">{trade.date}</td>
                            <td className="py-3 px-4 font-medium">{trade.pair}</td>
                            <td className="py-3 px-4">
                              <Badge className={trade.type === "BUY" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}>
                                {trade.type}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{trade.amount}</td>
                            <td className="py-3 px-4">{trade.price}</td>
                            <td className={`py-3 px-4 font-medium ${trade.profit.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                              {trade.profit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-white/10 bg-defi-blue/5">
                <CardHeader>
                  <CardTitle>AI Improvements</CardTitle>
                  <CardDescription>
                    How our AI optimized your copied trades
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      <h3 className="font-medium">Execution Timing</h3>
                    </div>
                    <p className="text-sm text-white/70">
                      AI adjusted entry timing by an average of 1.2 minutes, improving returns by ~2.8%
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ChevronsUpDown className="h-5 w-5 text-blue-400" />
                      <h3 className="font-medium">Slippage Prevention</h3>
                    </div>
                    <p className="text-sm text-white/70">
                      AI split 4 large orders into smaller batches, reducing slippage costs by 0.4%
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                      <h3 className="font-medium">Risk Management</h3>
                    </div>
                    <p className="text-sm text-white/70">
                      AI added stop-losses to 8 trades, preventing ~$62 in potential losses
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white/70">Total AI Value Added:</span>
                      <span className="font-bold text-green-500">+$106.32</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Performance Improvement:</span>
                      <span className="font-bold text-green-500">+3.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default CopyTrading;
