import React from 'react';
import { TabHeader } from '../ui/TabHeader';
import { MultiContextShopping } from '../MultiContextShopping';

export const UnifiedShoppingTab: React.FC = () => {
    return (
        <div className="h-full flex flex-col gap-8">
            <TabHeader
                image="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
                title="Unified Shopping"
                description="Handle personal, corporate, and emergency shopping in a single, intelligent interface, with consolidated checkout and behavioral insights."
            />
            <div className="flex-grow">
                 <MultiContextShopping />
            </div>
        </div>
    );
};