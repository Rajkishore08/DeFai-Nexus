
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Search, BookmarkPlus, BookmarkCheck, TrendingUp, TrendingDown, AlertTriangle, Twitter, MessageSquare, Newspaper, ArrowRight, Plus, ChevronRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface Token {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  change24h: number;
  predictions: {
    shortTerm: number;
    midTerm: number;
    longTerm: number;
  };
  chart: {
    price: Array<{ date: string; price: number }>;
    prediction: Array<{ date: string; price: number; }>;
  };
  sentiment: {
    score: number;
    twitter: number;
    reddit: number;
    news: number;
  };
  risk: {
    score: number;
    volatility: number;
    liquidity: number;
    marketCap: number;
  };
  suggestion: string;
}

const TokenPredictor = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const [tokens, setTokens] = useState<Token[]>([
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=026',
      price: 48250.75,
      change24h: 2.34,
      predictions: {
        shortTerm: 49500,
        midTerm: 52000,
        longTerm: 58000
      },
      chart: {
        price: [
          { date: '01/01', price: 42000 },
          { date: '01/15', price: 43500 },
          { date: '02/01', price: 41800 },
          { date: '02/15', price: 44200 },
          { date: '03/01', price: 45800 },
          { date: '03/15', price: 47300 },
          { date: '04/01', price: 48250 }
        ],
        prediction: [
          { date: '04/01', price: 48250 },
          { date: '04/15', price: 49500 },
          { date: '05/01', price: 50200 },
          { date: '05/15', price: 51500 },
          { date: '06/01', price: 52000 },
          { date: '06/15', price: 53400 },
          { date: '07/01', price: 55200 },
          { date: '07/15', price: 56800 },
          { date: '08/01', price: 58000 }
        ]
      },
      sentiment: {
        score: 76,
        twitter: 82,
        reddit: 71,
        news: 74
      },
      risk: {
        score: 32,
        volatility: 25,
        liquidity: 15,
        marketCap: 10
      },
      suggestion: 'BUY'
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=026',
      price: 2875.42,
      change24h: 3.12,
      predictions: {
        shortTerm: 3050,
        midTerm: 3250,
        longTerm: 3850
      },
      chart: {
        price: [
          { date: '01/01', price: 2200 },
          { date: '01/15', price: 2350 },
          { date: '02/01', price: 2280 },
          { date: '02/15', price: 2450 },
          { date: '03/01', price: 2650 },
          { date: '03/15', price: 2780 },
          { date: '04/01', price: 2875 }
        ],
        prediction: [
          { date: '04/01', price: 2875 },
          { date: '04/15', price: 3050 },
          { date: '05/01', price: 3150 },
          { date: '05/15', price: 3200 },
          { date: '06/01', price: 3250 },
          { date: '06/15', price: 3400 },
          { date: '07/01', price: 3600 },
          { date: '07/15', price: 3750 },
          { date: '08/01', price: 3850 }
        ]
      },
      sentiment: {
        score: 81,
        twitter: 86,
        reddit: 82,
        news: 76
      },
      risk: {
        score: 28,
        volatility: 22,
        liquidity: 12,
        marketCap: 8
      },
      suggestion: 'BUY'
    },
    {
      id: '3',
      symbol: 'SOL',
      name: 'Solana',
      logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=026',
      price: 135.28,
      change24h: 5.68,
      predictions: {
        shortTerm: 148,
        midTerm: 165,
        longTerm: 210
      },
      chart: {
        price: [
          { date: '01/01', price: 95 },
          { date: '01/15', price: 105 },
          { date: '02/01', price: 112 },
          { date: '02/15', price: 118 },
          { date: '03/01', price: 125 },
          { date: '03/15', price: 130 },
          { date: '04/01', price: 135 }
        ],
        prediction: [
          { date: '04/01', price: 135 },
          { date: '04/15', price: 148 },
          { date: '05/01', price: 155 },
          { date: '05/15', price: 160 },
          { date: '06/01', price: 165 },
          { date: '06/15', price: 175 },
          { date: '07/01', price: 190 },
          { date: '07/15', price: 200 },
          { date: '08/01', price: 210 }
        ]
      },
      sentiment: {
        score: 84,
        twitter: 88,
        reddit: 85,
        news: 79
      },
      risk: {
        score: 42,
        volatility: 38,
        liquidity: 22,
        marketCap: 18
      },
      suggestion: 'STRONG BUY'
    },
    {
      id: '4',
      symbol: 'LINK',
      name: 'Chainlink',
      logo: 'https://cryptologos.cc/logos/chainlink-link-logo.svg?v=026',
      price: 15.67,
      change24h: -1.28,
      predictions: {
        shortTerm: 15.2,
        midTerm: 17.5,
        longTerm: 22.8
      },
      chart: {
        price: [
          { date: '01/01', price: 14.2 },
          { date: '01/15', price: 15.8 },
          { date: '02/01', price: 16.5 },
          { date: '02/15', price: 17.2 },
          { date: '03/01', price: 16.4 },
          { date: '03/15', price: 15.9 },
          { date: '04/01', price: 15.67 }
        ],
        prediction: [
          { date: '04/01', price: 15.67 },
          { date: '04/15', price: 15.2 },
          { date: '05/01', price: 16.3 },
          { date: '05/15', price: 17.0 },
          { date: '06/01', price: 17.5 },
          { date: '06/15', price: 18.2 },
          { date: '07/01', price: 19.6 },
          { date: '07/15', price: 21.2 },
          { date: '08/01', price: 22.8 }
        ]
      },
      sentiment: {
        score: 62,
        twitter: 58,
        reddit: 65,
        news: 63
      },
      risk: {
        score: 38,
        volatility: 32,
        liquidity: 26,
        marketCap: 22
      },
      suggestion: 'HOLD'
    },
    {
      id: '5',
      symbol: 'UNI',
      name: 'Uniswap',
      logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=026',
      price: 8.43,
      change24h: -2.56,
      predictions: {
        shortTerm: 7.90,
        midTerm: 9.45,
        longTerm: 12.20
      },
      chart: {
        price: [
          { date: '01/01', price: 9.5 },
          { date: '01/15', price: 9.2 },
          { date: '02/01', price: 8.9 },
          { date: '02/15', price: 8.7 },
          { date: '03/01', price: 8.6 },
          { date: '03/15', price: 8.5 },
          { date: '04/01', price: 8.43 }
        ],
        prediction: [
          { date: '04/01', price: 8.43 },
          { date: '04/15', price: 7.9 },
          { date: '05/01', price: 8.2 },
          { date: '05/15', price: 8.7 },
          { date: '06/01', price: 9.45 },
          { date: '06/15', price: 10.1 },
          { date: '07/01', price: 10.8 },
          { date: '07/15', price: 11.5 },
          { date: '08/01', price: 12.2 }
        ]
      },
      sentiment: {
        score: 52,
        twitter: 48,
        reddit: 56,
        news: 53
      },
      risk: {
        score: 46,
        volatility: 42,
        liquidity: 28,
        marketCap: 25
      },
      suggestion: 'SELL'
    }
  ]);
  
  const [watchlist, setWatchlist] = useState<string[]>(['1', '3']);
  const [selectedToken, setSelectedToken] = useState<Token | null>(tokens[0]);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    toast({
      title: "Search results",
      description: `Found matches for "${searchQuery}". Displaying results.`,
    });
    
    setSearchQuery('');
  };
  
  const toggleWatchlist = (tokenId: string) => {
    if (watchlist.includes(tokenId)) {
      setWatchlist(watchlist.filter(id => id !== tokenId));
      toast({
        title: "Removed from Watchlist",
        description: `${tokens.find(t => t.id === tokenId)?.name} has been removed from your watchlist.`
      });
    } else {
      setWatchlist([...watchlist, tokenId]);
      toast({
        title: "Added to Watchlist",
        description: `${tokens.find(t => t.id === tokenId)?.name} has been added to your watchlist.`
      });
    }
  };

  const getSentimentColor = (score: number) => {
    if (score >= 70) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getRiskColor = (score: number) => {
    if (score <= 30) return 'text-green-500';
    if (score <= 50) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getSuggestionBadge = (suggestion: string) => {
    switch (suggestion) {
      case 'STRONG BUY':
        return <Badge className="bg-green-600 text-white">STRONG BUY</Badge>;
      case 'BUY':
        return <Badge className="bg-green-500 text-white">BUY</Badge>;
      case 'HOLD':
        return <Badge className="bg-yellow-500 text-white">HOLD</Badge>;
      case 'SELL':
        return <Badge className="bg-red-500 text-white">SELL</Badge>;
      case 'STRONG SELL':
        return <Badge className="bg-red-600 text-white">STRONG SELL</Badge>;
      default:
        return <Badge>{suggestion}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-20">
        <div className="mt-6 mb-4">
          <BackButton />
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Token Value Predictor</h1>
          <p className="text-white/70">AI-powered price forecasts and market sentiment analysis</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Token List Section */}
          <div className="lg:w-1/3">
            <Card className="border border-white/10 bg-defi-blue/5 mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search tokens..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                  <Button 
                    variant="outline" 
                    className="border-white/10 bg-white/5"
                    onClick={handleSearch}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="mb-4 w-full bg-defi-blue/20 border border-white/10">
                    <TabsTrigger value="all" className="flex-1">All Tokens</TabsTrigger>
                    <TabsTrigger value="watchlist" className="flex-1">My Watchlist</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all">
                    <div className="space-y-2">
                      {tokens.map((token) => (
                        <div 
                          key={token.id}
                          className={`flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-white/10 transition-colors ${selectedToken?.id === token.id ? 'bg-white/10 ring-1 ring-white/20' : ''}`}
                          onClick={() => setSelectedToken(token)}
                        >
                          <div className="flex items-center gap-3">
                            <img src={token.logo} alt={token.name} className="h-8 w-8" />
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{token.symbol}</h3>
                                <span className="text-xs text-white/50">{token.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-sm">${token.price.toLocaleString()}</span>
                                <Badge className={token.change24h >= 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
                                  {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWatchlist(token.id);
                            }}
                          >
                            {watchlist.includes(token.id) ? (
                              <BookmarkCheck className="h-5 w-5 text-defi-teal" />
                            ) : (
                              <BookmarkPlus className="h-5 w-5 text-white/60" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="watchlist">
                    {watchlist.length === 0 ? (
                      <div className="text-center py-10 text-white/60">
                        <BookmarkPlus className="h-10 w-10 mx-auto mb-3 opacity-50" />
                        <p>No tokens in your watchlist</p>
                        <Button 
                          variant="link" 
                          onClick={() => document.querySelector('[data-value="all"]')?.click()}
                        >
                          Browse tokens to add
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {tokens
                          .filter(token => watchlist.includes(token.id))
                          .map((token) => (
                            <div 
                              key={token.id}
                              className={`flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-white/10 transition-colors ${selectedToken?.id === token.id ? 'bg-white/10 ring-1 ring-white/20' : ''}`}
                              onClick={() => setSelectedToken(token)}
                            >
                              <div className="flex items-center gap-3">
                                <img src={token.logo} alt={token.name} className="h-8 w-8" />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">{token.symbol}</h3>
                                    <span className="text-xs text-white/50">{token.name}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm">${token.price.toLocaleString()}</span>
                                    <Badge className={token.change24h >= 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
                                      {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleWatchlist(token.id);
                                }}
                              >
                                <BookmarkCheck className="h-5 w-5 text-defi-teal" />
                              </Button>
                            </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="border border-white/10 bg-defi-blue/5">
              <CardHeader>
                <CardTitle>AI Market Insights</CardTitle>
                <CardDescription>Latest market trends and conditions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <h3 className="font-medium">Bullish Trend Detected</h3>
                  </div>
                  <p className="text-xs text-white/70">
                    AI detects strong buying pressure across large-cap tokens. BTC shows bullish momentum for the next 7-10 days.
                  </p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    <h3 className="font-medium">Volatility Alert</h3>
                  </div>
                  <p className="text-xs text-white/70">
                    Increased volatility expected in mid-cap tokens due to upcoming regulatory announcements on April 15th.
                  </p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="h-5 w-5 text-red-400" />
                    <h3 className="font-medium">Correction Warning</h3>
                  </div>
                  <p className="text-xs text-white/70">
                    DeFi tokens may see a 10-15% correction following recent gains before resuming upward movement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Token Details Section */}
          {selectedToken && (
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="border border-white/10 bg-defi-blue/5">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={selectedToken.logo} alt={selectedToken.name} className="h-10 w-10" />
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle>{selectedToken.symbol}</CardTitle>
                            <span className="text-white/50 text-sm">{selectedToken.name}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xl font-bold">${selectedToken.price.toLocaleString()}</span>
                            <Badge className={selectedToken.change24h >= 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
                              {selectedToken.change24h >= 0 ? '+' : ''}{selectedToken.change24h}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="h-9 border-white/10 bg-white/5"
                        onClick={() => toggleWatchlist(selectedToken.id)}
                      >
                        {watchlist.includes(selectedToken.id) ? (
                          <>
                            <BookmarkCheck className="mr-1 h-4 w-4 text-defi-teal" />
                            Watching
                          </>
                        ) : (
                          <>
                            <BookmarkPlus className="mr-1 h-4 w-4" />
                            Watch
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="w-full h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart 
                          data={[...selectedToken.chart.price, ...selectedToken.chart.prediction]} 
                          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                        >
                          <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#1E90FF" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#1E90FF" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#A020F0" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#A020F0" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="date" />
                          <YAxis domain={['auto', 'auto']} />
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <Tooltip contentStyle={{ backgroundColor: '#182233', borderColor: '#1E293B' }} />
                          <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#1E90FF"
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                            isAnimationActive={true}
                            strokeWidth={2}
                          />
                          <Area
                            type="monotone"
                            dataKey="price"
                            data={selectedToken.chart.prediction}
                            stroke="#A020F0"
                            fillOpacity={1}
                            fill="url(#colorPrediction)"
                            isAnimationActive={true}
                            strokeWidth={2}
                            strokeDasharray="5 5"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-center">
                        <p className="text-xs text-white/50">Current</p>
                        <p className="font-bold">${selectedToken.price.toLocaleString()}</p>
                      </div>
                      <div className="w-2/3 flex items-center">
                        <div className="w-full h-0.5 bg-white/10 relative">
                          <div className="absolute left-0 top-0 h-0.5 bg-defi-blue" style={{ width: '20%' }}></div>
                          <div className="absolute left-[20%] top-0 h-0.5 bg-defi-teal" style={{ width: '30%' }}></div>
                          <div className="absolute left-[50%] top-0 h-0.5 bg-defi-purple" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-white/50">AI Long-term</p>
                        <p className="font-bold">${selectedToken.predictions.longTerm.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-white/10 bg-defi-blue/5">
                  <CardHeader>
                    <CardTitle>AI Price Predictions</CardTitle>
                    <CardDescription>
                      Forecasts based on technical and on-chain data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">Short-Term (7 days)</span>
                        <span className={`font-bold ${selectedToken.predictions.shortTerm > selectedToken.price ? 'text-green-500' : 'text-red-500'}`}>
                          ${selectedToken.predictions.shortTerm.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={selectedToken.predictions.shortTerm > selectedToken.price ? 70 : 30} 
                          className="h-2"
                        />
                        <span className="text-xs text-white/50">
                          {selectedToken.predictions.shortTerm > selectedToken.price 
                            ? `+${((selectedToken.predictions.shortTerm / selectedToken.price - 1) * 100).toFixed(2)}%` 
                            : `${((selectedToken.predictions.shortTerm / selectedToken.price - 1) * 100).toFixed(2)}%`}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">Mid-Term (30 days)</span>
                        <span className={`font-bold ${selectedToken.predictions.midTerm > selectedToken.price ? 'text-green-500' : 'text-red-500'}`}>
                          ${selectedToken.predictions.midTerm.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={selectedToken.predictions.midTerm > selectedToken.price ? 75 : 25} 
                          className="h-2"
                        />
                        <span className="text-xs text-white/50">
                          {selectedToken.predictions.midTerm > selectedToken.price 
                            ? `+${((selectedToken.predictions.midTerm / selectedToken.price - 1) * 100).toFixed(2)}%` 
                            : `${((selectedToken.predictions.midTerm / selectedToken.price - 1) * 100).toFixed(2)}%`}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">Long-Term (90 days)</span>
                        <span className={`font-bold ${selectedToken.predictions.longTerm > selectedToken.price ? 'text-green-500' : 'text-red-500'}`}>
                          ${selectedToken.predictions.longTerm.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={selectedToken.predictions.longTerm > selectedToken.price ? 80 : 20} 
                          className="h-2"
                        />
                        <span className="text-xs text-white/50">
                          {selectedToken.predictions.longTerm > selectedToken.price 
                            ? `+${((selectedToken.predictions.longTerm / selectedToken.price - 1) * 100).toFixed(2)}%` 
                            : `${((selectedToken.predictions.longTerm / selectedToken.price - 1) * 100).toFixed(2)}%`}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <span>AI Trading Suggestion:</span>
                        <div>
                          {getSuggestionBadge(selectedToken.suggestion)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-white/10 bg-defi-blue/5">
                  <CardHeader>
                    <CardTitle>Market Sentiment Analysis</CardTitle>
                    <CardDescription>
                      AI-powered analysis of social media and news
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative w-32 h-32 mb-2">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`text-4xl font-bold ${getSentimentColor(selectedToken.sentiment.score)}`}>
                            {selectedToken.sentiment.score}
                          </div>
                        </div>
                        <svg viewBox="0 0 36 36" className="w-32 h-32 transform -rotate-90">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={selectedToken.sentiment.score >= 70 ? "#22c55e" : selectedToken.sentiment.score >= 50 ? "#eab308" : "#ef4444"}
                            strokeWidth="3"
                            strokeDasharray={`${selectedToken.sentiment.score}, 100`}
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Sentiment Score</p>
                        <p className="text-sm text-white/70">
                          {selectedToken.sentiment.score >= 70 ? 'Strongly Bullish' : 
                           selectedToken.sentiment.score >= 60 ? 'Bullish' :
                           selectedToken.sentiment.score >= 50 ? 'Neutral' :
                           selectedToken.sentiment.score >= 40 ? 'Bearish' : 'Strongly Bearish'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Twitter className="h-5 w-5 text-blue-400" />
                          <span>Twitter Sentiment</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={selectedToken.sentiment.twitter} className="w-20 h-2" />
                          <span className={getSentimentColor(selectedToken.sentiment.twitter)}>
                            {selectedToken.sentiment.twitter}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-orange-400" />
                          <span>Reddit Sentiment</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={selectedToken.sentiment.reddit} className="w-20 h-2" />
                          <span className={getSentimentColor(selectedToken.sentiment.reddit)}>
                            {selectedToken.sentiment.reddit}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Newspaper className="h-5 w-5 text-purple-400" />
                          <span>News Sentiment</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={selectedToken.sentiment.news} className="w-20 h-2" />
                          <span className={getSentimentColor(selectedToken.sentiment.news)}>
                            {selectedToken.sentiment.news}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-white/10 bg-defi-blue/5">
                  <CardHeader>
                    <CardTitle>Risk Analysis</CardTitle>
                    <CardDescription>
                      AI assessment of investment risk factors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative w-32 h-32 mb-2">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`text-4xl font-bold ${getRiskColor(selectedToken.risk.score)}`}>
                            {selectedToken.risk.score}
                          </div>
                        </div>
                        <svg viewBox="0 0 36 36" className="w-32 h-32 transform -rotate-90">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={selectedToken.risk.score <= 30 ? "#22c55e" : selectedToken.risk.score <= 50 ? "#eab308" : "#ef4444"}
                            strokeWidth="3"
                            strokeDasharray={`${selectedToken.risk.score}, 100`}
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Risk Score</p>
                        <p className="text-sm text-white/70">
                          {selectedToken.risk.score <= 30 ? 'Low Risk' : 
                           selectedToken.risk.score <= 50 ? 'Moderate Risk' : 'High Risk'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mt-2">
                      <div className="flex items-center justify-between">
                        <span>Volatility Risk</span>
                        <div className="flex items-center gap-2">
                          <Progress value={selectedToken.risk.volatility} className="w-20 h-2" />
                          <span className={getRiskColor(selectedToken.risk.volatility)}>
                            {selectedToken.risk.volatility}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span>Liquidity Risk</span>
                        <div className="flex items-center gap-2">
                          <Progress value={selectedToken.risk.liquidity} className="w-20 h-2" />
                          <span className={getRiskColor(selectedToken.risk.liquidity)}>
                            {selectedToken.risk.liquidity}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span>Market Cap Risk</span>
                        <div className="flex items-center gap-2">
                          <Progress value={selectedToken.risk.marketCap} className="w-20 h-2" />
                          <span className={getRiskColor(selectedToken.risk.marketCap)}>
                            {selectedToken.risk.marketCap}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TokenPredictor;
