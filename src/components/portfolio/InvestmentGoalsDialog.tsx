
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, TrendingUp, Wallet, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

type InvestmentGoal = 'growth' | 'income' | 'balanced';

type InvestmentGoalsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentGoal?: InvestmentGoal;
  onSave: (goal: InvestmentGoal) => void;
};

const InvestmentGoalsDialog = ({ 
  open, 
  onOpenChange, 
  currentGoal = 'balanced',
  onSave 
}: InvestmentGoalsDialogProps) => {
  const [selectedGoal, setSelectedGoal] = useState<InvestmentGoal>(currentGoal);

  const handleSave = () => {
    onSave(selectedGoal);
    toast.success(`Investment goal updated to ${selectedGoal.charAt(0).toUpperCase() + selectedGoal.slice(1)}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl">Investment Goals</DialogTitle>
          <DialogDescription>
            Set your investment strategy to guide AI allocation decisions
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <RadioGroup 
            value={selectedGoal} 
            onValueChange={(value) => setSelectedGoal(value as InvestmentGoal)}
            className="space-y-4"
          >
            <div className={`relative flex items-center space-x-3 rounded-lg border p-4 
              ${selectedGoal === 'growth' 
                ? 'border-defi-purple bg-defi-purple/10' 
                : 'border-white/10 hover:border-white/20'}`}
            >
              <RadioGroupItem value="growth" id="growth" className="sr-only" />
              <Label htmlFor="growth" className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-defi-purple mr-3" />
                    <div>
                      <div className="text-base font-medium leading-none">Growth</div>
                      <div className="text-sm text-white/70 mt-1">
                        Higher risk, potentially higher returns
                      </div>
                    </div>
                  </div>
                  {selectedGoal === 'growth' && (
                    <CheckCircle2 className="h-5 w-5 text-defi-purple" />
                  )}
                </div>
              </Label>
            </div>

            <div className={`relative flex items-center space-x-3 rounded-lg border p-4 
              ${selectedGoal === 'income' 
                ? 'border-defi-blue bg-defi-blue/10' 
                : 'border-white/10 hover:border-white/20'}`}
            >
              <RadioGroupItem value="income" id="income" className="sr-only" />
              <Label htmlFor="income" className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Wallet className="h-5 w-5 text-defi-blue mr-3" />
                    <div>
                      <div className="text-base font-medium leading-none">Income</div>
                      <div className="text-sm text-white/70 mt-1">
                        Focus on stable returns from staking, lending, and yield farming
                      </div>
                    </div>
                  </div>
                  {selectedGoal === 'income' && (
                    <CheckCircle2 className="h-5 w-5 text-defi-blue" />
                  )}
                </div>
              </Label>
            </div>

            <div className={`relative flex items-center space-x-3 rounded-lg border p-4 
              ${selectedGoal === 'balanced' 
                ? 'border-defi-teal bg-defi-teal/10' 
                : 'border-white/10 hover:border-white/20'}`}
            >
              <RadioGroupItem value="balanced" id="balanced" className="sr-only" />
              <Label htmlFor="balanced" className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-defi-teal mr-3" />
                    <div>
                      <div className="text-base font-medium leading-none">Balanced</div>
                      <div className="text-sm text-white/70 mt-1">
                        A mix of growth and income for a well-rounded portfolio
                      </div>
                    </div>
                  </div>
                  {selectedGoal === 'balanced' && (
                    <CheckCircle2 className="h-5 w-5 text-defi-teal" />
                  )}
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="bg-black/20 p-4 rounded-md mb-4">
          <h4 className="text-sm font-medium mb-2">How this affects your portfolio</h4>
          <p className="text-white/70 text-sm">
            {selectedGoal === 'growth' && 
              'The AI will prioritize high-growth opportunities like emerging tokens, NFTs, and high-yield farms with higher risk tolerance.'}
            {selectedGoal === 'income' && 
              'The AI will focus on stable yield through staking, lending, and established liquidity pools to generate regular income.'}
            {selectedGoal === 'balanced' && 
              'The AI will create a diversified portfolio with a mix of stable yields and growth opportunities for balanced risk and return.'}
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="bg-defi-gradient hover:opacity-90" onClick={handleSave}>
            Confirm & Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentGoalsDialog;
