
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, AlertTriangle, Wallet, Clock, Percentage, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

type InvestmentOpportunityDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: {
    name: string;
    platform: string;
    estimatedApy: string;
    description: string;
    minInvestment: number;
    maxInvestment: number;
    duration: string;
    riskLevel: 'low' | 'medium' | 'high';
  };
};

const InvestmentOpportunityDialog = ({ 
  open, 
  onOpenChange, 
  opportunity 
}: InvestmentOpportunityDialogProps) => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [isInvesting, setIsInvesting] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmentAmount(e.target.value);
  };

  const handleConfirm = () => {
    if (!investmentAmount || isNaN(Number(investmentAmount))) {
      toast.error('Please enter a valid investment amount');
      return;
    }

    const amount = Number(investmentAmount);
    if (amount < opportunity.minInvestment) {
      toast.error(`Minimum investment is $${opportunity.minInvestment}`);
      return;
    }

    if (amount > opportunity.maxInvestment) {
      toast.error(`Maximum investment is $${opportunity.maxInvestment}`);
      return;
    }

    setIsInvesting(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsInvesting(false);
      onOpenChange(false);
      toast.success(`Successfully invested $${amount} in ${opportunity.name}`);
    }, 2000);
  };

  const estimatedReward = Number(investmentAmount) * (parseFloat(opportunity.estimatedApy) / 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl">{opportunity.name}</DialogTitle>
          <DialogDescription>
            New investment opportunity on {opportunity.platform}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-defi-teal" />
              <span className="text-white/80">Estimated APY:</span>
              <span className="ml-auto text-defi-teal font-medium">{opportunity.estimatedApy}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-white/70" />
              <span className="text-white/80">Duration:</span>
              <span className="ml-auto text-white">{opportunity.duration}</span>
            </div>
            
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-white/70" />
              <span className="text-white/80">Risk Level:</span>
              <span className={`ml-auto font-medium ${
                opportunity.riskLevel === 'high' ? 'text-red-400' : 
                opportunity.riskLevel === 'medium' ? 'text-yellow-400' : 
                'text-green-400'
              }`}>
                {opportunity.riskLevel.charAt(0).toUpperCase() + opportunity.riskLevel.slice(1)}
              </span>
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-md">
            <p className="text-sm text-white/70">{opportunity.description}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="investment-amount">Investment Amount</Label>
            <Input
              id="investment-amount"
              placeholder="Enter amount in USD"
              type="number"
              value={investmentAmount}
              onChange={handleAmountChange}
              min={opportunity.minInvestment}
              max={opportunity.maxInvestment}
            />
            <div className="flex justify-between text-xs text-white/60">
              <span>Min: ${opportunity.minInvestment}</span>
              <span>Max: ${opportunity.maxInvestment}</span>
            </div>
          </div>

          <div className="flex justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={() => setInvestmentAmount(opportunity.minInvestment.toString())}
            >
              Min
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={() => setInvestmentAmount(((opportunity.minInvestment + opportunity.maxInvestment) / 2).toString())}
            >
              50%
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={() => setInvestmentAmount(opportunity.maxInvestment.toString())}
            >
              Max
            </Button>
          </div>

          {Number(investmentAmount) > 0 && (
            <div className="bg-defi-teal/10 border border-defi-teal/20 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-defi-teal" />
                Estimated Returns
              </h4>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Annual Profit (Est.):</span>
                <span className="text-defi-teal">${estimatedReward.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Monthly Profit (Est.):</span>
                <span className="text-defi-teal">${(estimatedReward / 12).toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            className="bg-defi-gradient hover:opacity-90" 
            onClick={handleConfirm}
            disabled={isInvesting || !investmentAmount || Number(investmentAmount) <= 0}
          >
            <Wallet className="mr-2 h-4 w-4" />
            {isInvesting ? 'Investing...' : 'Confirm & Invest'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentOpportunityDialog;
