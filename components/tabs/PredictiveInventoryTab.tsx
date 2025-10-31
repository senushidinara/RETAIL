import React from 'react';
import { TabHeader } from '../ui/TabHeader';
import { TrendForecaster } from '../interactive/TrendForecaster';

export const PredictiveInventoryTab: React.FC = () => {
    return (
        <div className="h-full flex flex-col gap-8">
            <TabHeader
                image="https://cdn.builder.io/api/v1/image/assets%2Fb3ca505f4755410ca1f128143966e5c6%2F1b515900aa084b6981b7eb4f1d7ddbf7?format=webp"
                title="Predictive Inventory"
                description="Anticipate viral trends, prepare for crises, and optimize seasonal inventory to prevent stockouts and dramatically reduce waste."
            />
            <div className="flex-grow">
                <TrendForecaster />
            </div>
        </div>
    );
};
