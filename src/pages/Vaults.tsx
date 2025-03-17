
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VaultsList from '@/components/vaults/VaultsList';
import UserVaults from '@/components/vaults/UserVaults';
import VaultPerformance from '@/components/vaults/VaultPerformance';
import RiskPreferences from '@/components/vaults/RiskPreferences';

const Vaults = () => {
  const [selectedRisk, setSelectedRisk] = useState<'high' | 'balanced' | 'low'>('balanced');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">AI-Powered DeFi Vaults</h1>
          <p className="text-white/70 max-w-3xl">
            Our smart yield farming & staking vaults adapt to market conditions in real-time, 
            maximizing your returns with AI-optimized strategies.
          </p>
        </div>
        
        <RiskPreferences selectedRisk={selectedRisk} setSelectedRisk={setSelectedRisk} />
        
        <Tabs defaultValue="available" className="mt-8">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
            <TabsTrigger value="available">Available Vaults</TabsTrigger>
            <TabsTrigger value="my-vaults">My Vaults</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available">
            <VaultsList riskLevel={selectedRisk} />
          </TabsContent>
          
          <TabsContent value="my-vaults">
            <UserVaults />
          </TabsContent>
          
          <TabsContent value="performance">
            <VaultPerformance />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Vaults;
