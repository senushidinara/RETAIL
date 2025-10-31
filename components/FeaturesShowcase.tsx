import React from 'react';
import { ZapIcon } from './icons/ZapIcon';
import { BoxIcon } from './icons/BoxIcon';
import { HandshakeIcon } from './icons/HandshakeIcon';
import { RobotIcon } from './icons/RobotIcon';
import { WandSparklesIcon } from './icons/WandSparklesIcon';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';

interface FeatureItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    badge?: string;
    badgeColor?: 'cyan' | 'rose' | 'amber' | 'emerald';
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description, badge, badgeColor = 'cyan' }) => {
    const badgeStyles = {
        cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        rose: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        amber: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    };

    return (
        <div className="flex gap-4 p-4 bg-gradient-to-br from-slate-800/30 to-slate-900/20 rounded-xl border border-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300 group">
            <div className="flex-shrink-0 p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg text-cyan-300 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-white">{title}</h4>
                    {badge && (
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${badgeStyles[badgeColor]}`}>
                            {badge}
                        </span>
                    )}
                </div>
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{description}</p>
            </div>
        </div>
    );
};

export const FeaturesShowcase: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/15 rounded-2xl p-8 shadow-lg shadow-cyan-500/5">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Platform Capabilities</h3>
                <p className="text-slate-400 text-sm">Powered by advanced AI and autonomous agents</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureItem
                    icon={<ShoppingCartIcon className="w-5 h-5" />}
                    title="Smart Shopping"
                    description="Multi-context shopping with behavioral insights and consolidated checkout"
                    badge="NEW"
                    badgeColor="cyan"
                />
                <FeatureItem
                    icon={<ZapIcon className="w-5 h-5" />}
                    title="Trend Forecasting"
                    description="Predict viral trends and optimize inventory with 94% accuracy"
                    badge="PRO"
                    badgeColor="amber"
                />
                <FeatureItem
                    icon={<RobotIcon className="w-5 h-5" />}
                    title="Mood Analysis"
                    description="Detect emotions from text and suggest relevant products instantly"
                    badge="AI"
                    badgeColor="cyan"
                />
                <FeatureItem
                    icon={<HandshakeIcon className="w-5 h-5" />}
                    title="AI Negotiation"
                    description="Autonomous agents negotiate with 50,000+ suppliers simultaneously"
                    badge="AGENT"
                    badgeColor="rose"
                />
                <FeatureItem
                    icon={<BoxIcon className="w-5 h-5" />}
                    title="Crisis Response"
                    description="Instant alternative sourcing and dynamic logistics rerouting"
                    badge="CRITICAL"
                    badgeColor="rose"
                />
                <FeatureItem
                    icon={<WandSparklesIcon className="w-5 h-5" />}
                    title="Image Generation"
                    description="Create marketing assets with AI-powered image editing"
                    badge="CREATIVE"
                    badgeColor="emerald"
                />
            </div>
        </div>
    );
};
