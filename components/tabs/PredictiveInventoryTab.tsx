import React from 'react';
import { TabHeader } from '../ui/TabHeader';
import { TrendForecaster } from '../interactive/TrendForecaster';

export const PredictiveInventoryTab: React.FC = () => {
    return (
        <div className="h-full flex flex-col gap-8">
            <TabHeader
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                title="Predictive Inventory"
                description="Anticipate viral trends, prepare for crises, and optimize seasonal inventory to prevent stockouts and dramatically reduce waste."
            />
            <div className="flex-grow">
                <TrendForecaster />
            </div>
        </div>
    );
};