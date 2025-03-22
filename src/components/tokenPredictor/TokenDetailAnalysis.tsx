
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Area, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { 
  Clock, Download, Bell, ChevronLeft, LineChart as LineChartIcon, 
  BarChart3, TrendingUp, FileText, ArrowUpRight, ArrowDownRight,
  Info, ExternalLink, AlertCircle, Plus, Minus, Link, Twitter
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TokenDetailAnalysisProps {
  open: boolean;
  onClose: () => void;
  token: {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    marketCap: string;
    volume: string;
    riskScore: number;
    sentiment: number;
  };
}

const TokenDetailAnalysis = ({ open, onClose, token }: TokenDetailAnalysisProps) => {
  // Sample price history data
  const priceHistoryData = [
    { date: '2023-05-01', price: 39800, volume: 24500 },
    { date: '2023-05-02', price: 40100, volume: 26700 },
    { date: '2023-05-03', price: 41000, volume: 29800 },
    { date: '2023-05-04', price: 41200, volume: 27500 },
    { date: '2023-05-05', price: 41500, volume: 32100 },
    { date: '2023-05-06', price: 42000, volume: 35400 },
    { date: '2023-05-07', price: 42368, volume: 29700 },
    { date: '2023-05-08', price: 42100, volume: 28500 },
    { date: '2023-05-09', price: 41800, volume: 25600 },
    { date: '2023-05-10', price: 42500, volume: 31200 },
    { date: '2023-05-11', price: 43100, volume: 36800 },
    { date: '2023-05-12', price: 43500, volume: 40100 },
    { date: '2023-05-13', price: 44200, volume: 45300 },
    { date: '2023-05-14', price: 44800, volume: 42700 },
  ];

  // Sample technical indicators data
  const technicalData = {
    rsi: 68,
    macd: 'Bullish',
    macdValue: 235,
    macdSignal: 180,
    bollingerUpper: 45200,
    bollingerMiddle: 42900,
    bollingerLower: 40600,
    supportLevels: [39800, 38500],
    resistanceLevels: [45000, 47200],
  };

  // Sample on-chain data
  const onchainData = {
    whaleTransactions: [
      { date: '2023-05-13', amount: 450, type: 'buy' },
      { date: '2023-05-12', amount: 300, type: 'buy' },
      { date: '2023-05-10', amount: 280, type: 'sell' },
    ],
    exchangeFlow: -1250, // negative means outflow (bullish)
    activeWallets: 18500,
    dailyTransactions: 245000,
  };

  // News and sentiment data
  const newsData = [
    { 
      source: 'CryptoNews', 
      title: 'Bitcoin Shows Strength as Institutions Increase Holdings', 
      sentiment: 'positive',
      date: '2 hours ago',
      url: '#'
    },
    { 
      source: 'CoinDesk', 
      title: 'Market Analysis: BTC Technical Indicators Point to Continued Uptrend', 
      sentiment: 'positive',
      date: '5 hours ago',
      url: '#' 
    },
    { 
      source: 'Bloomberg', 
      title: 'Cryptocurrency Market Faces Regulatory Challenges in Asia', 
      sentiment: 'neutral',
      date: '1 day ago',
      url: '#' 
    },
    { 
      source: 'Reuters', 
      title: 'Bitcoin Mining Difficulty Reaches New All-Time High', 
      sentiment: 'neutral',
      date: '2 days ago',
      url: '#' 
    },
  ];

  // Sample distribution data for the pie chart
  const sentimentDistribution = [
    { name: 'Positive', value: 62, color: '#4ADE80' },
    { name: 'Neutral', value: 23, color: '#94A3B8' },
    { name: 'Negative', value: 15, color: '#F87171' },
  ];

  // MACD chart data
  const macdData = priceHistoryData.map((item, index) => ({
    date: item.date,
    macd: technicalData.macdValue - (index < 7 ? index * 5 : (14 - index) * 5),
    signal: technicalData.macdSignal - (index < 7 ? index * 3 : (14 - index) * 3),
    histogram: (technicalData.macdValue - (index < 7 ? index * 5 : (14 - index) * 5)) - 
               (technicalData.macdSignal - (index < 7 ? index * 3 : (14 - index) * 3))
  }));

  // Get appropriate badge colors
  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500/20 text-green-400';
      case 'neutral':
        return 'bg-white/10 text-white';
      case 'negative':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-white/10 text-white';
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl bg-gray-900 border border-white/10 text-white">
        <DialogHeader>
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={onClose} className="mr-2 h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-2xl font-bold">
              {token.name} ({token.symbol}) Detailed Analysis
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 max-h-[80vh] overflow-y-auto p-1">
          {/* Overview Stats */}
          <Card className="p-6 bg-feature-gradient border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-md p-4">
                <span className="text-sm text-white/70 block">Current Price</span>
                <span className="text-white text-xl font-semibold">${token.price.toLocaleString()}</span>
                <span className={`text-xs ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'} flex items-center`}>
                  {token.change24h >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {token.change24h >= 0 ? '+' : ''}{token.change24h}% (24h)
                </span>
              </div>

              <div className="bg-white/5 rounded-md p-4">
                <span className="text-sm text-white/70 block">Market Cap</span>
                <span className="text-white text-xl font-semibold">{token.marketCap}</span>
              </div>

              <div className="bg-white/5 rounded-md p-4">
                <span className="text-sm text-white/70 block">24h Volume</span>
                <span className="text-white text-xl font-semibold">{token.volume}</span>
              </div>

              <div className="bg-white/5 rounded-md p-4">
                <span className="text-sm text-white/70 block">Risk Score</span>
                <div className="flex items-center">
                  <Badge className={`
                    ${token.riskScore < 35 ? 'bg-green-500/20 text-green-400' : 
                      token.riskScore < 65 ? 'bg-orange-500/20 text-orange-400' : 
                      'bg-red-500/20 text-red-400'}
                  `}>
                    {token.riskScore < 35 ? 'Low' : token.riskScore < 65 ? 'Medium' : 'High'}
                  </Badge>
                  <div className="ml-2 w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        token.riskScore < 35 ? 'bg-green-400' : 
                        token.riskScore < 65 ? 'bg-orange-400' : 
                        'bg-red-400'
                      }`}
                      style={{ width: `${token.riskScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="price" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="price">
                <LineChartIcon className="h-4 w-4 mr-2" />
                Price Chart
              </TabsTrigger>
              <TabsTrigger value="predictions">
                <TrendingUp className="h-4 w-4 mr-2" />
                Predictions
              </TabsTrigger>
              <TabsTrigger value="technical">
                <BarChart3 className="h-4 w-4 mr-2" />
                Technical
              </TabsTrigger>
              <TabsTrigger value="onchain">
                <Link className="h-4 w-4 mr-2" />
                On-Chain
              </TabsTrigger>
              <TabsTrigger value="sentiment">
                <Twitter className="h-4 w-4 mr-2" />
                Sentiment
              </TabsTrigger>
            </TabsList>

            {/* Price Chart Tab */}
            <TabsContent value="price" className="space-y-6">
              <Card className="p-6 bg-feature-gradient border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Price History</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8">1D</Button>
                    <Button variant="outline" size="sm" className="h-8 bg-white/10">7D</Button>
                    <Button variant="outline" size="sm" className="h-8">30D</Button>
                    <Button variant="outline" size="sm" className="h-8">90D</Button>
                    <Button variant="outline" size="sm" className="h-8">1Y</Button>
                  </div>
                </div>
                
                <div className="h-96 w-full bg-white/5 rounded-md p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="date" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#333', border: '1px solid #555' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        name="Price (USD)" 
                        stroke="#3ABAB4" 
                        strokeWidth={2}
                        dot={{ r: 0 }}
                        activeDot={{ r: 6 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        fill="#3ABAB430"
                        stroke="transparent"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6 bg-feature-gradient border-white/5">
                <h2 className="text-xl font-semibold text-white mb-4">Volume Analysis</h2>
                
                <div className="h-64 w-full bg-white/5 rounded-md p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={priceHistoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="date" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#333', border: '1px solid #555' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Bar dataKey="volume" name="Volume" fill="#805AD5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </TabsContent>

            {/* Predictions Tab */}
            <TabsContent value="predictions" className="space-y-6">
              <Card className="p-6 bg-feature-gradient border-white/5">
                <h2 className="text-xl font-semibold text-white mb-4">AI Price Predictions</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 rounded-md p-4">
                    <span className="text-sm text-white/70 block">7-Day Prediction</span>
                    <span className="text-white text-xl font-semibold">$45,800</span>
                    <span className="text-xs text-green-400">+8.1% from current</span>
                    <Badge className="mt-2 bg-green-500/20 text-green-400">High Confidence</Badge>
                  </div>
                  
                  <div className="bg-white/5 rounded-md p-4">
                    <span className="text-sm text-white/70 block">30-Day Prediction</span>
                    <span className="text-white text-xl font-semibold">$48,500</span>
                    <span className="text-xs text-green-400">+14.7% from current</span>
                    <Badge className="mt-2 bg-orange-500/20 text-orange-400">Medium Confidence</Badge>
                  </div>
                  
                  <div className="bg-white/5 rounded-md p-4">
                    <span className="text-sm text-white/70 block">90-Day Prediction</span>
                    <span className="text-white text-xl font-semibold">$52,000</span>
                    <span className="text-xs text-green-400">+22.7% from current</span>
                    <Badge className="mt-2 bg-orange-500/20 text-orange-400">Medium Confidence</Badge>
                  </div>
                </div>
                
                <div className="h-80 w-full bg-white/5 rounded-md p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#888"
                        type="category"
                        allowDuplicatedCategory={false}
                        domain={['dataMin', 'dataMax']}
                      />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#333', border: '1px solid #555' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Line 
                        dataKey="price" 
                        data={priceHistoryData} 
                        name="Historical Price" 
                        stroke="#3ABAB4" 
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line 
                        dataKey="price" 
                        data={[
                          { date: priceHistoryData[priceHistoryData.length-1].date, price: priceHistoryData[priceHistoryData.length-1].price },
                          { date: '2023-05-21', price: 45800 },
                          { date: '2023-06-13', price: 48500 },
                          { date: '2023-08-12', price: 52000 }
                        ]} 
                        name="Predicted Price" 
                        stroke="#805AD5" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                      <Area
                        dataKey="min"
                        data={[
                          { date: priceHistoryData[priceHistoryData.length-1].date, min: priceHistoryData[priceHistoryData.length-1].price, max: priceHistoryData[priceHistoryData.length-1].price },
                          { date: '2023-05-21', min: 44000, max: 47600 },
                          { date: '2023-06-13', min: 45700, max: 51300 },
                          { date: '2023-08-12', min: 47000, max: 57000 }
                        ]}
                        stroke="transparent"
                        fill="#805AD520"
                        name="Confidence Range (Min)"
                      />
                      <Area
                        dataKey="max"
                        data={[
                          { date: priceHistoryData[priceHistoryData.length-1].date, min: priceHistoryData[priceHistoryData.length-1].price, max: priceHistoryData[priceHistoryData.length-1].price },
                          { date: '2023-05-21', min: 44000, max: 47600 },
                          { date: '2023-06-13', min: 45700, max: 51300 },
                          { date: '2023-08-12', min: 47000, max: 57000 }
                        ]}
                        stroke="transparent"
                        fill="transparent"
                        name="Confidence Range (Max)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6 bg-feature-gradient border-white/5">
                <h2 className="text-xl font-semibold text-white mb-4">Key Prediction Factors</h2>
                
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white">Institutional Buying</h3>
                        <p className="text-white/70 text-sm mt-1">
                          Increased institutional purchases detected from on-chain analytics
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge className="mb-1 bg-defi-teal/20 text-defi-teal">High Impact</Badge>
                        <span className="flex items-center text-sm text-green-400">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          Positive
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white">Technical Pattern Formation</h3>
                        <p className="text-white/70 text-sm mt-1">
                          Bullish cup and handle pattern formed on the 4-hour chart
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge className="mb-1 bg-defi-teal/20 text-defi-teal">High Impact</Badge>
                        <span className="flex items-center text-sm text-green-400">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          Positive
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white">Social Media Sentiment</h3>
                        <p className="text-white/70 text-sm mt-1">
                          Growing positive discussions on Twitter and Reddit
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge className="mb-1 bg-white/10 text-white">Medium Impact</Badge>
                        <span className="flex items-center text-sm text-green-400">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          Positive
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white">Regulatory Environment</h3>
                        <p className="text-white/70 text-sm mt-1">
                          Potential new regulations in Asian markets could affect growth
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge className="mb-1 bg-white/10 text-white">Medium Impact</Badge>
                        <span className="flex items-center text-sm text-red-400">
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                          Negative
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Technical Tab */}
            <TabsContent value="technical" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-feature-gradient border-white/5">
                  <h2 className="text-xl font-semibold text-white mb-4">RSI Analysis</h2>
                  
                  <div className="bg-white/5 rounded-md p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Current RSI</span>
                      <span className="text-white font-medium">{technicalData.rsi}</span>
                    </div>
                    <div className="h-6 w-full bg-white/10 rounded-full overflow-hidden relative">
                      <div className="h-full bg-defi-teal" style={{ width: `${technicalData.rsi}%` }}></div>
                      <div className="absolute inset-0 flex">
                        <div className="w-3/10 h-full border-r border-white/30 flex items-center justify-end pr-2">
                          <span className="text-xs text-white/50">Oversold</span>
                        </div>
                        <div className="w-4/10 h-full border-r border-white/30 flex items-center justify-end pr-2">
                          <span className="text-xs text-white/50">Neutral</span>
                        </div>
                        <div className="w-3/10 h-full flex items-center justify-end pr-2">
                          <span className="text-xs text-white/50">Overbought</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-sm">
                    The Relative Strength Index (RSI) is at <span className="text-white">{technicalData.rsi}</span>, 
                    indicating the asset is approaching overbought territory but still has room for growth.
                    Historically, this level has led to short-term consolidation followed by continued upward movement.
                  </p>
                </Card>

                <Card className="p-6 bg-feature-gradient border-white/5">
                  <h2 className="text-xl font-semibold text-white mb-4">MACD Analysis</h2>
                  
                  <div className="h-48 w-full bg-white/5 rounded-md p-4 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={macdData} 
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="date" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#333', border: '1px solid #555' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Bar 
                          dataKey="histogram" 
                          name="Histogram" 
                          fill="#3ABAB4" 
                          radius={[3, 3, 0, 0]}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="macd" 
                          name="MACD" 
                          stroke="#805AD5" 
                          dot={false}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="signal" 
                          name="Signal" 
                          stroke="#F87171" 
                          dot={false}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <p className="text-white/70 text-sm">
                    MACD is showing a <span className="text-white">bullish crossover</span> with the MACD line 
                    (value: {technicalData.macdValue}) above the signal line (value: {technicalData.macdSignal}). 
                    This typically indicates strong upward momentum in the short to medium term.
                  </p>
                </Card>
              </div>

              <Card className="p-6 bg-feature-gradient border-white/5">
                <h2 className="text-xl font-semibold text-white mb-4">Bollinger Bands Analysis</h2>
                
                <div className="h-80 w-full bg-white/5 rounded-md p-4 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="date" stroke="#888" />
                      <YAxis domain={[technicalData.bollingerLower - 1000, technicalData.bollingerUpper + 1000]} stroke="#888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#333', border: '1px solid #555' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        name="Price" 
                        stroke="#3ABAB4" 
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line 
                        dataKey={() => technicalData.bollingerMiddle} 
                        name="Middle Band (SMA20)" 
                        stroke="#FFFFFF" 
                        strokeWidth={1}
                        dot={false}
                      />
                      <Line 
                        dataKey={() => technicalData.bollingerUpper} 
                        name="Upper Band" 
                        stroke="#F87171" 
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        dot={false}
                      />
                      <Line 
                        dataKey={() => technicalData.bollingerLower} 
                        name="Lower Band" 
                        stroke="#3ABAB4" 
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="bg-white/5 rounded-md p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-white/70 block">Lower Band</span>
                      <span className="text-white text-lg font-semibold">${technicalData.bollingerLower.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-sm text-white/70 block">Middle Band (SMA20)</span>
                      <span className="text-white text-lg font-semibold">${technicalData.bollingerMiddle.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-sm text-white/70 block">Upper Band</span>
                      <span className="text-white text-lg font-semibold">${technicalData.bollingerUpper.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4 bg-white/10" />
                
                <h3 className="text-lg font-semibold text-white mb-2">Support & Resistance Levels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-md p-4">
                    <h4 className="text-white font-medium mb-2">Support Levels</h4>
                    <div className="space-y-2">
                      {technicalData.supportLevels.map((level, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-white/70">Support {index + 1}</span>
                          <span className="text-white font-medium">${level.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-md p-4">
                    <h4 className="text-white font-medium mb-2">Resistance Levels</h4>
                    <div className="space-y-2">
                      {technicalData.resistanceLevels.map((level, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-white/70">Resistance {index + 1}</span>
                          <span className="text-white font-medium">${level.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* On-Chain Tab */}
            <TabsContent value="onchain" className="space-y-6">
              <Card className="p-6 bg-feature-gradient border-white/5">
                <h2 className="text-xl font-semibold text-white mb-4">Whale Transactions</h2>
                
                <div className="space-y-4">
                  {onchainData.whaleTransactions.map((tx, index) => (
                    <div key={index} className="bg-white/5 rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full ${tx.type === 'buy' ? 'bg-green-500/20' : 'bg-red-500/20'} flex items-center justify-center mr-3`}>
                            {tx.type === 'buy' ? (
                              <Plus className={`h-5 w-5 ${tx.type === 'buy' ? 'text-green-400' : 'text-red-400'}`} />
                            ) : (
                              <Minus className={`h-5 w-5 ${tx.type === 'buy' ? 'text-green-400' : 'text-red-400'}`} />
                            )}
                          </div>
                          <div>
                            <span className={`${tx.type === 'buy' ? 'text-green-400' : 'text-red-400'} font-medium`}>
                              {tx.type === 'buy' ? 'Buy' : 'Sell'} Transaction
                            </span>
                            <span className="text-white/70 text-sm block">{tx.date}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-white font-medium">{tx.amount} {token.symbol}</span>
                          <span className="text-white/70 text-sm block">
                            ≈ ${(tx.amount * token.price).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  View More Transactions
                </Button>
              </Card>

              <Card className="p-6 bg-feature-gradient border-white/5">
                <h2 className="text-xl font-semibold text-white mb-4">Exchange Flows</h2>
                
                <div className="bg-white/5 rounded-md p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Net Exchange Flow (24h)</span>
                    <span className={`text-white font-medium ${onchainData.exchangeFlow < 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {onchainData.exchangeFlow < 0 ? '-' : '+'}{Math.abs(onchainData.exchangeFlow)} {token.symbol}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm">
                    {onchainData.exchangeFlow < 0 
                      ? `Net outflow from exchanges, typically a bullish signal as coins are being held rather than sold.`
                      : `Net inflow to exchanges, potentially indicating increased selling pressure.`}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-md p-4">
                    <span className="text-sm text-white/70 block">Active Wallets (24h)</span>
                    <span className="text-white text-xl font-semibold">{onchainData.activeWallets.toLocaleString()}</span>
                    <span className="text-xs text-green-400">+8.5% vs previous 24h</span>
                  </div>
                  <div className="bg-white/5 rounded-md p-4">
                    <span className="text-sm text-white/70 block">Daily Transactions</span>
                    <span className="text-white text-xl font-semibold">{onchainData.dailyTransactions.toLocaleString()}</span>
                    <span className="text-xs text-green-400">+12.3% vs previous day</span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Sentiment Tab */}
            <TabsContent value="sentiment" className="space-y-6">
              <Card className="p-6 bg-feature-gradient border-white/5">
                <h2 className="text-xl font-semibold text-white mb-4">Market Sentiment</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/5 rounded-md p-4 col-span-2">
                    <h3 className="text-white font-medium mb-4">Sentiment Distribution</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-green-400 flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                          Positive
                        </span>
                        <span className="text-white text-2xl font-semibold">{sentimentDistribution[0].value}%</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-400 flex items-center">
                          <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                          Neutral
                        </span>
                        <span className="text-white text-2xl font-semibold">{sentimentDistribution[1].value}%</span>
                      </div>
                      <div>
                        <span className="text-sm text-red-400 flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                          Negative
                        </span>
                        <span className="text-white text-2xl font-semibold">{sentimentDistribution[2].value}%</span>
                      </div>
                    </div>
                    
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-1">
                      <div className="h-full flex">
                        <div className="h-full bg-green-500" style={{ width: `${sentimentDistribution[0].value}%` }}></div>
                        <div className="h-full bg-gray-400" style={{ width: `${sentimentDistribution[1].value}%` }}></div>
                        <div className="h-full bg-red-500" style={{ width: `${sentimentDistribution[2].value}%` }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-md p-4">
                    <h3 className="text-white font-medium mb-4">Fear & Greed Index</h3>
                    <div className="h-40 w-40 mx-auto relative mb-4">
                      <div className="w-40 h-40 rounded-full border-8 border-white/10 flex items-center justify-center bg-white/5">
                        <span className="text-white text-3xl font-bold">74</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 text-center text-white font-medium">Greed</div>
                    </div>
                    <p className="text-white/70 text-sm text-center">
                      Market is currently in "Greed" territory, suggesting potential caution for buyers.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-feature-gradient border-white/5">
                <h2 className="text-xl font-semibold text-white mb-4">Recent News & Social Media</h2>
                
                <div className="space-y-4">
                  {newsData.map((news, index) => (
                    <div key={index} className="bg-white/5 rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-white">{news.title}</h3>
                          <div className="flex items-center mt-1">
                            <span className="text-white/70 text-sm">{news.source}</span>
                            <span className="text-white/50 text-sm mx-2">•</span>
                            <span className="text-white/70 text-sm">{news.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge className={getSentimentBadge(news.sentiment)}>
                            {news.sentiment.charAt(0).toUpperCase() + news.sentiment.slice(1)}
                          </Badge>
                          <Button variant="ghost" size="sm" className="ml-2 h-8 w-8 p-0">
                            <ExternalLink className="h-4 w-4 text-white/70" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Load More News
                </Button>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Analysis
              </Button>
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Set Price Alert
              </Button>
            </div>
            <div className="flex gap-2">
              <Button className="bg-button-gradient">
                <TrendingUp className="h-4 w-4 mr-2" />
                Apply Trading Strategy
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenDetailAnalysis;
