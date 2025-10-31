import React from 'react';
import { TabHeader } from '../ui/TabHeader';
import { MoodAnalysisEngine } from '../interactive/MoodAnalysisEngine';

export const EmotionalCommerceTab: React.FC = () => {
    return (
        <div className="h-full flex flex-col gap-8">
            <TabHeader
                image="https://cdn.builder.io/api/v1/image/assets%2Fb3ca505f4755410ca1f128143966e5c6%2Fabc029eca8824d11bd9f581f608988a0?format=webp"
                title="Emotional Commerce"
                description="Detects a user's emotional state from text to provide tailored recommendations, from stress-reducing groceries to inspirational discovery journeys."
            />
            <div className="flex-grow">
                <MoodAnalysisEngine />
            </div>
        </div>
    );
};
