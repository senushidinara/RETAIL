import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/Header';
import { SystemBanner } from './components/SystemBanner';
import { UnifiedShoppingTab } from './components/tabs/UnifiedShoppingTab';
import { EmotionalCommerceTab } from './components/tabs/EmotionalCommerceTab';
import { PredictiveInventoryTab } from './components/tabs/PredictiveInventoryTab';
import { CrisisResilienceTab } from './components/tabs/CrisisResilienceTab';
import { ImageStudioTab } from './components/tabs/ImageStudioTab';
import { AutonomousSupplyChainTab } from './components/tabs/AutonomousSupplyChainTab';

function App() {
  const [activeTab, setActiveTab] = useState('unified-shopping');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'unified-shopping':
        return <UnifiedShoppingTab />;
      case 'emotional-commerce':
        return <EmotionalCommerceTab />;
      case 'predictive-inventory':
        return <PredictiveInventoryTab />;
      case 'crisis-resilience':
        return <CrisisResilienceTab />;
      case 'image-studio':
        return <ImageStudioTab />;
      case 'autonomous-supply-chain':
        return <AutonomousSupplyChainTab />;
      default:
        return <UnifiedShoppingTab />;
    }
  };

  return (
    <div className="relative min-h-screen flex overflow-hidden">
      {/* Luxury gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 -z-20"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-purple-950/20 -z-20"></div>
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl -z-10"></div>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-y-auto h-screen text-slate-100">
        <Header />
        <SystemBanner initialVisible={true} />
        <div className="mt-6 h-[calc(100%-140px)]">
            {renderActiveTab()}
        </div>
      </main>
    </div>
  );
}

export default App;
