import React, { ReactNode } from 'react';

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl flex flex-col items-start text-left hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
            <div className="p-3 mb-4 bg-slate-700/50 rounded-lg text-cyan-400">
                {icon}
            </div>
            <h3 className="text-2xl font-semibold text-slate-100 mb-2">{title}</h3>
            <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
        </button>
    );
};