
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Twitter, MessageSquare, TrendingUp, Eye, Plus, Search, ArrowUpRight, Info, BarChart3, AlertCircle, Timer, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const TokenPredictor = () => {
  const [watchlist, setWatchlist] = useState<string[]>(['bitcoin', 'ethereum', 'ripple']);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  // Sample token data
  const tokens = [
    { 
      id: 'bitcoin', 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      price: 42368.75, 
      change24h: 2.5, 
      predictedPriceShort: 45800, 
      predictedPriceLong: 52000,
      predictedChangeShort: 8.1,
      predictedChangeLong: 22.7,
      sentiment: 82,
      riskScore: 35,
      confidence: 'High',
      trending: true,
      volume: '$28.5B',
      marketCap: '$825.7B'
    },
    { 
      id: 'ethereum', 
      name: 'Ethereum', 
      symbol: 'ETH', 
      price: 2293.18, 
      change24h: 3.8, 
      predictedPriceShort: 2580, 
      predictedPriceLong: 3100,
      predictedChangeShort: 12.5,
      predictedChangeLong: 35.2,
      sentiment: 78,
      riskScore: 42,
      confidence: 'Medium',
      trending: true,
      volume: '$15.2B',
      marketCap: '$275.4B'
    },
    { 
      id: 'binancecoin', 
      name: 'Binance Coin', 
      symbol: 'BNB', 
      price: 562.94, 
      change24h: 1.2, 
      predictedPriceShort: 590, 
      predictedPriceLong: 650,
      predictedChangeShort: 4.8,
      predictedChangeLong: 15.5,
      sentiment: 71,
      riskScore: 38,
      confidence: 'Medium',
      trending: false,
      volume: '$1.8B',
      marketCap: '$86.9B'
    },
    { 
      id: 'ripple', 
      name: 'XRP', 
      symbol: 'XRP', 
      price: 0.5284, 
      change24h: -2.1, 
      predictedPriceShort: 0.49, 
      predictedPriceLong: 0.62,
      predictedChangeShort: -7.3,
      predictedChangeLong: 17.3,
      sentiment: 62,
      riskScore: 58,
      confidence: 'Low',
      trending: false,
      volume: '$1.4B',
      marketCap: '$28.5B'
    },
    { 
      id: 'cardano', 
      name: 'Cardano', 
      symbol: 'ADA', 
      price: 0.3845, 
      change24h: 5.2, 
      predictedPriceShort: 0.42, 
      predictedPriceLong: 0.58,
      predictedChangeShort: 9.2,
      predictedChangeLong: 50.8,
      sentiment: 76,
      riskScore: 45,
      confidence: 'Medium',
      trending: true,
      volume: '$982M',
      marketCap: '$13.5B'
    }
  ];

  const sentimentData = [
    { source: 'Twitter', positive: 62, neutral: 23, negative: 15 },
    { source: 'Reddit', positive: 58, neutral: 27, negative: 15 },
    { source: 'News Media', positive: 54, neutral: 36, negative: 10 }
  ];

  const toggleWatchlist = (tokenId: string) => {
    if (watchlist.includes(tokenId)) {
      setWatchlist(watchlist.filter(id => id !== tokenId));
      toast({
        title: "Removed from watchlist",
        description: `Token has been removed from your watchlist.`,
      });
    } else {
      setWatchlist([...watchlist, tokenId]);
      toast({
        title: "Added to watchlist",
        description: `Token has been added to your watchlist and will be monitored by AI.`,
      });
    }
  };

  const getPredictionBadge = (value: number) => {
    if (value > 15) return <Badge className="bg-green-500/20 text-green-400">Strong Buy</Badge>;
    if (value > 5) return <Badge className="bg-green-500/10 text-green-400">Buy</Badge>;
    if (value > -5 && value < 5) return <Badge className="bg-white/10 text-white">Hold</Badge>;
    if (value > -15) return <Badge className="bg-red-500/10 text-red-400">Sell</Badge>;
    return <Badge className="bg-red-500/20 text-red-400">Strong Sell</Badge>;
  };

  const getRiskBadge = (value: number) => {
    if (value < 35) return <Badge className="bg-green-500/20 text-green-400">Low</Badge>;
    if (value < 65) return <Badge className="bg-orange-500/20 text-orange-400">Medium</Badge>;
    return <Badge className="bg-red-500/20 text-red-400">High</Badge>;
  };

  const handleSearch = () => {
    toast({
      title: "Search Results",
      description: "No additional tokens found matching your search criteria.",
    });
  };

  const handleOpenTokenTab = (tabId: string) => {
    // In a real application, you might navigate to a details page or open a modal
    console.log(`Opening tab ${tabId}`);
    
    // Find the tab element by its id and trigger a click programmatically
    const tabElement = document.querySelector('#tokens-tab');
    if (tabElement) {
      (tabElement as HTMLElement).click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-20">
        <div className="mt-6 mb-6">
          <BackButton />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Token Value Predictor</h1>
          <p className="text-white/70">
            AI-powered price predictions and sentiment analysis for cryptocurrencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-feature-gradient border-white/5 col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">Current AI Predictions</h2>
                <p className="text-white/70 text-sm">Our advanced AI models forecast token prices based on technical and on-chain data</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className={selectedTimeframe === '24h' ? 'bg-white/10' : ''} onClick={() => setSelectedTimeframe('24h')}>24h</Button>
                <Button variant="outline" size="sm" className={selectedTimeframe === '7d' ? 'bg-white/10' : ''} onClick={() => setSelectedTimeframe('7d')}>7d</Button>
                <Button variant="outline" size="sm" className={selectedTimeframe === '30d' ? 'bg-white/10' : ''} onClick={() => setSelectedTimeframe('30d')}>30d</Button>
                <Button variant="outline" size="sm" className={selectedTimeframe === '90d' ? 'bg-white/10' : ''} onClick={() => setSelectedTimeframe('90d')}>90d</Button>
              </div>
            </div>

            <div className="space-y-4">
              {tokens.slice(0, 3).map((token) => (
                <Card key={token.id} className="p-4 bg-white/5 border-white/5">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-defi-gradient/30 flex items-center justify-center mr-3">
                        <LineChart className="h-5 w-5 text-defi-teal" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{token.name}</h3>
                        <div className="flex items-center">
                          <span className="text-sm text-white/70 mr-2">${token.symbol}</span>
                          {token.trending && (
                            <Badge className="bg-defi-teal/20 text-defi-teal">Trending</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <span className="text-sm text-white/70 block">Current Price</span>
                      <span className="text-white font-semibold">${token.price.toLocaleString()}</span>
                      <span className={`text-xs ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change24h >= 0 ? '+' : ''}{token.change24h}% (24h)
                      </span>
                    </div>
                    
                    <div className="md:col-span-2">
                      <span className="text-sm text-white/70 block">
                        {selectedTimeframe === '24h' ? '24h Prediction' : 
                         selectedTimeframe === '7d' ? '7d Prediction' : 
                         selectedTimeframe === '30d' ? '30d Prediction' : '90d Prediction'}
                      </span>
                      <span className="text-white font-semibold">
                        ${selectedTimeframe === '24h' || selectedTimeframe === '7d' ? 
                          token.predictedPriceShort.toLocaleString() : 
                          token.predictedPriceLong.toLocaleString()}
                      </span>
                      <span className={`text-xs ${
                        (selectedTimeframe === '24h' || selectedTimeframe === '7d' ? 
                          token.predictedChangeShort : 
                          token.predictedChangeLong) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {(selectedTimeframe === '24h' || selectedTimeframe === '7d' ? 
                          token.predictedChangeShort : 
                          token.predictedChangeLong) >= 0 ? '+' : ''}
                        {selectedTimeframe === '24h' || selectedTimeframe === '7d' ? 
                          token.predictedChangeShort : 
                          token.predictedChangeLong}%
                      </span>
                    </div>
                    
                    <div className="md:col-span-2">
                      <span className="text-sm text-white/70 block">AI Suggestion</span>
                      {getPredictionBadge(selectedTimeframe === '24h' || selectedTimeframe === '7d' ? 
                          token.predictedChangeShort : 
                          token.predictedChangeLong)}
                    </div>
                    
                    <div className="md:col-span-2">
                      <span className="text-sm text-white/70 block">Risk Score</span>
                      <div className="flex items-center">
                        {getRiskBadge(token.riskScore)}
                        <div className="ml-2 w-10 h-1 bg-gray-300 rounded-full overflow-hidden">
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
                    
                    <div className="md:col-span-1 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 text-white/70 hover:text-white hover:bg-white/10"
                        onClick={() => toggleWatchlist(token.id)}
                      >
                        <Eye className={`h-4 w-4 ${watchlist.includes(token.id) ? 'text-defi-teal' : 'text-white/70'}`} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => handleOpenTokenTab('tokens-tab')}
              >
                <Plus className="h-4 w-4 mr-2" />
                View More Tokens
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-feature-gradient border-white/5">
            <h2 className="text-xl font-semibold text-white mb-4">Market Sentiment</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Twitter className="h-4 w-4 text-defi-blue" />
                  <h3 className="text-white font-medium">Twitter Sentiment</h3>
                </div>
                
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-1">
                  <div className="h-full flex">
                    <div className="h-full bg-green-500" style={{ width: `${sentimentData[0].positive}%` }}></div>
                    <div className="h-full bg-gray-400" style={{ width: `${sentimentData[0].neutral}%` }}></div>
                    <div className="h-full bg-red-500" style={{ width: `${sentimentData[0].negative}%` }}></div>
                  </div>
                </div>
                
                <div className="flex text-xs text-white/50">
                  <span className="flex-1">Positive: {sentimentData[0].positive}%</span>
                  <span className="flex-1 text-center">Neutral: {sentimentData[0].neutral}%</span>
                  <span className="flex-1 text-right">Negative: {sentimentData[0].negative}%</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-defi-purple" />
                  <h3 className="text-white font-medium">Reddit Sentiment</h3>
                </div>
                
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-1">
                  <div className="h-full flex">
                    <div className="h-full bg-green-500" style={{ width: `${sentimentData[1].positive}%` }}></div>
                    <div className="h-full bg-gray-400" style={{ width: `${sentimentData[1].neutral}%` }}></div>
                    <div className="h-full bg-red-500" style={{ width: `${sentimentData[1].negative}%` }}></div>
                  </div>
                </div>
                
                <div className="flex text-xs text-white/50">
                  <span className="flex-1">Positive: {sentimentData[1].positive}%</span>
                  <span className="flex-1 text-center">Neutral: {sentimentData[1].neutral}%</span>
                  <span className="flex-1 text-right">Negative: {sentimentData[1].negative}%</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="h-4 w-4 text-defi-teal" />
                  <h3 className="text-white font-medium">News Media Sentiment</h3>
                </div>
                
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-1">
                  <div className="h-full flex">
                    <div className="h-full bg-green-500" style={{ width: `${sentimentData[2].positive}%` }}></div>
                    <div className="h-full bg-gray-400" style={{ width: `${sentimentData[2].neutral}%` }}></div>
                    <div className="h-full bg-red-500" style={{ width: `${sentimentData[2].negative}%` }}></div>
                  </div>
                </div>
                
                <div className="flex text-xs text-white/50">
                  <span className="flex-1">Positive: {sentimentData[2].positive}%</span>
                  <span className="flex-1 text-center">Neutral: {sentimentData[2].neutral}%</span>
                  <span className="flex-1 text-right">Negative: {sentimentData[2].negative}%</span>
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t border-white/10">
                <h3 className="text-white font-medium mb-3">Trending Topics</h3>
                
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/10 hover:bg-white/20">#Bitcoin</Badge>
                  <Badge className="bg-white/10 hover:bg-white/20">#ETH2.0</Badge>
                  <Badge className="bg-white/10 hover:bg-white/20">#DeFi</Badge>
                  <Badge className="bg-white/10 hover:bg-white/20">#NFTs</Badge>
                  <Badge className="bg-white/10 hover:bg-white/20">#AltSeason</Badge>
                  <Badge className="bg-white/10 hover:bg-white/20">#Regulations</Badge>
                </div>
              </div>
              
              <Alert className="bg-defi-blue/10 border border-defi-blue/30 mt-4">
                <TrendingUp className="h-4 w-4 text-defi-teal" />
                <AlertDescription className="text-white ml-2">
                  Positive sentiment about Ethereum is increasing due to recent protocol updates.
                </AlertDescription>
              </Alert>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="watchlist" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="watchlist">
              <Eye className="h-4 w-4 mr-2" />
              My Watchlist
            </TabsTrigger>
            <TabsTrigger id="tokens-tab" value="tokens">
              <BarChart3 className="h-4 w-4 mr-2" />
              All Tokens
            </TabsTrigger>
            <TabsTrigger value="predictions">
              <TrendingUp className="h-4 w-4 mr-2" />
              Prediction History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="watchlist" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Your Watchlist</h2>
              <div className="flex items-center">
                <Label htmlFor="notification" className="mr-2 text-white/70">Notifications</Label>
                <Switch id="notification" />
              </div>
            </div>

            {watchlist.length > 0 ? (
              <div className="space-y-4">
                {tokens
                  .filter(token => watchlist.includes(token.id))
                  .map((token) => (
                    <Card key={token.id} className="p-6 bg-feature-gradient border-white/5">
                      <div className="flex flex-col space-y-6">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-defi-gradient/30 flex items-center justify-center mr-4">
                              <LineChart className="h-6 w-6 text-defi-teal" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-white">{token.name}</h3>
                              <div className="flex items-center">
                                <span className="text-sm text-white/70 mr-2">${token.symbol}</span>
                                <span className={`text-xs ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {token.change24h >= 0 ? '+' : ''}{token.change24h}% (24h)
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 text-white/70 hover:text-white hover:bg-white/10"
                            onClick={() => toggleWatchlist(token.id)}
                          >
                            <Eye className="h-4 w-4 mr-1 text-defi-teal" />
                            Remove
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white/5 rounded-md p-3">
                            <span className="text-sm text-white/70 block">Current Price</span>
                            <span className="text-white text-xl font-semibold">${token.price.toLocaleString()}</span>
                            <span className={`text-xs ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {token.change24h >= 0 ? '+' : ''}{token.change24h}% (24h)
                            </span>
                          </div>
                          
                          <div className="bg-white/5 rounded-md p-3">
                            <span className="text-sm text-white/70 block">7d Prediction</span>
                            <span className="text-white text-xl font-semibold">${token.predictedPriceShort.toLocaleString()}</span>
                            <span className={`text-xs ${token.predictedChangeShort >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {token.predictedChangeShort >= 0 ? '+' : ''}{token.predictedChangeShort}%
                            </span>
                          </div>
                          
                          <div className="bg-white/5 rounded-md p-3">
                            <span className="text-sm text-white/70 block">90d Prediction</span>
                            <span className="text-white text-xl font-semibold">${token.predictedPriceLong.toLocaleString()}</span>
                            <span className={`text-xs ${token.predictedChangeLong >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {token.predictedChangeLong >= 0 ? '+' : ''}{token.predictedChangeLong}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white/5 rounded-md p-3">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-white/70">Risk Score</span>
                              <span>{getRiskBadge(token.riskScore)}</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
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
                          
                          <div className="bg-white/5 rounded-md p-3">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-white/70">Sentiment</span>
                              <span className="text-xs text-white/70">{token.sentiment}/100</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-defi-teal rounded-full"
                                style={{ width: `${token.sentiment}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="bg-white/5 rounded-md p-3">
                            <span className="text-sm text-white/70 block">Prediction Confidence</span>
                            <Badge className={`
                              ${token.confidence === 'High' ? 'bg-green-500/20 text-green-400' : 
                                token.confidence === 'Medium' ? 'bg-orange-500/20 text-orange-400' : 
                                'bg-red-500/20 text-red-400'}
                            `}>
                              {token.confidence}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <div>
                            <span className="text-white/70 mr-4">Volume: <span className="text-white">{token.volume}</span></span>
                            <span className="text-white/70">Market Cap: <span className="text-white">{token.marketCap}</span></span>
                          </div>
                          
                          <Button className="bg-button-gradient">
                            <ArrowUpRight className="h-4 w-4 mr-2" />
                            Detailed Analysis
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-16 w-16 mx-auto text-white/30 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Your watchlist is empty</h3>
                <p className="text-white/70 mb-6 max-w-md mx-auto">
                  Add tokens to your watchlist to track their performance and get AI-powered prediction updates.
                </p>
                <Button 
                  className="bg-button-gradient"
                  onClick={() => {
                    // Find the tab element by its id and trigger a click programmatically
                    const tabElement = document.querySelector('#tokens-tab');
                    if (tabElement) {
                      (tabElement as HTMLElement).click();
                    }
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Tokens
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tokens" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">All Tokens</h2>
              <div className="flex items-center">
                <Input placeholder="Search tokens..." className="w-48 mr-2" />
                <Button variant="outline" size="sm" onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-1" />
                  Search
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {tokens.map((token) => (
                <Card key={token.id} className="p-4 bg-feature-gradient border-white/5">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-defi-gradient/30 flex items-center justify-center mr-3">
                        <LineChart className="h-5 w-5 text-defi-teal" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{token.name}</h3>
                        <div className="flex items-center">
                          <span className="text-sm text-white/70 mr-2">${token.symbol}</span>
                          {token.trending && (
                            <Badge className="bg-defi-teal/20 text-defi-teal">Trending</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <span className="text-sm text-white/70 block">Current Price</span>
                      <span className="text-white font-semibold">${token.price.toLocaleString()}</span>
                      <span className={`text-xs ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change24h >= 0 ? '+' : ''}{token.change24h}% (24h)
                      </span>
                    </div>
                    
                    <div className="md:col-span-2">
                      <span className="text-sm text-white/70 block">7d Prediction</span>
                      <span className="text-white font-semibold">${token.predictedPriceShort.toLocaleString()}</span>
                      <span className={`text-xs ${token.predictedChangeShort >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.predictedChangeShort >= 0 ? '+' : ''}{token.predictedChangeShort}%
                      </span>
                    </div>
                    
                    <div className="md:col-span-2">
                      <span className="text-sm text-white/70 block">AI Suggestion</span>
                      {getPredictionBadge(token.predictedChangeShort)}
                    </div>
                    
                    <div className="md:col-span-2">
                      <span className="text-sm text-white/70 block">Risk Score</span>
                      <div className="flex items-center">
                        {getRiskBadge(token.riskScore)}
                        <div className="ml-2 w-10 h-1 bg-gray-300 rounded-full overflow-hidden">
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
                    
                    <div className="md:col-span-1 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 text-white/70 hover:text-white hover:bg-white/10"
                        onClick={() => toggleWatchlist(token.id)}
                      >
                        <Eye className={`h-4 w-4 ${watchlist.includes(token.id) ? 'text-defi-teal' : 'text-white/70'}`} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Prediction History</h2>
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="mr-2">
                  <Timer className="h-4 w-4 mr-1" />
                  Last 30 Days
                </Button>
              </div>
            </div>

            <Card className="p-6 bg-feature-gradient border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Prediction Accuracy</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-md p-3">
                  <span className="text-sm text-white/70 block">7-Day Predictions</span>
                  <span className="text-white text-xl font-semibold">87%</span>
                  <span className="text-xs text-white/70">accurate within ±5%</span>
                </div>
                
                <div className="bg-white/5 rounded-md p-3">
                  <span className="text-sm text-white/70 block">30-Day Predictions</span>
                  <span className="text-white text-xl font-semibold">73%</span>
                  <span className="text-xs text-white/70">accurate within ±10%</span>
                </div>
                
                <div className="bg-white/5 rounded-md p-3">
                  <span className="text-sm text-white/70 block">90-Day Predictions</span>
                  <span className="text-white text-xl font-semibold">64%</span>
                  <span className="text-xs text-white/70">accurate within ±15%</span>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <Card className="p-4 bg-feature-gradient border-white/5">
                <div className="flex items-start">
                  <div className="mr-4 mt-0.5">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className="font-semibold text-white">Bitcoin 7-Day Prediction</h3>
                      <Badge className="ml-2 bg-green-500/20 text-green-400">Accurate</Badge>
                      <span className="text-white/50 text-xs ml-auto">2 weeks ago</span>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-2">
                      Predicted price: $41,200 • Actual price: $42,368 • Difference: +2.8%
                    </p>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/50">AI confidence: <span className="text-white">High</span></span>
                      
                      <Button variant="outline" size="sm" className="h-8">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-feature-gradient border-white/5">
                <div className="flex items-start">
                  <div className="mr-4 mt-0.5">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className="font-semibold text-white">Ethereum 7-Day Prediction</h3>
                      <Badge className="ml-2 bg-green-500/20 text-green-400">Accurate</Badge>
                      <span className="text-white/50 text-xs ml-auto">3 weeks ago</span>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-2">
                      Predicted price: $2,350 • Actual price: $2,293 • Difference: -2.4%
                    </p>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/50">AI confidence: <span className="text-white">Medium</span></span>
                      
                      <Button variant="outline" size="sm" className="h-8">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-feature-gradient border-white/5">
                <div className="flex items-start">
                  <div className="mr-4 mt-0.5">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-orange-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className="font-semibold text-white">Cardano 30-Day Prediction</h3>
                      <Badge className="ml-2 bg-orange-500/20 text-orange-400">Partially Accurate</Badge>
                      <span className="text-white/50 text-xs ml-auto">1 month ago</span>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-2">
                      Predicted price: $0.45 • Actual price: $0.38 • Difference: -15.6%
                    </p>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/50">AI confidence: <span className="text-white">Medium</span></span>
                      
                      <Button variant="outline" size="sm" className="h-8">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default TokenPredictor;
