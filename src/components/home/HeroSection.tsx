
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton';

const HeroSection = () => {
  return (
    <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 bg-hero-pattern"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-defi-blue/20 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-defi-purple/20 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            AI-Powered DeFi Management & Trading
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            DeFAI Nexus combines artificial intelligence with decentralized finance to automate portfolio management, 
            market making, and arbitrage trading - maximizing your DeFi returns.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <ConnectWalletButton />
            <Button 
              className="bg-white/10 hover:bg-white/20 text-white"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Features <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
