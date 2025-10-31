import React from 'react';
import { TabHeader } from '../ui/TabHeader';
import { MoodAnalysisEngine } from '../interactive/MoodAnalysisEngine';

export const EmotionalCommerceTab: React.FC = () => {
    return (
        <div className="h-full flex flex-col gap-8">
            <TabHeader
                image="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1887&auto=format&fit=crop"
                title="Emotional Commerce"
                description="Detects a user's emotional state from text to provide tailored recommendations, from stress-reducing groceries to inspirational discovery journeys."
            />
            <div className="flex-grow">
                <MoodAnalysisEngine />
            </div>
        </div>
    );
};