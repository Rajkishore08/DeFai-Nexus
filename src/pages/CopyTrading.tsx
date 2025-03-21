
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertCircle, ChevronRight, Users, TrendingUp, BarChart3, ArrowUpRight, ZapOff, Zap, Settings, DollarSign, CircleSlash } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const CopyTrading = () => {
  const [followedTraders, setFollowedTraders] = useState<string[]>([]);
  const [selectedTrader, setSelectedTrader] = useState<any>(null);
  const [copyPercentage, setCopyPercentage] = useState(50);
  const [isAutoTrading, setIsAutoTrading] = useState(false);
  const [maxLossPerDay, setMaxLossPerDay] = useState(50);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Top traders data
  const topTraders = [
    {
      id: 'trader1',
      name: 'CryptoWhale',
      address: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      roi: 287,
      winRate: 92,
      trades: 145,
      strategy: 'Momentum',
      followers: 1245,
      portfolio: [
        { token: 'ETH', allocation: 45 },
        { token: 'BTC', allocation: 30 },
        { token: 'LINK', allocation: 15 },
        { token: 'UNI', allocation: 10 }
      ],
      recentTrades: [
        { pair: 'ETH/USDT', type: 'Buy', amount: '5.2 ETH', price: '$2,123.45', time: '2h ago', profit: '+12.3%' },
        { pair: 'LINK/USDT', type: 'Sell', amount: '120 LINK', price: '$15.78', time: '6h ago', profit: '+8.7%' },
        { pair: 'UNI/ETH', type: 'Buy', amount: '150 UNI', price: '0.012 ETH', time: '1d ago', profit: '+5.2%' }
      ]
    },
    {
      id: 'trader2',
      name: 'DeFi_Master',
      address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      roi: 215,
      winRate: 88,
      trades: 98,
      strategy: 'Swing',
      followers: 876,
      portfolio: [
        { token: 'ETH', allocation: 25 },
        { token: 'AAVE', allocation: 20 },
        { token: 'SNX', allocation: 25 },
        { token: 'CRV', allocation: 30 }
      ],
      recentTrades: [
        { pair: 'AAVE/ETH', type: 'Buy', amount: '12 AAVE', price: '0.08 ETH', time: '4h ago', profit: '+9.8%' },
        { pair: 'CRV/USDT', type: 'Buy', amount: '500 CRV', price: '$1.23', time: '12h ago', profit: '+15.3%' },
        { pair: 'SNX/ETH', type: 'Sell', amount: '200 SNX', price: '0.005 ETH', time: '2d ago', profit: '+3.7%' }
      ]
    },
    {
      id: 'trader3',
      name: 'AlphaSeeker',
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      roi: 178,
      winRate: 82,
      trades: 203,
      strategy: 'Scalping',
      followers: 542,
      portfolio: [
        { token: 'ETH', allocation: 15 },
        { token: 'BTC', allocation: 10 },
        { token: 'DOT', allocation: 30 },
        { token: 'ADA', allocation: 45 }
      ],
      recentTrades: [
        { pair: 'DOT/USDT', type: 'Buy', amount: '120 DOT', price: '$18.45', time: '1h ago', profit: '+7.3%' },
        { pair: 'ADA/BTC', type: 'Sell', amount: '1000 ADA', price: '0.00004512 BTC', time: '5h ago', profit: '+11.2%' },
        { pair: 'ETH/USDT', type: 'Buy', amount: '2.5 ETH', price: '$2,218.34', time: '16h ago', profit: '+4.5%' }
      ]
    },
    {
      id: 'trader4',
      name: 'TokenNinja',
      address: '0xf977814e90da44bfa03b6295a0616a897441acec',
      roi: 156,
      winRate: 76,
      trades: 321,
      strategy: 'Position',
      followers: 389,
      portfolio: [
        { token: 'ETH', allocation: 30 },
        { token: 'MATIC', allocation: 40 },
        { token: 'SUSHI', allocation: 20 },
        { token: 'GRT', allocation: 10 }
      ],
      recentTrades: [
        { pair: 'MATIC/USDT', type: 'Buy', amount: '2000 MATIC', price: '$0.92', time: '3h ago', profit: '+18.3%' },
        { pair: 'SUSHI/ETH', type: 'Sell', amount: '100 SUSHI', price: '0.003 ETH', time: '10h ago', profit: '+6.7%' },
        { pair: 'GRT/USDT', type: 'Buy', amount: '500 GRT', price: '$0.45', time: '1d ago', profit: '+9.5%' }
      ]
    }
  ];

  const followTrader = (traderId: string) => {
    const trader = topTraders.find(t => t.id === traderId);
    if (trader) {
      setSelectedTrader(trader);
      setIsDialogOpen(true);
    }
  };

  const confirmFollow = () => {
    if (selectedTrader && !followedTraders.includes(selectedTrader.id)) {
      setFollowedTraders([...followedTraders, selectedTrader.id]);
      toast(`You are now following ${selectedTrader.name}. Copying ${copyPercentage}% of their trades.`, {
        description: "You'll receive notifications for each copied trade."
      });
    }
    setIsDialogOpen(false);
  };

  const unfollowTrader = (traderId: string) => {
    setFollowedTraders(followedTraders.filter(id => id !== traderId));
    toast("Trader Unfollowed", {
      description: "You will no longer copy trades from this trader."
    });
  };

  const toggleAutoTrading = () => {
    setIsAutoTrading(!isAutoTrading);
    toast(isAutoTrading ? "Auto-Trading Disabled" : "Auto-Trading Enabled", {
      description: isAutoTrading 
        ? "You will need to approve trades manually." 
        : "AI will automatically execute trades on your behalf."
    });
  };

  const handleOpenTraderDetails = (traderId: string) => {
    // In a real application, you might navigate to a details page or open a modal
    console.log(`Opening details for trader ${traderId}`);
    
    // Find the tab element by its content and trigger a click programmatically
    const tabElement = document.querySelector('#traders-list-tab');
    if (tabElement) {
      (tabElement as HTMLElement).click();
    }
  };

  return (
    <DashboardLayout 
      title="Copy Trading Agent" 
      description="Follow top-performing traders and let our AI automatically mirror their successful strategies."
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-feature-gradient border-white/5">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-defi-gradient/30 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-defi-teal" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Traders Followed</h3>
            <p className="text-3xl font-bold text-defi-teal mb-1">{followedTraders.length}</p>
            <p className="text-white/70 text-sm">of {topTraders.length} available</p>
          </div>
        </Card>

        <Card className="p-6 bg-feature-gradient border-white/5">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-defi-gradient/30 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-defi-purple" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Trades Copied</h3>
            <p className="text-3xl font-bold text-defi-purple mb-1">24</p>
            <p className="text-white/70 text-sm">in the last 7 days</p>
          </div>
        </Card>

        <Card className="p-6 bg-feature-gradient border-white/5">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-defi-gradient/30 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-defi-blue" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Win Rate</h3>
            <p className="text-3xl font-bold text-defi-blue mb-1">87%</p>
            <p className="text-white/70 text-sm">across all copied trades</p>
          </div>
        </Card>

        <Card className="p-6 bg-feature-gradient border-white/5">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-defi-gradient/30 rounded-full flex items-center justify-center mb-4">
              <DollarSign className="h-8 w-8 text-defi-pink" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Profit</h3>
            <p className="text-3xl font-bold text-defi-pink mb-1">$1,245.87</p>
            <p className="text-white/70 text-sm">since you started copying</p>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-feature-gradient border-white/5 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">AI Trading Parameters</h2>
            <p className="text-white/70 text-sm">Configure how the AI copies trades on your behalf</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <Label htmlFor="auto-trading" className="mr-2 text-white">
              {isAutoTrading ? 'Auto-Trading Enabled' : 'Auto-Trading Disabled'}
            </Label>
            <Switch 
              id="auto-trading" 
              checked={isAutoTrading}
              onCheckedChange={toggleAutoTrading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-white font-medium">Risk Management</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="max-loss">Maximum Loss Per Day</Label>
                <span className="text-white">${maxLossPerDay}</span>
              </div>
              <Slider 
                id="max-loss"
                min={10} 
                max={200} 
                step={5}
                value={[maxLossPerDay]} 
                onValueChange={(value) => setMaxLossPerDay(value[0])}
              />
              <p className="text-xs text-white/50">
                AI will stop trading if daily losses exceed this amount
              </p>
            </div>

            <div className="space-y-2">
              <Label>Risk Level</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="bg-white/5">Low</Button>
                <Button className="bg-button-gradient">Medium</Button>
                <Button variant="outline" className="bg-white/5">High</Button>
              </div>
              <p className="text-xs text-white/50">
                Affects position sizes and trading frequency
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-medium">Trade Settings</h3>
            
            <div className="space-y-2">
              <Label>Position Size</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button className="bg-button-gradient">Fixed USD</Button>
                <Button variant="outline" className="bg-white/5">% of Balance</Button>
                <Button variant="outline" className="bg-white/5">Match Trader</Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="entry-only">Entry Trades Only</Label>
                <p className="text-xs text-white/50">Only copy entry positions, manage exits yourself</p>
              </div>
              <Switch id="entry-only" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="ai-optimize">AI Execution Optimization</Label>
                <p className="text-xs text-white/50">AI finds better entry/exit prices than original trader</p>
              </div>
              <Switch id="ai-optimize" defaultChecked />
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="traders-list" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger id="traders-list-tab" value="traders-list">
            <Users className="h-4 w-4 mr-2" />
            Top Traders
          </TabsTrigger>
          <TabsTrigger value="my-traders">
            <TrendingUp className="h-4 w-4 mr-2" />
            My Copied Traders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="traders-list" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Browse Top-Performing Traders</h2>
            <div className="flex items-center">
              <Input placeholder="Search traders..." className="w-48 mr-2" />
              <Button variant="outline" size="sm">Search</Button>
            </div>
          </div>

          <div className="space-y-4">
            {topTraders.map((trader) => (
              <Card key={trader.id} className="p-4 bg-feature-gradient border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-3 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-defi-gradient/30 flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-defi-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{trader.name}</h3>
                      <div className="text-xs text-white/50 font-mono">
                        {`${trader.address.substring(0, 6)}...${trader.address.substring(trader.address.length - 4)}`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <span className="text-sm text-white/70 block">ROI (30d)</span>
                    <span className="text-green-400 font-semibold">+{trader.roi}%</span>
                  </div>
                  
                  <div className="md:col-span-2">
                    <span className="text-sm text-white/70 block">Win Rate</span>
                    <span className="text-white font-semibold">{trader.winRate}%</span>
                  </div>
                  
                  <div className="md:col-span-2">
                    <span className="text-sm text-white/70 block">Strategy</span>
                    <Badge variant="outline" className="border-defi-teal/50 text-defi-teal">
                      {trader.strategy}
                    </Badge>
                  </div>
                  
                  <div className="md:col-span-1">
                    <span className="text-sm text-white/70 block">Followers</span>
                    <span className="text-white font-semibold">{trader.followers}</span>
                  </div>
                  
                  <div className="md:col-span-2 flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-white/10 hover:bg-white/5"
                      onClick={() => handleOpenTraderDetails(trader.id)}
                    >
                      Details
                    </Button>
                    
                    <Button 
                      className={`${followedTraders.includes(trader.id) ? 'bg-white/10' : 'bg-button-gradient'}`}
                      size="sm"
                      onClick={() => followedTraders.includes(trader.id) ? unfollowTrader(trader.id) : followTrader(trader.id)}
                    >
                      {followedTraders.includes(trader.id) ? (
                        <>
                          <ZapOff className="h-4 w-4 mr-1" />
                          Unfollow
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-1" />
                          Follow
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-traders">
          {followedTraders.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Traders You're Following</h2>
              
              {topTraders
                .filter(trader => followedTraders.includes(trader.id))
                .map((trader) => (
                  <Card key={trader.id} className="p-6 bg-feature-gradient border-white/5">
                    <div className="flex flex-col space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-defi-gradient/30 flex items-center justify-center mr-4">
                            <Users className="h-6 w-6 text-defi-teal" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white">{trader.name}</h3>
                            <div className="text-sm text-white/50 font-mono">
                              {`${trader.address.substring(0, 6)}...${trader.address.substring(trader.address.length - 4)}`}
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                          onClick={() => unfollowTrader(trader.id)}
                        >
                          <CircleSlash className="h-4 w-4 mr-1" />
                          Unfollow
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white/5 rounded-md p-3">
                          <span className="text-sm text-white/70 block">ROI (30d)</span>
                          <span className="text-green-400 text-xl font-semibold">+{trader.roi}%</span>
                        </div>
                        
                        <div className="bg-white/5 rounded-md p-3">
                          <span className="text-sm text-white/70 block">Win Rate</span>
                          <span className="text-white text-xl font-semibold">{trader.winRate}%</span>
                        </div>
                        
                        <div className="bg-white/5 rounded-md p-3">
                          <span className="text-sm text-white/70 block">Copy Percentage</span>
                          <span className="text-defi-teal text-xl font-semibold">50%</span>
                        </div>
                        
                        <div className="bg-white/5 rounded-md p-3">
                          <span className="text-sm text-white/70 block">Your Profit</span>
                          <span className="text-defi-pink text-xl font-semibold">+$347.26</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-medium mb-3">Recent Trades</h4>
                        <div className="space-y-2">
                          {trader.recentTrades.map((trade, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-md">
                              <div>
                                <span className="text-white font-medium">{trade.pair}</span>
                                <div className="flex items-center">
                                  <Badge className={`mr-2 ${trade.type === 'Buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {trade.type}
                                  </Badge>
                                  <span className="text-sm text-white/70">{trade.amount} @ {trade.price}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-green-400 block">{trade.profit}</span>
                                <span className="text-xs text-white/50">{trade.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-medium mb-3">Current Portfolio</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {trader.portfolio.map((item, index) => (
                            <div key={index} className="p-3 bg-white/5 rounded-md">
                              <span className="text-defi-teal font-medium block">{item.token}</span>
                              <span className="text-white">{item.allocation}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          className="mr-2"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Copy Settings
                        </Button>
                        <Button className="bg-button-gradient">
                          <ArrowUpRight className="h-4 w-4 mr-2" />
                          View Full Analysis
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 mx-auto text-white/30 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">You're not following any traders yet</h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Browse our top-performing traders and start copying their strategies to grow your portfolio.
              </p>
              <Button 
                className="bg-button-gradient"
                onClick={() => {
                  // Find the tab element by its id and trigger a click programmatically
                  const tabElement = document.querySelector('#traders-list-tab');
                  if (tabElement) {
                    (tabElement as HTMLElement).click();
                  }
                }}
              >
                <ChevronRight className="h-4 w-4 mr-2" />
                Browse Top Traders
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass border border-white/10 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Follow {selectedTrader?.name}</DialogTitle>
            <DialogDescription>
              Configure how you want to copy trades from this trader.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="copy-percentage">Copy Percentage</Label>
              <div className="flex items-center space-x-4">
                <Slider 
                  id="copy-percentage"
                  min={10} 
                  max={100} 
                  step={10}
                  value={[copyPercentage]} 
                  onValueChange={(value) => setCopyPercentage(value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{copyPercentage}%</span>
              </div>
              <p className="text-sm text-muted-foreground">
                What percentage of your available capital to use for copied trades.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Risk Level</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline">Low</Button>
                <Button className="bg-button-gradient">Medium</Button>
                <Button variant="outline">High</Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="ai-optimize-dialog" defaultChecked />
              <Label htmlFor="ai-optimize-dialog">Let AI optimize trade entries/exits</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-button-gradient" onClick={confirmFollow}>
              <Zap className="h-4 w-4 mr-2" />
              Start Copying
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default CopyTrading;

