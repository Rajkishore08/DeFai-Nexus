
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import PlaceholderContent from '@/components/shared/PlaceholderContent';

const MemeIndex = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-20 pb-8">
        <div className="mt-6 mb-4">
          <BackButton />
        </div>
        <PlaceholderContent 
          title="Meme Index Tracker"
          description="Our tool to help you stay ahead of viral meme coins with AI-powered social media sentiment analysis is coming soon."
        />
      </main>
      <Footer />
    </div>
  );
};

export default MemeIndex;
