
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowUpDown, BarChart4, CheckCircle2, Clock3, CandlestickChart, ListX, LineChart, PieChart, Activity, TrendingUp, TrendingDown, CircleDollarSign } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for order book
const mockBids = [
  { price: 2345.67, size: 1.45, total: 3401.22 },
  { price: 2345.12, size: 0.87, total: 2040.25 },
  { price: 2344.89, size: 2.34, total: 5487.04 },
  { price: 2344.56, size: 1.21, total: 2836.92 },
  { price: 2344.21, size: 0.56, total: 1312.76 },
];

const mockAsks = [
  { price: 2346.12, size: 0.78, total: 1829.97 },
  { price: 2346.45, size: 1.23, total: 2886.13 },
  { price: 2346.89, size: 0.45, total: 1056.10 },
  { price: 2347.23, size: 2.11, total: 4952.66 },
  { price: 2347.56, size: 0.67, total: 1572.87 },
];

// Mock data for completed orders
const mockCompletedOrders = [
  { id: '1', type: 'Market', side: 'Buy', pair: 'ETH/USDC', price: 2345.78, amount: 1.2, filled: '100%', status: 'Filled', timestamp: '2 mins ago' },
  { id: '2', type: 'Limit', side: 'Sell', pair: 'ETH/USDC', price: 2350.12, amount: 0.5, filled: '100%', status: 'Filled', timestamp: '5 mins ago' },
  { id: '3', type: 'Market', side: 'Buy', pair: 'ETH/USDC', price: 2344.89, amount: 0.8, filled: '100%', status: 'Filled', timestamp: '8 mins ago' },
];

// Mock data for open orders
const mockOpenOrders = [
  { id: '4', type: 'Limit', side: 'Buy', pair: 'ETH/USDC', price: 2330.00, amount: 1.5, filled: '0%', status: 'Open', timestamp: '1 min ago' },
  { id: '5', type: 'Limit', side: 'Sell', pair: 'ETH/USDC', price: 2360.00, amount: 0.7, filled: '0%', status: 'Open', timestamp: '3 mins ago' },
];

// Mock data for performance metrics
const mockPerformanceData = {
  totalTrades: 156,
  successfulTrades: 142,
  failedTrades: 14,
  totalVolume: 245.78,
  pnl: 3450.45,
  averageSpread: 0.15,
  feesSpent: 123.45,
  winRate: 91,
};

// Token pairs for trading
const tokenPairs = [
  'ETH/USDC',
  'BTC/USDC',
  'SOL/USDC',
  'ARB/USDC',
  'AVAX/USDC',
  'MATIC/USDC',
];

