
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import PlaceholderContent from '@/components/shared/PlaceholderContent';

const MevProtection = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-20 pb-8">
        <div className="mt-6 mb-4">
          <BackButton />
        </div>
        <PlaceholderContent 
          title="Smart MEV Protection"
          description="Our system to shield your transactions from front-running attacks with AI-powered defense mechanisms is coming soon."
        />
      </main>
      <Footer />
    </div>
  );
};

export default MevProtection;
