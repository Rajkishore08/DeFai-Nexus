
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VaultsList from '@/components/vaults/VaultsList';
import UserVaults from '@/components/vaults/UserVaults';
import VaultPerformance from '@/components/vaults/VaultPerformance';
import RiskPreferences from '@/components/vaults/RiskPreferences';

const Vaults = () => {
  const [selectedRisk, setSelectedRisk] = useState<'high' | 'balanced' | 'low'>('balanced');
  
  return (
    <DashboardLayout 
      title="AI-Powered DeFi Vaults" 
      description="Our smart yield farming & staking vaults adapt to market conditions in real-time, maximizing your returns with AI-optimized strategies."
    >
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
    </DashboardLayout>
  );
};

export default Vaults;
