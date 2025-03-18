
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import PortfolioOverview from '@/components/portfolio/PortfolioOverview';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Target, RefreshCw, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const Portfolio = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const handleOptimizePortfolio = () => {
    setIsOptimizing(true);
    // Simulate AI optimization process
    setTimeout(() => {
      setIsOptimizing(false);
      toast.success('Portfolio has been optimized for maximum performance');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-20 pb-8">
        <div className="mt-6 mb-4">
          <BackButton />
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">AI Portfolio Managers</h1>
          <p className="text-white/70 max-w-3xl">
            Our AI continuously analyzes market conditions to optimize your DeFi positions across multiple platforms,
            maximizing returns while managing risk exposure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/20 border border-white/10 p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <PieChart className="h-5 w-5 mr-2 text-defi-teal" />
              <h3 className="font-medium text-white">Portfolio Optimization</h3>
            </div>
            
            <p className="text-sm text-white/70 mb-4 flex-grow">
              AI analyzes market conditions and rebalances your portfolio for optimal returns. 
              Enable auto-optimization or trigger it manually.
            </p>
            
            <Button 
              onClick={handleOptimizePortfolio} 
              disabled={isOptimizing} 
              className="w-full bg-defi-gradient hover:opacity-90"
            >
              {isOptimizing ? 'Optimizing...' : 'Optimize Portfolio'}
              <RefreshCw className={`ml-2 h-4 w-4 ${isOptimizing ? 'animate-spin' : ''}`} />
            </Button>
          </Card>
          
          <Card className="bg-black/20 border border-white/10 p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <Target className="h-5 w-5 mr-2 text-defi-purple" />
              <h3 className="font-medium text-white">Investment Goals</h3>
            </div>
            
            <p className="text-sm text-white/70 mb-4 flex-grow">
              Set your investment strategy preferences to guide AI allocation decisions.
              Choose between growth, income, or balanced approaches.
            </p>
            
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
              Adjust Investment Goals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
          
          <Card className="bg-black/20 border border-white/10 p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <RefreshCw className="h-5 w-5 mr-2 text-defi-blue" />
              <h3 className="font-medium text-white">Auto-Rebalancing</h3>
            </div>
            
            <p className="text-sm text-white/70 mb-4 flex-grow">
              Let AI automatically rebalance your portfolio based on market trends and yield opportunities.
              Set frequency and parameters.
            </p>
            
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
              Configure Auto-Rebalancing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>
        
        <PortfolioOverview />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
