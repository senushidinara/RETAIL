import React from 'react';
import { TabHeader } from '../ui/TabHeader';
import { SupplyChainSimulator } from '../interactive/SupplyChainSimulator';
import { EmergencySourcing } from '../interactive/EmergencySourcing';

export const CrisisResilienceTab: React.FC = () => {
    return (
        <div className="h-full flex flex-col gap-8">
            <TabHeader
                image="https://cdn.builder.io/api/v1/image/assets%2Fb3ca505f4755410ca1f128143966e5c6%2F8a480331a2eb4c2695d32def55794c85?format=webp"
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
