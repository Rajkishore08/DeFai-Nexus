
import { Link } from 'react-router-dom';
import { ArrowUpRight, TrendingUp, BarChart3, Zap, LineChart, CandlestickChart, Sparkles, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    title: 'AI-Powered DeFi Vaults',
    description: 'Smart yield farming & staking vaults that adapt to market conditions in real-time.',
    icon: <BarChart3 className="h-10 w-10 text-defi-teal" />,
    path: '/vaults',
  },
  {
    title: 'AI Market Making',
    description: 'Automated bid/ask price setting that maximizes profit from order book trading.',
    icon: <CandlestickChart className="h-10 w-10 text-defi-purple" />,
    path: '/market-maker',
  },
  {
    title: 'DEX Arbitrage Trader',
    description: 'Scan multiple DEXs in milliseconds to find and execute profitable arbitrage trades.',
    icon: <TrendingUp className="h-10 w-10 text-defi-blue" />,
    path: '/arbitrage',
  },
  {
    title: 'Copy Trading Agent',
    description: 'AI analyzes top trader behavior and automatically mirrors their most profitable strategies.',
    icon: <Zap className="h-10 w-10 text-defi-pink" />,
    path: '/copy-trading',
  },
  {
    title: 'Token Value Predictor',
    description: 'Advanced AI models that forecast token prices based on technical and on-chain data.',
    icon: <LineChart className="h-10 w-10 text-defi-teal" />,
    path: '/token-predictor',
  },
  {
    title: 'Meme Index Tracker',
    description: 'Stay ahead of viral meme coins with AI-powered social media sentiment analysis.',
    icon: <Sparkles className="h-10 w-10 text-defi-purple" />,
    path: '/meme-index',
  },
  {
    title: 'Smart MEV Protection',
    description: 'Shield your transactions from front-running attacks with AI-powered defense mechanisms.',
    icon: <Shield className="h-10 w-10 text-defi-violet" />,
    path: '/mev-protection',
  },
  {
    title: 'Portfolio Dashboard',
    description: 'Comprehensive overview of all your DeFi investments with AI-generated insights.',
    icon: <BarChart3 className="h-10 w-10 text-defi-blue" />,
    path: '/dashboard',
  },
];

const FeaturesSection = () => {
  return (
    <div id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            AI-Powered DeFi Features
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Our suite of AI technologies works together to maximize your DeFi performance while minimizing risks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link to={feature.path} key={index}>
              <Card className="h-full bg-feature-gradient border-white/5 hover:border-white/20 hover:shadow-lg transition-all p-6 overflow-hidden relative group">
                <div className="absolute -right-4 -top-4 bg-white/5 h-20 w-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="mb-5">{feature.icon}</div>
                
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-defi-teal transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-white/70 text-sm mb-4">
                  {feature.description}
                </p>
                
                <div className="flex items-center text-defi-teal text-sm font-medium">
                  Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
