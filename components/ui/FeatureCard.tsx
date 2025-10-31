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
            className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/10 p-8 rounded-2xl flex flex-col items-start text-left hover:border-cyan-500/50 hover:from-slate-800/60 hover:to-slate-900/60 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300"></div>
            <div className="relative p-3 mb-5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl text-cyan-300 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300 group-hover:scale-110">
                {icon}
            </div>
            <h3 className="relative text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>
            <p className="relative text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{description}</p>
        </button>
    );
};
