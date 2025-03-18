
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, TrendingUp, TrendingDown, AlertCircle, Users, MessageSquare, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type TradeType = {
  id: string;
  date: string;
  pair: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  profitLoss: number;
  status: 'profit' | 'loss';
  analysis: string;
};

const mockTrades: TradeType[] = [
  {
    id: '1',
    date: '2023-06-15',
    pair: 'ETH/USDC',
    type: 'buy',
    amount: 0.5,
    price: 1850,
    profitLoss: 125,
    status: 'profit',
    analysis: 'Good entry point at support level, optimal exit timing'
  },
  {
    id: '2',
    date: '2023-06-18',
    pair: 'LINK/USDC',
    type: 'buy',
    amount: 25,
    price: 6.2,
    profitLoss: -32,
    status: 'loss',
    analysis: 'Entered during downtrend, insufficient stop loss'
  },
  {
    id: '3',
    date: '2023-06-25',
    pair: 'BTC/USDC',
    type: 'sell',
    amount: 0.1,
    price: 29500,
    profitLoss: 180,
    status: 'profit',
    analysis: 'Good exit at resistance, avoided subsequent drop'
  },
  {
    id: '4',
    date: '2023-07-02',
    pair: 'ETH/USDC',
    type: 'sell',
    amount: 0.5,
    price: 1950,
    profitLoss: 50,
    status: 'profit',
    analysis: 'Exit could have been delayed for higher profit'
  },
  {
    id: '5',
    date: '2023-07-10',
    pair: 'SOL/USDC',
    type: 'buy',
    amount: 10,
    price: 20.5,
    profitLoss: -75,
    status: 'loss',
    analysis: 'Entered against trend, poor risk management'
  },
];

