
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useWallet } from '@/contexts/WalletContext';
import { Navigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const DashboardLayout = ({ children, title, description }: DashboardLayoutProps) => {
  const { isConnected } = useWallet();

  // Redirect to home if wallet is not connected
  if (!isConnected) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-grow md:ml-64 pt-24 pb-16">
          <div className="container px-4 py-6 max-w-7xl mx-auto">
            <div className="mt-6 mb-2">
              <BackButton />
            </div>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">{title}</h1>
              {description && (
                <p className="text-white/70 max-w-3xl">
                  {description}
                </p>
              )}
            </div>
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
