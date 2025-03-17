
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlaceholderContent from '@/components/shared/PlaceholderContent';

const MarketMaker = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <PlaceholderContent 
          title="AI Market Making"
          description="Our automated bid/ask price setting system that maximizes profit from order book trading is coming soon."
        />
      </main>
      <Footer />
    </div>
  );
};

export default MarketMaker;
