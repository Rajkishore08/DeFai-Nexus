
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlaceholderContent from '@/components/shared/PlaceholderContent';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
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
