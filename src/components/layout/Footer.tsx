import { Link } from 'react-router-dom';
import { Github, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="DeFAI Nexus Logo" className="h-8 w-8" />
              <span className="font-bold text-xl text-white">DeFAI Nexus</span>
            </Link>
            <p className="text-sm text-white/70 mb-4">
              AI-Powered DeFi Management & Trading platform that revolutionizes portfolio management and trading strategies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/vaults" className="text-sm text-white/70 hover:text-white transition-colors">AI-Powered DeFi Vaults</Link></li>
              <li><Link to="/market-maker" className="text-sm text-white/70 hover:text-white transition-colors">AI Market Making</Link></li>
              <li><Link to="/arbitrage" className="text-sm text-white/70 hover:text-white transition-colors">DEX Arbitrage Trader</Link></li>
              <li><Link to="/copy-trading" className="text-sm text-white/70 hover:text-white transition-colors">Copy Trading Agent</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/token-predictor" className="text-sm text-white/70 hover:text-white transition-colors">Token Value Predictor</Link></li>
              <li><Link to="/meme-index" className="text-sm text-white/70 hover:text-white transition-colors">Meme Index Tracker</Link></li>
              <li><Link to="/mev-protection" className="text-sm text-white/70 hover:text-white transition-colors">Smart MEV Protection</Link></li>
              <li><Link to="/dashboard" className="text-sm text-white/70 hover:text-white transition-colors">Portfolio Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-white/50">
          <p>© {new Date().getFullYear()} DeFAI Nexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
