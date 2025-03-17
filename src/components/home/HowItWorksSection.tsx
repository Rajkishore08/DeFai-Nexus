
import { ArrowRight, Brain, RefreshCcw, Layers, Cpu } from 'lucide-react';

const steps = [
  {
    icon: <Brain className="h-10 w-10 text-defi-teal" />,
    title: 'AI Analysis',
    description: 'Our AI continuously scans market data, news sentiment, and on-chain metrics to identify opportunities.',
  },
  {
    icon: <RefreshCcw className="h-10 w-10 text-defi-purple" />,
    title: 'Strategy Generation',
    description: 'Based on market analysis, the AI generates optimized strategies for different DeFi activities.',
  },
  {
    icon: <Cpu className="h-10 w-10 text-defi-blue" />,
    title: 'Automated Execution',
    description: 'Strategies are automatically executed across DeFi protocols with speed and precision.',
  },
  {
    icon: <Layers className="h-10 w-10 text-defi-pink" />,
    title: 'Continuous Learning',
    description: 'Our AI models continuously learn from transaction outcomes, improving future strategies.',
  },
];

const HowItWorksSection = () => {
  return (
    <div className="py-16 md:py-24 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            How It Works
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            DeFAI Nexus leverages cutting-edge AI to automate and optimize your DeFi experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-black/20 rounded-lg p-8 border border-white/5 h-full">
                <div className="mb-6 inline-flex items-center justify-center h-16 w-16 rounded-full bg-defi-gradient">
                  {step.icon}
                </div>
                
                <div className="absolute top-24 right-0 hidden lg:block">
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-6 w-6 text-defi-teal" />
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {step.title}
                </h3>
                
                <p className="text-white/70">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
