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
                image="https://cdn.builder.io/api/v1/image/assets%2Fb3ca505f4755410ca1f128143966e5c6%2Fd8d3d7f09cb246e18ac9160dd7dc6625?format=webp"
                title="Autonomous Supply Chain"
                description="Deploy autonomous agents to negotiate with 50,000+ suppliers, orchestrate global logistics, and manage crises in real-time."
            />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<BoxIcon className="w-8 h-8" />}
                        title="Automated Procurement"
                        description="AI predicts needs and places orders to prevent stockouts, optimizing inventory turnover and reducing unsold stock."
                        onClick={() => setActiveModal('procurement')}
                    />
                    <FeatureCard
                        icon={<HandshakeIcon className="w-8 h-8" />}
                        title="AI-Powered Negotiation"
                        description="Our bots negotiate with thousands of suppliers simultaneously to secure the best price, quality, and delivery terms."
                        onClick={() => setActiveModal('negotiation')}
                    />
                    <FeatureCard
                        icon={<ZapIcon className="w-8 h-8" />}
                        title="Dynamic Logistics"
                        description="Instantly reroutes global shipments around disruptions, coordinating air, sea, and ground transport to maintain high delivery reliability."
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
