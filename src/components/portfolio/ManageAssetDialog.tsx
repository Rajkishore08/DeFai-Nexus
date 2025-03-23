
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown, BadgeDollarSign, BarChart3, TrendingUp, Wallet } from 'lucide-react';
import { toast } from 'sonner';

type AssetType = 'staking' | 'liquidity-pool' | 'lending' | 'yield-farming';

type ManageAssetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: {
    name: string;
    platform: string;
    strategy: AssetType;
    value: number;
    apy: number;
  };
};

const ManageAssetDialog = ({ 
  open, 
  onOpenChange,
  asset
}: ManageAssetDialogProps) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const getActionTabs = () => {
    switch (asset.strategy) {
      case 'staking':
        return (
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stake">Stake More</TabsTrigger>
            <TabsTrigger value="unstake">Unstake</TabsTrigger>
          </TabsList>
        );
      case 'liquidity-pool':
        return (
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="add">Add Liquidity</TabsTrigger>
            <TabsTrigger value="remove">Remove Liquidity</TabsTrigger>
          </TabsList>
        );
      case 'lending':
        return (
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="supply">Supply More</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
        );
      case 'yield-farming':
        return (
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deposit">Deposit More</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
        );
      default:
        return (
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
        );
    }
  };

  const getActionName = () => {
    switch (activeTab) {
      case 'stake': return 'Stake';
      case 'unstake': return 'Unstake';
      case 'add': return 'Add Liquidity';
      case 'remove': return 'Remove Liquidity';
      case 'supply': return 'Supply';
      case 'withdraw': return 'Withdraw';
      case 'deposit': return 'Deposit';
      default: return '';
    }
  };

  const isDepositAction = () => {
    return ['stake', 'add', 'supply', 'deposit'].includes(activeTab);
  };

  const handleConfirm = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsProcessing(false);
      onOpenChange(false);
      
      const actionName = getActionName();
      
      if (isDepositAction()) {
        toast.success(`Successfully ${actionName.toLowerCase()}ed ${amount} in ${asset.name}`);
      } else {
        toast.success(`Successfully ${actionName.toLowerCase()}n ${amount} from ${asset.name}`);
      }
    }, 2000);
  };

  // Estimated returns calculation
  const estimatedReturns = Number(amount) * (asset.apy / 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl">Manage {asset.name}</DialogTitle>
          <DialogDescription>
            {asset.platform} - {asset.strategy.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          {getActionTabs()}
          
          <TabsContent value="overview" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 p-4 rounded-md">
                <h4 className="text-sm font-medium mb-1 flex items-center">
                  <Wallet className="h-4 w-4 mr-2 text-defi-blue" />
                  Current Value
                </h4>
                <p className="text-2xl font-bold">${asset.value.toLocaleString()}</p>
              </div>
              
              <div className="bg-black/20 p-4 rounded-md">
                <h4 className="text-sm font-medium mb-1 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-defi-teal" />
                  Current APY
                </h4>
                <p className="text-2xl font-bold text-defi-teal">{asset.apy}%</p>
              </div>
            </div>
            
            <div className="bg-black/20 p-4 rounded-md">
              <h4 className="text-sm font-medium mb-3 flex items-center">
                <BarChart3 className="h-4 w-4 mr-2 text-white" />
                Performance
              </h4>
              <div className="h-32 flex items-center justify-center">
                <p className="text-white/60">Performance chart would be displayed here</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Available Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                {asset.strategy === 'staking' && (
                  <>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setActiveTab('stake')}
                    >
                      <ArrowUp className="mr-2 h-4 w-4 text-defi-teal" />
                      Stake More
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setActiveTab('unstake')}
                    >
                      <ArrowDown className="mr-2 h-4 w-4 text-defi-purple" />
                      Unstake
                    </Button>
                  </>
                )}
                
                {asset.strategy === 'liquidity-pool' && (
                  <>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setActiveTab('add')}
                    >
                      <ArrowUp className="mr-2 h-4 w-4 text-defi-teal" />
                      Add Liquidity
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setActiveTab('remove')}
                    >
                      <ArrowDown className="mr-2 h-4 w-4 text-defi-purple" />
                      Remove Liquidity
                    </Button>
                  </>
                )}
                
                {asset.strategy === 'lending' && (
                  <>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setActiveTab('supply')}
                    >
                      <ArrowUp className="mr-2 h-4 w-4 text-defi-teal" />
                      Supply More
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setActiveTab('withdraw')}
                    >
                      <ArrowDown className="mr-2 h-4 w-4 text-defi-purple" />
                      Withdraw
                    </Button>
                  </>
                )}
                
                {asset.strategy === 'yield-farming' && (
                  <>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setActiveTab('deposit')}
                    >
                      <ArrowUp className="mr-2 h-4 w-4 text-defi-teal" />
                      Deposit More
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setActiveTab('withdraw')}
                    >
                      <ArrowDown className="mr-2 h-4 w-4 text-defi-purple" />
                      Withdraw
                    </Button>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
          
          {['stake', 'unstake', 'add', 'remove', 'supply', 'withdraw', 'deposit'].map((action) => (
            <TabsContent key={action} value={action} className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">{getActionName()} Amount</Label>
                  <div className="flex">
                    <Input
                      id="amount"
                      placeholder={`Enter amount to ${getActionName().toLowerCase()}`}
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                      className="flex-grow"
                    />
                    <Button 
                      variant="outline" 
                      className="ml-2" 
                      onClick={() => {
                        if (['unstake', 'remove', 'withdraw'].includes(action)) {
                          setAmount(asset.value.toString());
                        } else {
                          setAmount('1000'); // Example value
                        }
                      }}
                    >
                      {['unstake', 'remove', 'withdraw'].includes(action) ? 'Max' : 'Suggest'}
                    </Button>
                  </div>
                </div>

                {amount && Number(amount) > 0 && (
                  <div className="bg-black/20 p-4 rounded-md space-y-2">
                    <h4 className="text-sm font-medium">Transaction Details</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Amount:</span>
                      <span className="text-white">${Number(amount).toLocaleString()}</span>
                    </div>
                    
                    {isDepositAction() && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">APY:</span>
                          <span className="text-defi-teal">{asset.apy}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Estimated Annual Returns:</span>
                          <span className="text-defi-teal">${estimatedReturns.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                    
                    {['unstake', 'remove', 'withdraw'].includes(activeTab) && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Remaining Value:</span>
                        <span className="text-white">${Math.max(0, asset.value - Number(amount)).toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="text-xs text-white/60 mt-2">
                      Gas fees will be calculated at the time of transaction.
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setActiveTab('overview')}>Back</Button>
                <Button 
                  className="bg-defi-gradient hover:opacity-90" 
                  onClick={handleConfirm}
                  disabled={isProcessing || !amount || Number(amount) <= 0}
                >
                  <BadgeDollarSign className="mr-2 h-4 w-4" />
                  {isProcessing ? 'Processing...' : `Confirm & ${getActionName()}`}
                </Button>
              </DialogFooter>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ManageAssetDialog;
