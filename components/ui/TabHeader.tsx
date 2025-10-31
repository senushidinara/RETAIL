import React from 'react';

interface TabHeaderProps {
    image: string;
    title: string;
    description: string;
}

export const TabHeader: React.FC<TabHeaderProps> = ({ image, title, description }) => {
    return (
        <div className="relative rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 group">
            <img
                src={image}
                alt={title}
                className="w-full h-56 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/5 group-hover:from-cyan-500/5 transition-all duration-500"></div>
            <div className="absolute bottom-0 left-0 p-8 pr-12">
                <h2 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent">{title}</h2>
                <p className="text-slate-300 max-w-3xl text-base leading-relaxed font-medium">{description}</p>
            </div>
        </div>
    );
};
