
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowRightLeft, BarChart3, PieChart } from 'lucide-react';
import { toast } from 'sonner';

type AssetAllocation = {
  asset: string;
  currentPercentage: number;
  newPercentage: number;
  currentValue: number;
  newValue: number;
};

type RebalanceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  potentialImprovement: string;
  recommendation: string;
};

const RebalanceDialog = ({ open, onOpenChange, potentialImprovement, recommendation }: RebalanceDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Sample data - in a real app this would be calculated based on the user's portfolio
  const allocationChanges: AssetAllocation[] = [
    {
      asset: 'WBTC',
      currentPercentage: 30,
      newPercentage: 20,
      currentValue: 3750,
      newValue: 2500
    },
    {
      asset: 'APT/USDT',
      currentPercentage: 15,
      newPercentage: 25,
      currentValue: 1875,
      newValue: 3125
    },
    {
      asset: 'APT',
      currentPercentage: 35,
      newPercentage: 35,
      currentValue: 4375,
      newValue: 4375
    },
    {
      asset: 'USDC/APT',
      currentPercentage: 20,
      newPercentage: 20,
      currentValue: 2500,
      newValue: 2500
    }
  ];

  const handleConfirm = () => {
    setIsProcessing(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsProcessing(false);
      onOpenChange(false);
      toast.success('Portfolio successfully rebalanced for improved performance');
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl">Rebalance Your Portfolio</DialogTitle>
          <DialogDescription>
            Review AI-recommended changes to optimize your portfolio
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-black/20 p-4 rounded-md mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Recommendation</h4>
              <span className="text-defi-teal text-sm">{potentialImprovement} potential improvement</span>
            </div>
            <p className="text-white/70 text-sm">
              {recommendation}
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <ArrowRightLeft className="h-4 w-4 mr-2 text-defi-purple" />
              Portfolio Allocation Changes
            </h4>
            
            <div className="space-y-3">
              {allocationChanges.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-20 text-sm">{item.asset}</div>
                  <div className="flex-grow relative h-4 bg-black/30 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-defi-blue/50 rounded-full"
                      style={{ width: `${item.currentPercentage}%` }}
                    ></div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/50" />
                  <div className="flex-grow relative h-4 bg-black/30 rounded-full overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full ${
                        item.newPercentage > item.currentPercentage 
                          ? 'bg-defi-teal/70' 
                          : item.newPercentage < item.currentPercentage 
                            ? 'bg-defi-purple/70' 
                            : 'bg-defi-blue/70'
                      }`}
                      style={{ width: `${item.newPercentage}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-right text-sm">
                    {item.newPercentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <div>
              <h4 className="text-sm font-medium flex items-center mb-1">
                <BarChart3 className="h-4 w-4 mr-1 text-defi-blue" />
                Before
              </h4>
              {allocationChanges.map((item, index) => (
                <div key={`before-${index}`} className="flex justify-between text-sm">
                  <span className="text-white/60 mr-4">{item.asset}:</span>
                  <span className="text-white">${item.currentValue}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-medium flex items-center mb-1">
                <PieChart className="h-4 w-4 mr-1 text-defi-teal" />
                After
              </h4>
              {allocationChanges.map((item, index) => (
                <div key={`after-${index}`} className="flex justify-between text-sm">
                  <span className="text-white/60 mr-4">{item.asset}:</span>
                  <span className="text-white">${item.newValue}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-defi-blue/10 border border-defi-blue/20 p-3 rounded-md text-sm text-white/80">
            <p>This rebalance will execute multiple transactions to adjust your positions. Gas fees will be optimized to minimize costs.</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            className="bg-defi-gradient hover:opacity-90" 
            onClick={handleConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Confirm & Apply'}
            {isProcessing && <ArrowRightLeft className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RebalanceDialog;
