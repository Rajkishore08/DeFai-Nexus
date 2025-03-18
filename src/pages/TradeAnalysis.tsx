
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import TradeHistoryUploader from '@/components/trade-analysis/TradeHistoryUploader';
import TradeReport from '@/components/trade-analysis/TradeReport';
import { Card } from '@/components/ui/card';
import { FileText, Users, MessageSquare, AlertCircle } from 'lucide-react';

const TradeAnalysis = () => {
  const [showReport, setShowReport] = useState(true); // Temp set to true to display demo report
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-20 pb-8">
        <div className="mt-6 mb-4">
          <BackButton />
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">AI-Powered Trade Analysis</h1>
          <p className="text-white/70 max-w-3xl">
            Our AI analyzes your trading history to identify patterns, highlight strengths and weaknesses,
            and provide actionable insights to improve your trading performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/20 border border-white/10 p-6">
            <div className="flex items-center mb-2">
              <FileText className="h-5 w-5 mr-2 text-defi-teal" />
              <h3 className="font-medium text-white">Trade Report</h3>
            </div>
            <p className="text-sm text-white/70">
              Detailed analysis of your trading performance with profit/loss breakdown and pattern recognition.
            </p>
          </Card>
          
          <Card className="bg-black/20 border border-white/10 p-6">
            <div className="flex items-center mb-2">
              <MessageSquare className="h-5 w-5 mr-2 text-defi-blue" />
              <h3 className="font-medium text-white">Optimization Tips</h3>
            </div>
            <p className="text-sm text-white/70">
              AI-generated suggestions to improve your trading strategy based on historical performance.
            </p>
          </Card>
          
          <Card className="bg-black/20 border border-white/10 p-6">
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 mr-2 text-defi-purple" />
              <h3 className="font-medium text-white">Trader Comparison</h3>
            </div>
            <p className="text-sm text-white/70">
              See how your performance compares to top traders on similar assets and market conditions.
            </p>
          </Card>
          
          <Card className="bg-black/20 border border-white/10 p-6">
            <div className="flex items-center mb-2">
              <AlertCircle className="h-5 w-5 mr-2 text-defi-pink" />
              <h3 className="font-medium text-white">Real-Time Feedback</h3>
            </div>
            <p className="text-sm text-white/70">
              Get AI-powered feedback on potential trades before executing to avoid common mistakes.
            </p>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <TradeHistoryUploader />
          </div>
          
          <div className="md:col-span-2">
            {showReport ? (
              <TradeReport />
            ) : (
              <Card className="bg-black/20 border border-white/10 p-6 h-full flex flex-col items-center justify-center">
                <FileText className="h-16 w-16 text-white/20 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No Trade Report Yet</h3>
                <p className="text-white/60 text-center max-w-md mb-4">
                  Upload your trading history to get a comprehensive AI analysis of your performance 
                  and personalized recommendations.
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TradeAnalysis;
