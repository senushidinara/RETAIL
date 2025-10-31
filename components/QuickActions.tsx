import React, { useState } from 'react';
import { ZapIcon } from './icons/ZapIcon';
import { RobotIcon } from './icons/RobotIcon';
import { WandSparklesIcon } from './icons/WandSparklesIcon';
import { UploadCloudIcon } from './icons/UploadCloudIcon';
import { SendIcon } from './icons/SendIcon';

interface QuickActionProps {
    icon: React.ReactNode;
    label: string;
    badge?: string;
    onClick: () => void;
    variant?: 'cyan' | 'rose' | 'amber' | 'emerald';
}

const quickActionVariants = {
    cyan: 'from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border-cyan-500/30 hover:border-cyan-500/50 text-cyan-300 hover:text-cyan-200 hover:shadow-cyan-500/20',
    rose: 'from-rose-500/20 to-orange-500/20 hover:from-rose-500/30 hover:to-orange-500/30 border-rose-500/30 hover:border-rose-500/50 text-rose-300 hover:text-rose-200 hover:shadow-rose-500/20',
    amber: 'from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 border-amber-500/30 hover:border-amber-500/50 text-amber-300 hover:text-amber-200 hover:shadow-amber-500/20',
    emerald: 'from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border-emerald-500/30 hover:border-emerald-500/50 text-emerald-300 hover:text-emerald-200 hover:shadow-emerald-500/20'
};

const QuickActionButton: React.FC<QuickActionProps> = ({ icon, label, badge, onClick, variant = 'cyan' }) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center gap-3 px-6 py-4 rounded-xl border bg-gradient-to-br transition-all duration-300 group relative overflow-hidden ${quickActionVariants[variant]} hover:shadow-lg`}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full" style={{ animation: 'none' }}></div>
            <div className="relative flex items-center justify-center text-2xl">{icon}</div>
            <div className="relative text-center">
                <p className="text-sm font-bold">{label}</p>
                {badge && <span className="text-xs mt-1 opacity-75">{badge}</span>}
            </div>
        </button>
    );
};

export const QuickActions: React.FC = () => {
    const [notifications, setNotifications] = useState(3);

    const handleAction = (action: string) => {
        console.log('Action:', action);
    };

    return (
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/15 rounded-2xl p-8 shadow-lg shadow-cyan-500/5 mb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Quick Actions</h3>
                    <p className="text-slate-400 text-sm">Access powerful AI tools instantly</p>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full">
                    <span className="text-xs font-bold text-cyan-300">PRO</span>
                </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <QuickActionButton 
                    icon={<ZapIcon className="w-6 h-6" />}
                    label="AI Forecast"
                    badge="Predictive"
                    onClick={() => handleAction('forecast')}
                    variant="cyan"
                />
                <QuickActionButton 
                    icon={<RobotIcon className="w-6 h-6" />}
                    label="Auto Negotiate"
                    badge="Agent"
                    onClick={() => handleAction('negotiate')}
                    variant="rose"
                />
                <QuickActionButton 
                    icon={<WandSparklesIcon className="w-6 h-6" />}
                    label="Generate Assets"
                    badge="Creative"
                    onClick={() => handleAction('generate')}
                    variant="amber"
                />
                <QuickActionButton 
                    icon={<UploadCloudIcon className="w-6 h-6" />}
                    label="Import Data"
                    badge="Sync"
                    onClick={() => handleAction('import')}
                    variant="emerald"
                />
                <QuickActionButton 
                    icon={<SendIcon className="w-6 h-6" />}
                    label="Broadcast"
                    badge={notifications > 0 ? `${notifications}` : undefined}
                    onClick={() => handleAction('broadcast')}
                    variant="cyan"
                />
                <QuickActionButton 
                    icon={<RobotIcon className="w-6 h-6" />}
                    label="Run Analytics"
                    badge="Dashboard"
                    onClick={() => handleAction('analytics')}
                    variant="rose"
                />
            </div>
        </div>
    );
};
