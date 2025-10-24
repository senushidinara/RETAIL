import React, { useState } from 'react';
import { TabHeader } from '../ui/TabHeader';
import { FeatureCard } from '../ui/FeatureCard';
import { BoxIcon } from '../icons/BoxIcon';
import { HandshakeIcon } from '../icons/HandshakeIcon';
import { ZapIcon } from '../icons/ZapIcon';
import { AutomatedProcurementModal } from '../modals/AutomatedProcurementModal';
import { AIPoweredNegotiationModal } from '../modals/AIPoweredNegotiationModal';
import { DynamicLogisticsModal } from '../modals/DynamicLogisticsModal';

type ModalType = 'procurement' | 'negotiation' | 'logistics' | null;

export const AutonomousSupplyChainTab: React.FC = () => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    return (
        <>
            <div className="h-full flex flex-col gap-8">
                <TabHeader
                    image="https://images.unsplash.com/photo-1577985051167-5d55752efc13?q=80&w=1936&auto=format&fit=crop"
                    title="Autonomous Supply Chain"
                    description="Automate complex supply chain operations, from procurement to logistics, with intelligent AI agents."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<BoxIcon className="w-8 h-8" />}
                        title="Automated Procurement"
                        description="AI agents automatically source and order inventory based on predictive analytics and stock levels."
                        onClick={() => setActiveModal('procurement')}
                    />
                    <FeatureCard
                        icon={<HandshakeIcon className="w-8 h-8" />}
                        title="AI-Powered Negotiation"
                        description="Deploy negotiation bots to secure optimal pricing and terms with suppliers in real-time."
                        onClick={() => setActiveModal('negotiation')}
                    />
                    <FeatureCard
                        icon={<ZapIcon className="w-8 h-8" />}
                        title="Dynamic Logistics"
                        description="Optimize shipping routes and carrier selection dynamically in response to demand and disruptions."
                        onClick={() => setActiveModal('logistics')}
                    />
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 mt-4">
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">How it Works</h3>
                    <p className="text-slate-400 text-lg text-center max-w-3xl mx-auto">
                        This system leverages autonomous AI agents that can be delegated complex, multi-step tasks. Each agent analyzes real-time data, makes decisions, and executes actions across your supply chain ecosystem, reducing manual overhead and increasing efficiency. Click a feature above to see a conceptual overview.
                    </p>
                </div>
            </div>
            
            <AutomatedProcurementModal isOpen={activeModal === 'procurement'} onClose={() => setActiveModal(null)} />
            <AIPoweredNegotiationModal isOpen={activeModal === 'negotiation'} onClose={() => setActiveModal(null)} />
            <DynamicLogisticsModal isOpen={activeModal === 'logistics'} onClose={() => setActiveModal(null)} />
        </>
    );
};