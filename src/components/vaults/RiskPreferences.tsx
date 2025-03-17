
import { Sliders } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from '@/components/ui/card';

type RiskPreferencesProps = {
  selectedRisk: 'high' | 'balanced' | 'low';
  setSelectedRisk: (risk: 'high' | 'balanced' | 'low') => void;
};

const RiskPreferences = ({ selectedRisk, setSelectedRisk }: RiskPreferencesProps) => {
  return (
    <Card className="p-6 bg-black/20 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="h-5 w-5 text-defi-teal" />
        <h3 className="font-medium text-white">Risk Preferences</h3>
      </div>
      
      <p className="text-sm text-white/70 mb-4">
        Adjust your risk tolerance to control how AI allocates your funds. Higher risk strategies 
        may offer better returns but with increased volatility.
      </p>
      
      <RadioGroup 
        value={selectedRisk} 
        onValueChange={(value) => setSelectedRisk(value as 'high' | 'balanced' | 'low')}
        className="flex flex-wrap gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="low-risk" />
          <Label htmlFor="low-risk" className="text-white/80">Low Risk</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="balanced" id="balanced-risk" />
          <Label htmlFor="balanced-risk" className="text-white/80">Balanced</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="high" id="high-risk" />
          <Label htmlFor="high-risk" className="text-white/80">High Risk</Label>
        </div>
      </RadioGroup>
    </Card>
  );
};

export default RiskPreferences;
