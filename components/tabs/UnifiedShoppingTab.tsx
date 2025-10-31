import React from 'react';
import { TabHeader } from '../ui/TabHeader';
import { MultiContextShopping } from '../MultiContextShopping';
import { DashboardStats } from '../DashboardStats';
import { QuickActions } from '../QuickActions';

export const UnifiedShoppingTab: React.FC = () => {
    return (
        <div className="h-full flex flex-col gap-8">
            <TabHeader
                image="https://cdn.builder.io/api/v1/image/assets%2Fb3ca505f4755410ca1f128143966e5c6%2F3a4f0abbdedb477c84a350b222816976?format=webp"
                title="Unified Shopping"
                description="Handle personal, corporate, and emergency shopping in a single, intelligent interface, with consolidated checkout and behavioral insights."
            />
            <DashboardStats />
            <QuickActions />
            <div className="flex-grow">
                 <MultiContextShopping />
            </div>
        </div>
    );
};
