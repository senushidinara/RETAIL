import React from 'react';

interface TabHeaderProps {
    image: string;
    title: string;
    description: string;
}

export const TabHeader: React.FC<TabHeaderProps> = ({ image, title, description }) => {
    return (
        <div className="relative rounded-2xl overflow-hidden border border-slate-800">
            <img 
                src={image} 
                alt={title} 
                className="w-full h-48 object-cover object-center"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-4xl font-bold text-slate-100">{title}</h2>
                <p className="text-slate-300 mt-1 max-w-2xl text-lg">{description}</p>
            </div>
        </div>
    );
};