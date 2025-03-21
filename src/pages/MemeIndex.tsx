import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, MessageSquare, Bell, Eye, Wallet, ExternalLink, ArrowUpRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MemeIndex = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [watchlist, setWatchlist] = useState<string[]>([]);

  const trendingMemeCoins = [
    { 
      id: 'pepe', 
      name: 'Pepe', 
      ticker: 'PEPE', 
      price: 0.00000112, 
      change24h: 12.5, 
      volume: '45.2M',
      mentions: 12500,
      socialScore: 92,
      viralityScore: 89,
      exchangeCount: 8
    },
    { 
      id: 'dogwifhat', 
      name: 'Dog Wif Hat', 
      ticker: 'WIF', 
      price: 0.275, 
      change24h: 8.2, 
      volume: '32.1M',
      mentions: 9800,
      socialScore: 87,
      viralityScore: 79,
      exchangeCount: 6 
    },
    { 
      id: 'turbo', 
      name: 'Turbo', 
      ticker: 'TURBO', 
      price: 0.00023, 
      change24h: 32.7, 
      volume: '28.5M',
      mentions: 8500,
      socialScore: 91,
      viralityScore: 95,
      exchangeCount: 4
    },
    { 
      id: 'mog', 
      name: 'Mog Coin', 
      ticker: 'MOG', 
      price: 0.00000567, 
      change24h: -5.8, 
      volume: '12.7M',
      mentions: 7200,
      socialScore: 72,
      viralityScore: 65,
      exchangeCount: 5
    },
    { 
      id: 'floki', 
      name: 'Floki Inu', 
      ticker: 'FLOKI', 
      price: 0.0000185, 
      change24h: 3.2, 
      volume: '24.3M',
      mentions: 6900,
      socialScore: 81,
      viralityScore: 72,
      exchangeCount: 7
    }
  ];

  const socialSentimentData = [
    { platform: 'Twitter', positive: 65, neutral: 25, negative: 10 },
    { platform: 'Reddit', positive: 58, neutral: 32, negative: 10 },
    { platform: 'Discord', positive: 72, neutral: 20, negative: 8 },
    { platform: 'Telegram', positive: 68, neutral: 22, negative: 10 }
  ];

  const toggleWatchlist = (coinId: string) => {
    if (watchlist.includes(coinId)) {
      setWatchlist(watchlist.filter(id => id !== coinId));
      toast({
        title: "Removed from watchlist",
        description: `Coin has been removed from your watchlist.`,
      });
    } else {
      setWatchlist([...watchlist, coinId]);
      toast({
        title: "Added to watchlist",
        description: `Coin has been added to your watchlist.`,
      });
    }
  };

  const handleBuyToken = (coin: string, ticker: string) => {
    toast({
      title: "Redirecting to DEX",
      description: `Preparing to swap for ${ticker}...`,
    });
    // In a real application, this would redirect to a DEX or open a swap interface
  };

  const handleSetAlert = (coin: string, ticker: string) => {
    toast({
      title: "Alert Set",
      description: `You will be notified when ${ticker} reaches significant movement.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="mt-6 mb-4">
          <BackButton />
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Meme Index Tracker</h1>
          <p className="text-white/70 max-w-3xl">
            Track trending meme coins and social sentiment with our AI-powered analysis.
          </p>
        </div>

        <Tabs defaultValue="trending" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="trending">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending Coins
            </TabsTrigger>
            <TabsTrigger value="social">
              <MessageSquare className="h-4 w-4 mr-2" />
              Social Sentiment
            </TabsTrigger>
            <TabsTrigger value="watchlist">
              <Eye className="h-4 w-4 mr-2" />
              My Watchlist
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Top Trending Meme Coins</h2>
              <div className="flex items-center">
                <Input placeholder="Search coins..." className="w-48 mr-2" />
                <Button variant="outline" size="sm">Search</Button>
              </div>
            </div>

            <div className="grid gap-4">
              {trendingMemeCoins.map((coin) => (
                <Card key={coin.id} className="p-4 bg-feature-gradient border-white/5">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-defi-gradient/30 flex items-center justify-center mr-3">
                        <Sparkles className="h-5 w-5 text-defi-teal" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{coin.name}</h3>
                        <div className="flex items-center">
                          <span className="text-sm text-white/70">${coin.ticker}</span>
                          {coin.viralityScore > 85 && (
                            <Badge className="ml-2 bg-defi-teal/20 text-defi-teal">Trending</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm text-white/70">Price</span>
                      <span className="font-semibold text-white">${coin.price.toFixed(8)}</span>
                      <span className={`text-xs ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {coin.change24h >= 0 ? '+' : ''}{coin.change24h}% (24h)
                      </span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm text-white/70">Social Activity</span>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-defi-teal rounded-full" 
                            style={{ width: `${coin.socialScore}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-white/70">{coin.socialScore}/100</span>
                      </div>
                      <span className="text-xs text-white/70">{coin.mentions.toLocaleString()} mentions</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-white/10 hover:bg-white/5"
                        onClick={() => toggleWatchlist(coin.id)}
                      >
                        <Eye className={`h-4 w-4 mr-1 ${watchlist.includes(coin.id) ? 'text-defi-teal' : 'text-white/70'}`} />
                        {watchlist.includes(coin.id) ? 'Watching' : 'Watch'}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-white/10 hover:bg-white/5"
                        onClick={() => handleSetAlert(coin.name, coin.ticker)}
                      >
                        <Bell className="h-4 w-4 mr-1" />
                        Alert
                      </Button>
                      
                      <Button 
                        className="bg-button-gradient"
                        size="sm"
                        onClick={() => handleBuyToken(coin.name, coin.ticker)}
                      >
                        <Wallet className="h-4 w-4 mr-1" />
                        Buy
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Social Media Sentiment Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-feature-gradient border-white/5">
                <h3 className="text-lg font-semibold mb-4 text-white">Platform Sentiment</h3>
                
                {socialSentimentData.map((platform) => (
                  <div key={platform.platform} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-white">{platform.platform}</span>
                      <span className="text-white/70 text-sm">
                        {platform.positive}% Positive
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full flex">
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: `${platform.positive}%` }}
                        ></div>
                        <div 
                          className="h-full bg-gray-400" 
                          style={{ width: `${platform.neutral}%` }}
                        ></div>
                        <div 
                          className="h-full bg-red-500" 
                          style={{ width: `${platform.negative}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex text-xs mt-1 text-white/50">
                      <span className="flex-1">Positive</span>
                      <span className="flex-1 text-center">Neutral</span>
                      <span className="flex-1 text-right">Negative</span>
                    </div>
                  </div>
                ))}
              </Card>

              <Card className="p-6 bg-feature-gradient border-white/5">
                <h3 className="text-lg font-semibold mb-4 text-white">Set Notification Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="virality-notify">Virality Score Alerts</Label>
                      <p className="text-sm text-white/50">Get notified when coins reach high virality</p>
                    </div>
                    <Switch id="virality-notify" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="price-notify">Price Movement Alerts</Label>
                      <p className="text-sm text-white/50">Get notified on significant price changes</p>
                    </div>
                    <Switch id="price-notify" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-coins">New Trending Coins</Label>
                      <p className="text-sm text-white/50">Be the first to know about new viral coins</p>
                    </div>
                    <Switch id="new-coins" />
                  </div>

                  <Button className="w-full mt-4 bg-button-gradient">
                    Save Preferences
                  </Button>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-feature-gradient border-white/5 mt-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Current Market Trends</h3>
              
              <div className="space-y-4">
                <Alert className="bg-defi-blue/10 border border-defi-blue/30">
                  <TrendingUp className="h-4 w-4 text-defi-teal" />
                  <AlertDescription className="text-white ml-2">
                    AI detected increased activity around dog-themed meme coins in the last 24 hours.
                  </AlertDescription>
                </Alert>
                
                <Alert className="bg-defi-purple/10 border border-defi-purple/30">
                  <MessageSquare className="h-4 w-4 text-defi-purple" />
                  <AlertDescription className="text-white ml-2">
                    Twitter engagement with crypto influencers has increased by 32% this week.
                  </AlertDescription>
                </Alert>
                
                <div className="flex mt-4">
                  <Button variant="outline" className="flex-1 mr-2">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Report
                  </Button>
                  <Button className="flex-1 bg-button-gradient">
                    <Bell className="h-4 w-4 mr-2" />
                    Set Custom Alerts
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="watchlist">
            {watchlist.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Your Watchlist</h2>
                
                {trendingMemeCoins
                  .filter(coin => watchlist.includes(coin.id))
                  .map((coin) => (
                    <Card key={coin.id} className="p-4 bg-feature-gradient border-white/5">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-defi-gradient/30 flex items-center justify-center mr-3">
                            <Sparkles className="h-5 w-5 text-defi-teal" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{coin.name}</h3>
                            <span className="text-sm text-white/70">${coin.ticker}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-sm text-white/70">Price</span>
                          <span className="font-semibold text-white">${coin.price.toFixed(8)}</span>
                          <span className={`text-xs ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {coin.change24h >= 0 ? '+' : ''}{coin.change24h}% (24h)
                          </span>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-sm text-white/70">Virality Score</span>
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-defi-teal rounded-full" 
                                style={{ width: `${coin.viralityScore}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-white/70">{coin.viralityScore}/100</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-white/10 hover:bg-white/5"
                            onClick={() => toggleWatchlist(coin.id)}
                          >
                            <Eye className="h-4 w-4 mr-1 text-defi-teal" />
                            Remove
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-white/10 hover:bg-white/5"
                            onClick={() => handleSetAlert(coin.name, coin.ticker)}
                          >
                            <Bell className="h-4 w-4 mr-1" />
                            Alert
                          </Button>
                          
                          <Button 
                            className="bg-button-gradient"
                            size="sm"
                            onClick={() => handleBuyToken(coin.name, coin.ticker)}
                          >
                            <Wallet className="h-4 w-4 mr-1" />
                            Buy
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Eye className="h-16 w-16 mx-auto text-white/30 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Your watchlist is empty</h3>
                <p className="text-white/70 mb-6 max-w-md mx-auto">
                  Add meme coins to your watchlist to track their performance and get notified about significant changes.
                </p>
                <Button 
                  onClick={() => setActiveTab('trending')}
                  className="bg-button-gradient"
                >
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Browse Trending Coins
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default MemeIndex;
