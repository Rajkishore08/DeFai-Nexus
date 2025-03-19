
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings as SettingsIcon, Bell, Shield, Zap, ChevronDown } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from 'sonner';
import { useState } from 'react';

const Settings = () => {
  const [aiTrading, setAiTrading] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [riskProtection, setRiskProtection] = useState(true);
  const [performance, setPerformance] = useState(false);
  
  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };
  
  return (
    <DashboardLayout 
      title="Settings"
      description="Customize your DeFi dashboard experience and AI preferences."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-black/20 border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <SettingsIcon className="h-5 w-5 mr-2 text-defi-teal" />
                General Settings
              </CardTitle>
              <CardDescription>Configure your dashboard preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-sm text-white/60">Always use dark mode theme</p>
                </div>
                <Switch checked={true} disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Performance Reporting</Label>
                  <p className="text-sm text-white/60">Receive weekly performance reports</p>
                </div>
                <Switch 
                  checked={performance}
                  onCheckedChange={setPerformance}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Data Refresh Rate</Label>
                  <p className="text-sm text-white/60">How often to update market data</p>
                </div>
                <select 
                  className="bg-black/20 border border-white/10 rounded px-3 py-1 text-sm"
                  defaultValue="30"
                >
                  <option value="10">Every 10 seconds</option>
                  <option value="30">Every 30 seconds</option>
                  <option value="60">Every minute</option>
                  <option value="300">Every 5 minutes</option>
                </select>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-defi-purple" />
                AI Trading Settings
              </CardTitle>
              <CardDescription>Configure how AI manages your portfolio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable AI Trading</Label>
                  <p className="text-sm text-white/60">Allow AI to manage assets automatically</p>
                </div>
                <Switch 
                  checked={aiTrading}
                  onCheckedChange={setAiTrading}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Trading Strategy</Label>
                  <p className="text-sm text-white/60">Choose AI optimization approach</p>
                </div>
                <select 
                  className="bg-black/20 border border-white/10 rounded px-3 py-1 text-sm"
                  defaultValue="balanced"
                  disabled={!aiTrading}
                >
                  <option value="conservative">Conservative</option>
                  <option value="balanced">Balanced</option>
                  <option value="aggressive">Aggressive</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Maximum Position Size</Label>
                  <p className="text-sm text-white/60">Limit size of any single position</p>
                </div>
                <select 
                  className="bg-black/20 border border-white/10 rounded px-3 py-1 text-sm"
                  defaultValue="25"
                  disabled={!aiTrading}
                >
                  <option value="10">10% of portfolio</option>
                  <option value="25">25% of portfolio</option>
                  <option value="50">50% of portfolio</option>
                  <option value="100">No limit</option>
                </select>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-defi-teal" />
                Security & Protection
              </CardTitle>
              <CardDescription>Configure security settings and risk protection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Risk Protection</Label>
                  <p className="text-sm text-white/60">Protect against liquidation risks</p>
                </div>
                <Switch 
                  checked={riskProtection}
                  onCheckedChange={setRiskProtection}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">MEV Protection</Label>
                  <p className="text-sm text-white/60">Shield trades from front-running</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Transaction Signing</Label>
                  <p className="text-sm text-white/60">Require confirmation for all transactions</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-defi-teal" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure when and how you receive alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Notifications</Label>
                  <p className="text-sm text-white/60">Receive alerts and updates</p>
                </div>
                <Switch 
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <Accordion type="single" collapsible className="w-full" disabled={!notifications}>
                <AccordionItem value="notifications" className="border-white/10">
                  <AccordionTrigger className="text-white hover:text-white hover:no-underline">
                    Notification Types
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Portfolio Alerts</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Trade Execution</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Risk Warnings</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">New Opportunities</Label>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Reset to Defaults
            </Button>
            <Button 
              className="bg-defi-gradient hover:opacity-90"
              onClick={handleSaveSettings}
            >
              Save Settings
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-black/20 border border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-white/60">Connected Wallet</Label>
                <p className="font-mono text-sm truncate">0x7a9ef893af82080298fa6daecdf8c8ea1fcf0b3f</p>
              </div>
              <div>
                <Label className="text-sm text-white/60">Wallet Type</Label>
                <p>Perta Wallet</p>
              </div>
              <div>
                <Label className="text-sm text-white/60">Connection Status</Label>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                  <span>Connected</span>
                </div>
              </div>
              <Button 
                variant="destructive" 
                className="w-full mt-2"
              >
                Disconnect Wallet
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 border border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-white/70">
                Get personalized help and insights about your portfolio from our AI assistant.
              </p>
              <Button className="w-full bg-defi-gradient hover:opacity-90">
                Ask AI Assistant
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 border border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">📄</span> User Guide
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">⚡</span> Quick Start
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">🔍</span> API Documentation
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">❓</span> FAQs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
