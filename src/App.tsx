
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Vaults from "./pages/Vaults";
import MarketMaker from "./pages/MarketMaker";
import Arbitrage from "./pages/Arbitrage";
import CopyTrading from "./pages/CopyTrading";
import TokenPredictor from "./pages/TokenPredictor";
import MemeIndex from "./pages/MemeIndex";
import MevProtection from "./pages/MevProtection";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vaults" element={<Vaults />} />
            <Route path="/market-maker" element={<MarketMaker />} />
            <Route path="/arbitrage" element={<Arbitrage />} />
            <Route path="/copy-trading" element={<CopyTrading />} />
            <Route path="/token-predictor" element={<TokenPredictor />} />
            <Route path="/meme-index" element={<MemeIndex />} />
            <Route path="/mev-protection" element={<MevProtection />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
