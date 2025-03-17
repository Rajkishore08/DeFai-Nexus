
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlaceholderContent from '@/components/shared/PlaceholderContent';

const Arbitrage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <PlaceholderContent 
          title="DEX Arbitrage Trader"
          description="Our system to scan multiple DEXs in milliseconds to find and execute profitable arbitrage trades will be available soon."
        />
      </main>
      <Footer />
    </div>
  );
};

export default Arbitrage;
