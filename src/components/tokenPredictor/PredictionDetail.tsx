
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { Check, AlertCircle, Download, Bell, ChevronLeft, LineChart as LineChartIcon, BarChart3, TrendingUp, FileText, ArrowUp, ArrowDown } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PredictionDetailProps {
  open: boolean;
  onClose: () => void;
  prediction: {
    token: string;
    tokenSymbol: string;
    timeframe: string;
    predictedPrice: number;
    actualPrice: number;
    difference: number;
    confidence: string;
    date: string;
    accuracy: number;
  };
}

const PredictionDetail = ({ open, onClose, prediction }: PredictionDetailProps) => {
  // Sample data for the charts
  const sampleData = [
    { date: '2023-05-01', predicted: 40200, actual: 39800 },
    { date: '2023-05-02', predicted: 40500, actual: 40100 },
    { date: '2023-05-03', predicted: 40800, actual: 41000 },
    { date: '2023-05-04', predicted: 41000, actual: 41200 },
    { date: '2023-05-05', predicted: 41200, actual: 41500 },
    { date: '2023-05-06', predicted: 41200, actual: 42000 },
    { date: '2023-05-07', predicted: 41200, actual: 42368 },
  ];

  // Factors influencing the prediction
  const factors = [
    { name: 'Market Trends', impact: 'High', direction: 'Positive', description: 'Bullish momentum detected across major cryptocurrencies' },
    { name: 'Social Sentiment', impact: 'Medium', direction: 'Positive', description: 'Increased positive mentions on Twitter and Reddit' },
    { name: 'On-Chain Metrics', impact: 'High', direction: 'Positive', description: 'Decreased exchange inflows suggesting reduced selling pressure' },
    { name: 'Technical Indicators', impact: 'Medium', direction: 'Positive', description: 'RSI showing momentum, MACD crossing signal line' },
  ];

  // Confidence level styling
  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case 'high':
        return 'bg-green-500/20 text-green-400';
      case 'medium':
        return 'bg-orange-500/20 text-orange-400';
      case 'low':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-white/10 text-white';
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-gray-900 border border-white/10 text-white">
        <DialogHeader>
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={onClose} className="mr-2 h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-2xl font-bold">
              {prediction.token} {prediction.timeframe} Prediction Analysis
            </DialogTitle>
          </div>
          <DialogDescription className="text-white/70">
            Detailed breakdown of prediction accuracy and performance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-[80vh] overflow-y-auto p-1">
          {/* Prediction Summary */}
          <Card className="p-6 bg-feature-gradient border-white/5">
            <h2 className="text-xl font-semibold text-white mb-4">Prediction Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-md p-4">
                <span className="text-sm text-white/70 block">Predicted Price</span>
                <span className="text-white text-xl font-semibold">${prediction.predictedPrice.toLocaleString()}</span>
                <span className="text-xs text-white/70">{prediction.date}</span>
              </div>
              
              <div className="bg-white/5 rounded-md p-4">
                <span className="text-sm text-white/70 block">Actual Price</span>
                <span className="text-white text-xl font-semibold">${prediction.actualPrice.toLocaleString()}</span>
                <span className={`text-xs ${prediction.difference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {prediction.difference >= 0 ? '+' : ''}{prediction.difference}% difference
                </span>
              </div>
              
              <div className="bg-white/5 rounded-md p-4">
                <span className="text-sm text-white/70 block">AI Confidence</span>
                <div className="flex items-center gap-2">
                  <Badge className={getConfidenceColor(prediction.confidence)}>
                    {prediction.confidence}
                  </Badge>
                  <span className="text-white text-sm">{prediction.accuracy}% Accuracy</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Price Trend Visualization */}
          <Card className="p-6 bg-feature-gradient border-white/5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Price Trend Comparison</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <LineChartIcon className="h-4 w-4 mr-1" />
                  Line
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Candles
                </Button>
              </div>
            </div>
            
            <div className="h-80 w-full bg-white/5 rounded-md p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', border: '1px solid #555' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    name="Predicted Price" 
                    stroke="#3ABAB4" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="Actual Price" 
                    stroke="#805AD5" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    fill="#3ABAB430"
                    stroke="transparent"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Factors Influencing Prediction */}
          <Card className="p-6 bg-feature-gradient border-white/5">
            <h2 className="text-xl font-semibold text-white mb-4">Factors Influencing Prediction</h2>
            
            <div className="space-y-4">
              {factors.map((factor, index) => (
                <div key={index} className="bg-white/5 rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">{factor.name}</h3>
                      <p className="text-white/70 text-sm mt-1">{factor.description}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge className={`mb-1 ${factor.impact === 'High' ? 'bg-defi-teal/20 text-defi-teal' : 'bg-white/10 text-white'}`}>
                        {factor.impact} Impact
                      </Badge>
                      <span className={`flex items-center text-sm ${factor.direction === 'Positive' ? 'text-green-400' : 'text-red-400'}`}>
                        {factor.direction === 'Positive' ? 
                          <ArrowUp className="h-3 w-3 mr-1" /> : 
                          <ArrowDown className="h-3 w-3 mr-1" />
                        }
                        {factor.direction}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Forecast Adjustment Insights */}
          <Card className="p-6 bg-feature-gradient border-white/5">
            <h2 className="text-xl font-semibold text-white mb-4">Forecast Adjustments</h2>
            
            <div className="bg-white/5 rounded-md p-4">
              <div className="flex justify-between mb-2">
                <span className="text-white font-medium">Initial Prediction (May 1)</span>
                <span className="text-white font-medium">$40,200</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-white font-medium">Final Prediction (May 6)</span>
                <span className="text-white font-medium">$41,200</span>
              </div>
              
              <Separator className="my-4 bg-white/10" />
              
              <h3 className="text-white font-medium mb-2">Adjustment Triggers:</h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                  <span>May 3: Increased buying volume on major exchanges</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                  <span>May 4: Positive institutional adoption news</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                  <span>May 5: Increased social media sentiment (Twitter, Reddit)</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Future Prediction Reliability */}
          <Card className="p-6 bg-feature-gradient border-white/5">
            <h2 className="text-xl font-semibold text-white mb-4">Future Prediction Reliability</h2>
            
            <div className="bg-white/5 rounded-md p-4">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                  <Check className="h-8 w-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">High Reliability Expected</h3>
                  <p className="text-white/70">Based on recent accuracy trends, our AI predictions for {prediction.token} are consistently reliable.</p>
                </div>
              </div>
              
              <Separator className="my-4 bg-white/10" />
              
              <h3 className="text-white font-medium mb-2">Recommended Strategy:</h3>
              <p className="text-white/70 mb-4">
                Given the high prediction accuracy, traders can consider these suggestions for risk management:
              </p>
              
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start">
                  <TrendingUp className="h-4 w-4 text-defi-teal mr-2 mt-0.5" />
                  <span>Consider setting stop-loss at -5% below current price</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-4 w-4 text-defi-teal mr-2 mt-0.5" />
                  <span>Take profit targets at +5%, +10%, and +15%</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-4 w-4 text-defi-teal mr-2 mt-0.5" />
                  <span>Watch for potential reversal at $45,000 resistance level</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex gap-2">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Compare Past Predictions
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Set Price Alert
              </Button>
              <Button className="bg-button-gradient">
                <Check className="h-4 w-4 mr-2" />
                Apply Recommendations
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PredictionDetail;
