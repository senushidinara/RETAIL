import React from 'react';

interface TabHeaderProps {
    image: string;
    title: string;
    description: string;
}

export const TabHeader: React.FC<TabHeaderProps> = ({ image, title, description }) => {
    return (
        <div className="relative rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/15 group">
            <img
                src={image}
                alt={title}
                className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/10 group-hover:from-cyan-500/10 group-hover:to-blue-500/15 transition-all duration-500"></div>
            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                <h2 className="text-6xl font-black text-white mb-4 bg-gradient-to-r from-cyan-200 via-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">{title}</h2>
                <p className="text-slate-200 max-w-4xl text-base leading-relaxed font-medium">{description}</p>
            </div>
        </div>
    );
};
