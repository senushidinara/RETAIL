import React from 'react';
import { ZapIcon } from './icons/ZapIcon';
import { BoxIcon } from './icons/BoxIcon';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { RobotIcon } from './icons/RobotIcon';

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    change?: string;
    isPositive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, change, isPositive }) => {
    return (
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/15 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/15 group">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl text-cyan-300 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    {icon}
                </div>
                {change && (
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${isPositive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                        {isPositive ? '↑' : '↓'} {change}
                    </span>
                )}
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
            <p className="text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">{value}</p>
        </div>
    );
};

export const DashboardStats: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
                icon={<ShoppingCartIcon className="w-6 h-6" />}
                label="Total Orders"
                value="2,847"
                change="12%"
                isPositive={true}
            />
            <StatCard 
                icon={<ZapIcon className="w-6 h-6" />}
                label="Active Campaigns"
                value="14"
                change="3"
                isPositive={true}
            />
            <StatCard 
                icon={<BoxIcon className="w-6 h-6" />}
                label="Inventory Health"
                value="94%"
                change="2%"
                isPositive={true}
            />
            <StatCard 
                icon={<RobotIcon className="w-6 h-6" />}
                label="AI Predictions"
                value="892"
                change="28%"
                isPositive={true}
            />
        </div>
    );
};
