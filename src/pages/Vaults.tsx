
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlaceholderContent from '@/components/shared/PlaceholderContent';

const Vaults = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <PlaceholderContent 
          title="AI-Powered DeFi Vaults"
          description="Our smart yield farming & staking vaults that adapt to market conditions in real-time will be available soon."
        />
      </main>
      <Footer />
    </div>
  );
};

export default Vaults;