const MarketMaker = () => {
  const [activeTab, setActiveTab] = useState('orderBook');
  const [orderType, setOrderType] = useState('market');
  const [orderSide, setOrderSide] = useState('buy');
  const [selectedPair, setSelectedPair] = useState('ETH/USDC');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [openOrders, setOpenOrders] = useState(mockOpenOrders);
  const [marketMakingStrategy, setMarketMakingStrategy] = useState('balanced');
  const [isAutoTradingEnabled, setIsAutoTradingEnabled] = useState(false);

  // Calculate spread
  const spread = mockAsks[0].price - mockBids[0].price;
  const spreadPercentage = (spread / mockBids[0].price) * 100;
  
  const handlePlaceOrder = () => {
    // In a real application, this would connect to a wallet and execute the order
    if (!amount || (orderType === 'limit' && !limitPrice)) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const orderDetails = {
      type: orderType === 'market' ? 'Market' : 'Limit',
      side: orderSide === 'buy' ? 'Buy' : 'Sell',
      pair: selectedPair,
      price: orderType === 'market' ? (orderSide === 'buy' ? mockAsks[0].price : mockBids[0].price) : parseFloat(limitPrice),
      amount: parseFloat(amount),
    };
    
    if (orderType === 'market') {
      toast.success(`${orderSide === 'buy' ? 'Bought' : 'Sold'} ${amount} ${selectedPair.split('/')[0]} at ${orderDetails.price} ${selectedPair.split('/')[1]}`);
    } else {
      const newOrder = {
        id: (openOrders.length + 6).toString(),
        type: 'Limit',
        side: orderSide === 'buy' ? 'Buy' : 'Sell',
        pair: selectedPair,
        price: parseFloat(limitPrice),
        amount: parseFloat(amount),
        filled: '0%',
        status: 'Open',
        timestamp: 'Just now',
      };
      
      setOpenOrders([newOrder, ...openOrders]);
      toast.success(`Limit order placed successfully`);
    }
    
    // Reset form
    setAmount('');
    setLimitPrice('');
  };
  
  const handleCancelOrder = (orderId: string) => {
    setOpenOrders(openOrders.filter(order => order.id !== orderId));
    toast.success('Order cancelled successfully');
  };
  
  const handleStrategyChange = (value: string) => {
    setMarketMakingStrategy(value);
    toast.success(`Market making strategy changed to ${value}`);
  };
  
  const toggleAutoTrading = () => {
    setIsAutoTradingEnabled(!isAutoTradingEnabled);
    toast.success(`Auto-trading ${!isAutoTradingEnabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">AI Market Making</h1>
          <p className="text-white/70">
            Our AI dynamically sets bid/ask prices to maximize market making profits.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Strategy & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-black/20 border border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center">
                  <CandlestickChart className="mr-2 h-5 w-5 text-defi-teal" />
                  Market Making Strategy
                </CardTitle>
                <CardDescription>
                  Adjust how the AI sets bid/ask prices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={marketMakingStrategy}
                  onValueChange={handleStrategyChange}
                  className="space-y-4"
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="aggressive" id="aggressive" />
                    <div className="grid gap-1">
                      <Label htmlFor="aggressive" className="font-medium">
                        Aggressive
                      </Label>
                      <p className="text-sm text-white/60">
                        Higher risk, lower spreads, faster trades, maximized volume
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
                        Moderate risk-reward, average spreads, consistent profit
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="conservative" id="conservative" />
                    <div className="grid gap-1">
                      <Label htmlFor="conservative" className="font-medium">
                        Conservative
                      </Label>
                      <p className="text-sm text-white/60">
                        Lower risk, wider spreads, fewer trades, minimized losses
                      </p>
                    </div>
                  </div>
                </RadioGroup>
                
                <div className="mt-6">
                  <Button 
                    onClick={toggleAutoTrading}
                    className={`w-full ${isAutoTradingEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-defi-gradient hover:opacity-90'}`}
                  >
                    {isAutoTradingEnabled ? 'Disable Auto-Trading' : 'Enable Auto-Trading'}
                  </Button>
                  
                  <p className="mt-2 text-xs text-white/60">
                    {isAutoTradingEnabled 
                      ? 'AI is actively managing your market making positions based on your strategy' 
                      : 'AI will monitor the market but won\'t execute trades automatically'}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center">
                  <ArrowUpDown className="mr-2 h-5 w-5 text-defi-purple" />
                  Place Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Button
                      variant={orderType === 'market' ? 'default' : 'outline'} 
                      className={orderType === 'market' ? 'bg-defi-gradient hover:opacity-90 w-full' : 'w-full'}
                      onClick={() => setOrderType('market')}
                    >
                      Market
                    </Button>
                    <Button
                      variant={orderType === 'limit' ? 'default' : 'outline'} 
                      className={orderType === 'limit' ? 'bg-defi-gradient hover:opacity-90 w-full' : 'w-full'}
                      onClick={() => setOrderType('limit')}
                    >
                      Limit
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant={orderSide === 'buy' ? 'default' : 'outline'} 
                      className={orderSide === 'buy' ? 'bg-green-600 hover:bg-green-700 w-full' : 'w-full'}
                      onClick={() => setOrderSide('buy')}
                    >
                      Buy
                    </Button>
                    <Button
                      variant={orderSide === 'sell' ? 'default' : 'outline'} 
                      className={orderSide === 'sell' ? 'bg-red-600 hover:bg-red-700 w-full' : 'w-full'}
                      onClick={() => setOrderSide('sell')}
                    >
                      Sell
                    </Button>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="pair">Token Pair</Label>
                    <Select value={selectedPair} onValueChange={setSelectedPair}>
                      <SelectTrigger id="pair">
                        <SelectValue placeholder="Select pair" />
                      </SelectTrigger>
                      <SelectContent>
                        {tokenPairs.map((pair) => (
                          <SelectItem key={pair} value={pair}>{pair}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      placeholder={`Enter amount (${selectedPair.split('/')[0]})`}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  {orderType === 'limit' && (
                    <div className="space-y-1">
                      <Label htmlFor="limitPrice">Limit Price</Label>
                      <Input
                        id="limitPrice"
                        placeholder={`Price (${selectedPair.split('/')[1]})`}
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(e.target.value)}
                        type="number"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  )}
                  
                  <Button 
                    onClick={handlePlaceOrder}
                    className="w-full bg-defi-gradient hover:opacity-90"
                  >
                    Place {orderType === 'market' ? 'Market' : 'Limit'} Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Middle & Right Columns - Order Book & Data */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="orderBook" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="orderBook">Order Book</TabsTrigger>
                <TabsTrigger value="orders">Your Orders</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              
              {/* Order Book Tab */}
              <TabsContent value="orderBook" className="m-0">
                <Card className="bg-black/20 border border-white/10">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">Order Book</CardTitle>
                      <div className="text-right">
                        <div className="text-sm text-white/70">Spread:</div>
                        <div className="font-bold text-defi-teal">
                          {spread.toFixed(2)} ({spreadPercentage.toFixed(3)}%)
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 text-sm font-medium text-white/70 mb-2">
                      <div>Price</div>
                      <div className="text-center">Size</div>
                      <div className="text-right">Total</div>
                    </div>
                    
                    {/* Asks (Sell orders) */}
                    <div className="space-y-1 mb-3">
                      {mockAsks.slice().reverse().map((ask, index) => (
                        <div key={index} className="grid grid-cols-3 text-sm">
                          <div className="text-red-500">{ask.price.toFixed(2)}</div>
                          <div className="text-center">{ask.size.toFixed(3)}</div>
                          <div className="text-right">{ask.total.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-defi-gradient h-0.5 w-full my-3"></div>
                    
                    {/* Bids (Buy orders) */}
                    <div className="space-y-1">
                      {mockBids.map((bid, index) => (
                        <div key={index} className="grid grid-cols-3 text-sm">
                          <div className="text-green-500">{bid.price.toFixed(2)}</div>
                          <div className="text-center">{bid.size.toFixed(3)}</div>
                          <div className="text-right">{bid.total.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <Card className="bg-black/20 border border-white/10">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                        AI Buy Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          Bullish momentum detected on 15m timeframe
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          Support level identified at 2344.00
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                          Medium volatility expected in next hour
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-black/20 border border-white/10">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl flex items-center">
                        <TrendingDown className="mr-2 h-5 w-5 text-red-500" />
                        AI Sell Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          Resistance level at 2348.50
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                          RSI approaching overbought on 5m chart
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                          No significant sell pressure from whales
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Your Orders Tab */}
              <TabsContent value="orders" className="m-0 space-y-6">
                <Card className="bg-black/20 border border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl flex items-center">
                      <Clock3 className="mr-2 h-5 w-5 text-defi-purple" />
                      Open Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {openOrders.length === 0 ? (
                      <div className="text-center py-6 text-white/60">
                        No open orders at the moment
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Type</TableHead>
                              <TableHead>Pair</TableHead>
                              <TableHead>Side</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                              <TableHead className="text-right">Filled</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {openOrders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell>{order.type}</TableCell>
                                <TableCell>{order.pair}</TableCell>
                                <TableCell className={order.side === 'Buy' ? 'text-green-500' : 'text-red-500'}>
                                  {order.side}
                                </TableCell>
                                <TableCell className="text-right">{order.price}</TableCell>
                                <TableCell className="text-right">{order.amount}</TableCell>
                                <TableCell className="text-right">{order.filled}</TableCell>
                                <TableCell>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleCancelOrder(order.id)}
                                    className="h-8 px-2 text-red-500 hover:text-red-700"
                                  >
                                    Cancel
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="bg-black/20 border border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl flex items-center">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-defi-teal" />
                      Completed Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Pair</TableHead>
                            <TableHead>Side</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockCompletedOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>{order.type}</TableCell>
                              <TableCell>{order.pair}</TableCell>
                              <TableCell className={order.side === 'Buy' ? 'text-green-500' : 'text-red-500'}>
                                {order.side}
                              </TableCell>
                              <TableCell className="text-right">{order.price}</TableCell>
                              <TableCell className="text-right">{order.amount}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {order.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right text-white/70">{order.timestamp}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Performance Tab */}
              <TabsContent value="performance" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-black/20 border border-white/10">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl flex items-center">
                        <BarChart4 className="mr-2 h-5 w-5 text-defi-teal" />
                        Trading Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-white/70">Total Trades</p>
                          <p className="text-2xl font-bold">{mockPerformanceData.totalTrades}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-white/70">Win Rate</p>
                          <p className="text-2xl font-bold text-green-500">{mockPerformanceData.winRate}%</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-white/70">Total Volume</p>
                          <p className="text-2xl font-bold">{mockPerformanceData.totalVolume.toFixed(2)} ETH</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-white/70">Total P&L</p>
                          <p className="text-2xl font-bold text-green-500">+{mockPerformanceData.pnl.toFixed(2)} USDC</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-black/20 border border-white/10">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl flex items-center">
                        <Activity className="mr-2 h-5 w-5 text-defi-purple" />
                        AI Market Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/70">ETH Market Sentiment</span>
                          <span className="text-sm font-medium text-green-500">Bullish</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-defi-blue to-defi-teal" style={{ width: '72%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/70">Current Volatility</span>
                          <span className="text-sm font-medium text-yellow-500">Medium</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-defi-teal to-defi-purple" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/70">Liquidity Depth</span>
                          <span className="text-sm font-medium text-green-500">High</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-defi-purple to-defi-blue" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-black/20 border border-white/10 md:col-span-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl flex items-center">
                        <CircleDollarSign className="mr-2 h-5 w-5 text-defi-teal" />
                        Strategy Effectiveness
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <h4 className="font-medium text-center">Aggressive</h4>
                          <div className="bg-black/30 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/70">Win Rate</span>
                              <span>76%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/70">Avg. Profit</span>
                              <span className="text-green-500">+5.2%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/70">Volatility</span>
                              <span className="text-red-500">High</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-center">Balanced</h4>
                          <div className="bg-black/30 rounded-lg p-4 space-y-3 border border-defi-teal/50">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/70">Win Rate</span>
                              <span>91%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/70">Avg. Profit</span>
                              <span className="text-green-500">+3.7%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/70">Volatility</span>
                              <span className="text-yellow-500">Medium</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-center">Conservative</h4>
                          <div className="bg-black/30 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/70">Win Rate</span>
                              <span>98%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/70">Avg. Profit</span>
                              <span className="text-green-500">+1.8%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/70">Volatility</span>
                              <span className="text-green-500">Low</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MarketMaker;
