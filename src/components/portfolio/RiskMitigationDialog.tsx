
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { AlertTriangle, ShieldCheck, Percent, BadgeDollarSign } from 'lucide-react';
import { toast } from 'sonner';

type RiskMitigationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  risk: {
    title: string;
    asset: string;
    description: string;
    severity: 'high' | 'medium';
    currentRatio?: number;
    minimumRatio?: number;
    recommendedAction: 'add-collateral' | 'reduce-exposure';
    recommendedAmount: number;
  };
};

const RiskMitigationDialog = ({ 
  open, 
  onOpenChange, 
  risk 
}: RiskMitigationDialogProps) => {
  const [actionAmount, setActionAmount] = useState(risk.recommendedAmount.toString());
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSliderChange = (value: number[]) => {
    setActionAmount(value[0].toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActionAmount(e.target.value);
  };

  const getNewCollateralRatio = () => {
    if (risk.recommendedAction === 'add-collateral' && risk.currentRatio && risk.minimumRatio) {
      // Simple calculation for demonstration
      const additionalRatio = (Number(actionAmount) / 1000) * 10; // Example formula
      return Math.min(200, risk.currentRatio + additionalRatio); // Cap at 200%
    }
    return risk.currentRatio;
  };

  const newRatio = getNewCollateralRatio();

  const handleConfirm = () => {
    setIsProcessing(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsProcessing(false);
      onOpenChange(false);
      
      const actionType = risk.recommendedAction === 'add-collateral' 
        ? 'added collateral to' 
        : 'reduced exposure in';
      
      toast.success(`Successfully ${actionType} ${risk.asset} to mitigate risk`);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl">Risk Mitigation Action</DialogTitle>
          <DialogDescription>
            Protect your portfolio by addressing identified risks
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className={`p-4 rounded-md ${
            risk.severity === 'high' 
              ? 'bg-red-500/10 border border-red-500/30' 
              : 'bg-amber-500/10 border border-amber-500/30'
          }`}>
            <div className="flex items-start mb-2">
              <AlertTriangle className={`h-5 w-5 mr-2 mt-0.5 ${
                risk.severity === 'high' ? 'text-red-400' : 'text-amber-400'
              }`} />
              <div>
                <h4 className="font-medium text-white">{risk.title}</h4>
                <p className="text-sm text-white/70 mt-1">{risk.description}</p>
              </div>
            </div>
            <div className="ml-7">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Asset:</span>
                <span className="text-white">{risk.asset}</span>
              </div>
              {risk.currentRatio && risk.minimumRatio && (
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Current Ratio:</span>
                  <span className={`${
                    risk.currentRatio < risk.minimumRatio + 10 ? 'text-red-400' : 'text-white'
                  }`}>{risk.currentRatio}%</span>
                </div>
              )}
              {risk.minimumRatio && (
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Minimum Safe Ratio:</span>
                  <span className="text-white">{risk.minimumRatio}%</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-md">
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <ShieldCheck className="h-4 w-4 mr-2 text-defi-blue" />
              Recommended Action
            </h4>
            <p className="text-sm text-white/70 mb-4">
              {risk.recommendedAction === 'add-collateral' 
                ? `Add more collateral to increase your collateral ratio and prevent liquidation.` 
                : `Reduce your exposure by withdrawing some assets from this position.`
              }
            </p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="action-amount">
                    {risk.recommendedAction === 'add-collateral' ? 'Collateral to Add' : 'Amount to Withdraw'}
                  </Label>
                  <div className="flex items-center">
                    <BadgeDollarSign className="h-4 w-4 mr-1 text-white/70" />
                    <Input
                      id="action-amount"
                      type="number"
                      value={actionAmount}
                      onChange={handleInputChange}
                      className="w-24 h-8 text-right"
                    />
                  </div>
                </div>
                <Slider
                  value={[Number(actionAmount)]}
                  min={Math.max(50, risk.recommendedAmount / 2)}
                  max={risk.recommendedAmount * 2}
                  step={10}
                  onValueChange={handleSliderChange}
                />
              </div>
              
              {risk.recommendedAction === 'add-collateral' && risk.currentRatio && risk.minimumRatio && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">New Collateral Ratio:</span>
                    <span className="text-sm font-medium text-defi-teal">{newRatio}%</span>
                  </div>
                  <div className="relative h-2 bg-black/30 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-red-500/50 rounded-full"
                      style={{ width: `${(risk.minimumRatio / 200) * 100}%` }}
                    ></div>
                    <div 
                      className="absolute top-0 left-0 h-full bg-amber-500/50 rounded-full"
                      style={{ width: `${(risk.currentRatio / 200) * 100}%` }}
                    ></div>
                    <div 
                      className="absolute top-0 left-0 h-full bg-defi-teal/70 rounded-full"
                      style={{ width: `${(newRatio / 200) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Minimum ({risk.minimumRatio}%)</span>
                    <span>Safe (150%)</span>
                    <span>Optimal (200%)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            className="bg-defi-gradient hover:opacity-90" 
            onClick={handleConfirm}
            disabled={isProcessing || !actionAmount || Number(actionAmount) <= 0}
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            {isProcessing ? 'Processing...' : 'Confirm & Protect'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RiskMitigationDialog;
