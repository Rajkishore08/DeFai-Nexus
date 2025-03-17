
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlaceholderContent from '@/components/shared/PlaceholderContent';

const TokenPredictor = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <PlaceholderContent 
          title="Token Value Predictor"
          description="Our advanced AI models that forecast token prices based on technical and on-chain data will be available soon."
        />
      </main>
      <Footer />
    </div>
  );
};

export default TokenPredictor;
