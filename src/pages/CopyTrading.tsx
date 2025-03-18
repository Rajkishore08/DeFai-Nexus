
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import PlaceholderContent from '@/components/shared/PlaceholderContent';

const CopyTrading = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-20 pb-8">
        <div className="mt-6 mb-4">
          <BackButton />
        </div>
        <PlaceholderContent 
          title="Copy Trading Agent"
          description="Our AI system that analyzes top trader behavior and automatically mirrors their most profitable strategies is coming soon."
        />
      </main>
      <Footer />
    </div>
  );
};

export default CopyTrading;
