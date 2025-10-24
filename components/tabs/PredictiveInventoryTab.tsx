import React from 'react';
import { TabHeader } from '../ui/TabHeader';
import { TrendForecaster } from '../interactive/TrendForecaster';

export const PredictiveInventoryTab: React.FC = () => {
    return (
        <div className="h-full flex flex-col gap-8">
            <TabHeader
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                title="Predictive Inventory"
                description="Stay ahead of the curve by forecasting viral product trends, ensuring you're stocked for the next big thing before it happens."
            />
            <div className="flex-grow">
                <TrendForecaster />
            </div>
        </div>
    );
};