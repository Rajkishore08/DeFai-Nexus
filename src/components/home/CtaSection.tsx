
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-defi-blue/20 to-defi-purple/20 rounded-2xl p-8 md:p-16 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-defi-blue to-defi-purple"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-defi-blue/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-defi-purple/10 rounded-full filter blur-3xl"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient relative z-10">
            Ready to Transform Your DeFi Experience?
          </h2>
          
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto relative z-10">
            Join thousands of traders and investors who are already leveraging the power of AI to maximize their DeFi returns.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
            <Link to="/dashboard">
              <Button 
                className="bg-button-gradient hover:opacity-90 transition-opacity text-white font-medium"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Button 
                className="bg-white/10 hover:bg-white/20 text-white"
              >
                Read Documentation
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
