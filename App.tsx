import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/Header';
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
    <div className="bg-slate-900 text-slate-200 min-h-screen flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <Header />
        <div className="mt-8 h-[calc(100%-80px)]">
            {renderActiveTab()}
        </div>
      </main>
    </div>
  );
}

export default App;
