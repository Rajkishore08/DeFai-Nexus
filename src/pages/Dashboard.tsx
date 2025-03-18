
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import PlaceholderContent from '@/components/shared/PlaceholderContent';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-20 pb-8">
        <div className="mt-6 mb-4">
          <BackButton />
        </div>
        <PlaceholderContent 
          title="AI-Powered Dashboard"
          description="Your comprehensive DeFi portfolio overview with AI-powered insights and recommendations is coming soon."
        />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