const TradeReport = () => {
  const totalTrades = mockTrades.length;
  const profitableTrades = mockTrades.filter(trade => trade.status === 'profit').length;
  const winRate = (profitableTrades / totalTrades) * 100;
  const totalProfitLoss = mockTrades.reduce((sum, trade) => sum + trade.profitLoss, 0);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/20 border border-white/10 p-6">
          <div className="flex items-center mb-2">
            <LineChart className="h-5 w-5 mr-2 text-defi-teal" />
            <h3 className="font-medium text-white">Win Rate</h3>
          </div>
          <p className="text-3xl font-bold text-white">{winRate.toFixed(1)}%</p>
          <p className="text-white/60 text-sm">
            {profitableTrades} profitable trades out of {totalTrades}
          </p>
        </Card>
        
        <Card className="bg-black/20 border border-white/10 p-6">
          <div className="flex items-center mb-2">
            {totalProfitLoss >= 0 ? (
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
            )}
            <h3 className="font-medium text-white">Total P&L</h3>
          </div>
          <p className={`text-3xl font-bold ${totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ${totalProfitLoss >= 0 ? '+' : ''}{totalProfitLoss}
          </p>
          <p className="text-white/60 text-sm">Last 30 days</p>
        </Card>
        
        <Card className="bg-black/20 border border-white/10 p-6">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 mr-2 text-defi-blue" />
            <h3 className="font-medium text-white">Risk Analysis</h3>
          </div>
          <p className="text-3xl font-bold text-defi-blue">Medium</p>
          <p className="text-white/60 text-sm">Suggested improvements: 3</p>
        </Card>
      </div>
      
      <Tabs defaultValue="trades">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="trades">Trade Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Trader Comparison</TabsTrigger>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trades">
          <Card className="bg-black/20 border border-white/10 p-6">
            <h3 className="text-xl font-medium text-white mb-4">Trade Performance Analysis</h3>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-white/60">Date</TableHead>
                    <TableHead className="text-white/60">Pair</TableHead>
                    <TableHead className="text-white/60">Type</TableHead>
                    <TableHead className="text-white/60">Amount</TableHead>
                    <TableHead className="text-white/60">Price</TableHead>
                    <TableHead className="text-white/60">P&L</TableHead>
                    <TableHead className="text-white/60">AI Analysis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTrades.map((trade) => (
                    <TableRow key={trade.id} className="border-white/5">
                      <TableCell className="text-white">{trade.date}</TableCell>
                      <TableCell className="text-white">{trade.pair}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          trade.type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {trade.type.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell className="text-white">{trade.amount}</TableCell>
                      <TableCell className="text-white">${trade.price}</TableCell>
                      <TableCell className={`font-medium ${
                        trade.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {trade.profitLoss >= 0 ? '+' : ''}${trade.profitLoss}
                      </TableCell>
                      <TableCell className="max-w-xs text-white/80 text-sm">{trade.analysis}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-medium text-white mb-4">Performance Overview</h4>
              <div className="h-64 flex items-center justify-center border border-white/10 rounded-md">
                <LineChart className="h-10 w-10 text-white/40" />
                <span className="ml-2 text-white/40">Detailed analysis chart would appear here</span>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison">
          <Card className="bg-black/20 border border-white/10 p-6">
            <div className="flex items-center mb-6">
              <Users className="h-5 w-5 mr-2 text-defi-purple" />
              <h3 className="text-xl font-medium text-white">Top Trader Comparison</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-black/40 p-4 rounded-md">
                <h4 className="text-lg font-medium text-white mb-3">Your Performance</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Win Rate:</span>
                    <span className="text-white">{winRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Avg. Hold Time:</span>
                    <span className="text-white">3.2 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Risk-Reward Ratio:</span>
                    <span className="text-white">1:1.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Biggest Win:</span>
                    <span className="text-green-500">+$180</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Biggest Loss:</span>
                    <span className="text-red-500">-$75</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 p-4 rounded-md">
                <h4 className="text-lg font-medium text-white mb-3">Top Traders (Average)</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Win Rate:</span>
                    <span className="text-white">68.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Avg. Hold Time:</span>
                    <span className="text-white">5.8 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Risk-Reward Ratio:</span>
                    <span className="text-white">1:2.3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Strategy Type:</span>
                    <span className="text-white">Trend Following</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Common Pairs:</span>
                    <span className="text-white">ETH, BTC, SOL</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/40 p-4 rounded-md">
              <h4 className="text-lg font-medium text-white mb-3">Key Differences</h4>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium">Short Hold Time</p>
                    <p className="text-white/60 text-sm">
                      You typically exit positions 2.6 days earlier than top traders, potentially missing extended moves.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium">Poor Risk-Reward</p>
                    <p className="text-white/60 text-sm">
                      Your risk-reward ratio is significantly lower than top traders, limiting overall profitability.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium">Good Entry Timing</p>
                    <p className="text-white/60 text-sm">
                      Your market entries are well-timed, similar to top traders, especially on ETH pairs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="suggestions">
          <Card className="bg-black/20 border border-white/10 p-6">
            <div className="flex items-center mb-6">
              <MessageSquare className="h-5 w-5 mr-2 text-defi-teal" />
              <h3 className="text-xl font-medium text-white">AI Trade Optimization Suggestions</h3>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-defi-teal pl-4 py-2">
                <h4 className="text-lg font-medium text-white mb-2">Improve Risk Management</h4>
                <p className="text-white/80 text-sm mb-3">
                  Your SOL/USDC trades show poor risk management. Consider implementing these adjustments:
                </p>
                <ul className="list-disc ml-5 text-white/70 text-sm space-y-1">
                  <li>Set stop losses at max 2% below entry for volatile assets like SOL</li>
                  <li>Aim for minimum 1:2 risk-reward ratio on all trades</li>
                  <li>Limit position size to 5% of portfolio for high-risk assets</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-defi-purple pl-4 py-2">
                <h4 className="text-lg font-medium text-white mb-2">Extend Hold Times</h4>
                <p className="text-white/80 text-sm mb-3">
                  Analysis shows you're exiting profitable trades too early. Recommended changes:
                </p>
                <ul className="list-disc ml-5 text-white/70 text-sm space-y-1">
                  <li>Use trailing stops instead of fixed take-profit levels</li>
                  <li>Consider partial profit-taking (25%, 50%, 75%) instead of full exits</li>
                  <li>Hold trend-following trades for minimum 5-7 days when in profit</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-defi-blue pl-4 py-2">
                <h4 className="text-lg font-medium text-white mb-2">Avoid Counter-Trend Trading</h4>
                <p className="text-white/80 text-sm mb-3">
                  3 of your losing trades were counter-trend entries. Improvement strategy:
                </p>
                <ul className="list-disc ml-5 text-white/70 text-sm space-y-1">
                  <li>Wait for confirmation of trend reversal before entering positions</li>
                  <li>Use multiple timeframe analysis to confirm trend direction</li>
                  <li>Reduce position size by 50% when trading against the primary trend</li>
                </ul>
              </div>
              
              <Button className="w-full bg-defi-gradient hover:opacity-90 text-white">
                Enable Real-Time Trading Feedback
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradeReport;
