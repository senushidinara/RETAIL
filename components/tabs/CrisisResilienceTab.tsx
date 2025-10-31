import React from 'react';
import { TabHeader } from '../ui/TabHeader';
import { SupplyChainSimulator } from '../interactive/SupplyChainSimulator';
import { EmergencySourcing } from '../interactive/EmergencySourcing';

export const CrisisResilienceTab: React.FC = () => {
    return (
        <div className="h-full flex flex-col gap-8">
            <TabHeader
                image="https://images.unsplash.com/photo-1642253644272-211516a45a82?q=80&w=2070&auto=format&fit=crop"
                title="Crisis Resilience"
                description="Instantly find alternative suppliers, reroute logistics during disruptions, and manage emergency stock allocation to ensure business continuity."
            />
            <div className="flex-grow space-y-8">
                <SupplyChainSimulator />
                <EmergencySourcing />
            </div>
        </div>
    );
};