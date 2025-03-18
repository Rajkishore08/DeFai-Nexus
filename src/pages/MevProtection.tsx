
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Shield, Zap, Settings, Plus, ArrowUpDown, Check, RefreshCcw, FileLock2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const MevProtection = () => {
  const [mevProtectionEnabled, setMevProtectionEnabled] = useState(false);
  const [flashbotsEnabled, setFlashbotsEnabled] = useState(false);
  const [whitelistedAddresses, setWhitelistedAddresses] = useState([
    '0x7a16ff8270133f063aab6c9977183d9e72835428',
    '0x9ee5e175d09895b8e1e28c22b961345e1df4b5ae'
  ]);
  const [newAddress, setNewAddress] = useState('');

  const handleToggleMevProtection = () => {
    setMevProtectionEnabled(!mevProtectionEnabled);
    toast({
      title: mevProtectionEnabled ? "MEV Protection Disabled" : "MEV Protection Enabled",
      description: mevProtectionEnabled 
        ? "Your transactions are no longer protected against MEV attacks." 
        : "Your transactions are now protected against MEV attacks.",
    });
  };

  const handleToggleFlashbots = () => {
    setFlashbotsEnabled(!flashbotsEnabled);
    toast({
      title: flashbotsEnabled ? "Flashbots Disabled" : "Flashbots Enabled",
      description: flashbotsEnabled 
        ? "Transactions will no longer be routed through private relays." 
        : "Transactions will now be routed through private relays for extra protection.",
    });
  };

  const handleAddWhitelistedAddress = () => {
    if (newAddress && !whitelistedAddresses.includes(newAddress)) {
      setWhitelistedAddresses([...whitelistedAddresses, newAddress]);
      setNewAddress('');
      toast({
        title: "Address Whitelisted",
        description: "The address has been added to your trusted list.",
      });
    } else if (whitelistedAddresses.includes(newAddress)) {
      toast({
        title: "Already Whitelisted",
        description: "This address is already in your trusted list.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveWhitelistedAddress = (address: string) => {
    setWhitelistedAddresses(whitelistedAddresses.filter(a => a !== address));
    toast({
      title: "Address Removed",
      description: "The address has been removed from your trusted list.",
    });
  };

  const mevThreats = [
    {
      id: 1,
      type: 'Sandwich Attack',
      risk: 'High',
      description: 'Large ETH/USDC swap detected on Uniswap V3',
      timeDetected: '2 mins ago',
      potentialLoss: '$152.45'
    },
    {
      id: 2,
      type: 'Front-Running',
      risk: 'Medium',
      description: 'Unusual gas price fluctuation on your pending transaction',
      timeDetected: '5 mins ago',
      potentialLoss: '$64.20'
    },
    {
      id: 3,
      type: 'Price Oracle Manipulation',
      risk: 'Low',
      description: 'Multiple large swaps preceding your transaction',
      timeDetected: '15 mins ago',
      potentialLoss: '$23.10'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-20">
        <div className="mt-6 mb-6">
          <BackButton />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Smart MEV Protection</h1>
          <p className="text-white/70">
            Shield your transactions from front-running attacks with AI-powered defense mechanisms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-feature-gradient border-white/5 col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">MEV Protection Status</h2>
                <p className="text-white/70 text-sm">Enable protection against Maximal Extractable Value attacks</p>
              </div>
              <div className="flex items-center">
                <Label htmlFor="mev-protection" className="mr-2 text-white">
                  {mevProtectionEnabled ? 'Enabled' : 'Disabled'}
                </Label>
                <Switch 
                  id="mev-protection" 
                  checked={mevProtectionEnabled}
                  onCheckedChange={handleToggleMevProtection}
                />
              </div>
            </div>

            {mevProtectionEnabled ? (
              <div className="bg-defi-teal/10 border border-defi-teal/30 rounded-md p-4 flex items-start">
                <Shield className="h-5 w-5 text-defi-teal mr-3 mt-0.5" />
                <div>
                  <h3 className="text-defi-teal font-medium">Protection Active</h3>
                  <p className="text-white/70 text-sm">
                    Our AI is actively monitoring your transactions and implementing protection strategies against MEV attacks.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-md p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-orange-500 font-medium">Protection Inactive</h3>
                  <p className="text-white/70 text-sm">
                    Your transactions are vulnerable to MEV attacks. Enable protection to secure your trades.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Slippage Tolerance</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    type="number" 
                    defaultValue="0.5" 
                    min="0.1" 
                    max="5" 
                    step="0.1" 
                    className="w-24" 
                  />
                  <span className="text-white/70">%</span>
                  <Button variant="outline" size="sm" className="ml-2">Auto</Button>
                </div>
                <p className="text-xs text-white/50">
                  AI recommended: 0.5% based on current market volatility
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Gas Price Strategy</Label>
                <div className="flex items-center space-x-2">
                  <select className="bg-background border border-input text-white rounded-md h-10 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full">
                    <option value="adaptive">Adaptive (AI-controlled)</option>
                    <option value="aggressive">Aggressive</option>
                    <option value="balanced">Balanced</option>
                    <option value="economic">Economic</option>
                  </select>
                </div>
                <p className="text-xs text-white/50">
                  Adaptively adjusts based on network congestion & MEV risks
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-4">
                <Zap className="h-5 w-5 text-defi-teal mr-2" />
                <h3 className="text-white font-medium">Flashbots Integration</h3>
                <div className="ml-auto flex items-center">
                  <Label htmlFor="flashbots" className="mr-2 text-white">
                    {flashbotsEnabled ? 'Enabled' : 'Disabled'}
                  </Label>
                  <Switch 
                    id="flashbots" 
                    checked={flashbotsEnabled}
                    onCheckedChange={handleToggleFlashbots}
                  />
                </div>
              </div>

              <p className="text-white/70 text-sm mb-4">
                Route transactions through private relays to avoid public mempool exposure and front-running.
              </p>

              {flashbotsEnabled && (
                <Alert className="bg-defi-blue/10 border border-defi-blue/30">
                  <AlertTitle className="text-defi-blue">Flashbots Connected</AlertTitle>
                  <AlertDescription className="text-white/70">
                    Your transactions will be sent directly to block builders, bypassing the public mempool.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </Card>

          <Card className="p-6 bg-feature-gradient border-white/5">
            <h2 className="text-xl font-semibold text-white mb-4">Protection Metrics</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-white/70">Transactions Protected</span>
                  <span className="text-white font-medium">124</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-defi-teal rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-white/70">MEV Attacks Prevented</span>
                  <span className="text-white font-medium">37</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-defi-teal rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-white/70">Value Saved</span>
                  <span className="text-white font-medium">$1,245.80</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-defi-teal rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-white/70">Gas Optimization</span>
                  <span className="text-white font-medium">32% saved</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-defi-teal rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>

              <Button className="w-full mt-2 bg-button-gradient">
                <FileLock2 className="h-4 w-4 mr-2" />
                View Complete Report
              </Button>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="threats">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="threats">
              <AlertCircle className="h-4 w-4 mr-2" />
              MEV Threats
            </TabsTrigger>
            <TabsTrigger value="whitelist">
              <Check className="h-4 w-4 mr-2" />
              Whitelisted Addresses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="threats">
            <h2 className="text-xl font-semibold text-white mb-4">Detected MEV Threats</h2>
            
            <div className="space-y-4">
              {mevThreats.map((threat) => (
                <Card key={threat.id} className="p-4 bg-feature-gradient border-white/5">
                  <div className="flex items-start">
                    <div className="mr-4 mt-0.5">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${threat.risk === 'High' ? 'bg-red-500/20' : 
                          threat.risk === 'Medium' ? 'bg-orange-500/20' : 
                          'bg-yellow-500/20'}
                      `}>
                        <AlertCircle className={`
                          h-5 w-5
                          ${threat.risk === 'High' ? 'text-red-500' : 
                            threat.risk === 'Medium' ? 'text-orange-500' : 
                            'text-yellow-500'}
                        `} />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h3 className="font-semibold text-white">{threat.type}</h3>
                        <Badge className={`
                          ml-2
                          ${threat.risk === 'High' ? 'bg-red-500/20 text-red-500' : 
                            threat.risk === 'Medium' ? 'bg-orange-500/20 text-orange-500' : 
                            'bg-yellow-500/20 text-yellow-500'}
                        `}>
                          {threat.risk} Risk
                        </Badge>
                        <span className="text-white/50 text-xs ml-auto">{threat.timeDetected}</span>
                      </div>
                      
                      <p className="text-white/70 text-sm mb-2">{threat.description}</p>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/50">Potential Loss: <span className="text-white">{threat.potentialLoss}</span></span>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="h-8">
                            Details
                          </Button>
                          <Button size="sm" className="h-8 bg-button-gradient">
                            Protect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="flex justify-end mt-4">
                <Button variant="outline" className="mr-2">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button className="bg-button-gradient">
                  Protect All Transactions
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="whitelist">
            <h2 className="text-xl font-semibold text-white mb-4">Trusted Addresses</h2>
            <p className="text-white/70 mb-6">
              Transactions to and from these addresses will bypass MEV protection measures.
            </p>
            
            <Card className="p-6 bg-feature-gradient border-white/5 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Add Trusted Address</h3>
              
              <div className="flex items-center space-x-2 mb-4">
                <Input 
                  placeholder="0x..." 
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddWhitelistedAddress}
                  disabled={!newAddress}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              
              <p className="text-xs text-white/50">
                Only add addresses you trust completely. Transactions with these addresses will not be monitored for MEV attacks.
              </p>
            </Card>
            
            <div className="space-y-3">
              {whitelistedAddresses.length > 0 ? (
                whitelistedAddresses.map((address, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-md">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-defi-teal mr-2" />
                      <span className="text-white font-mono text-sm">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 text-white/70 hover:text-white hover:bg-white/10"
                      >
                        View
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        onClick={() => handleRemoveWhitelistedAddress(address)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-white/50">
                  No trusted addresses added yet.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default MevProtection;
