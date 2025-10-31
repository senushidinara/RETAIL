import React from 'react';
import type { AnniversarySuggestion, OfficeSupply, EmergencyItem } from '../types';
import { ClipboardListIcon } from './icons/ClipboardListIcon';

type Item = AnniversarySuggestion | OfficeSupply | EmergencyItem;

interface ShoppingContextCardProps {
    title: string;
    icon: React.ReactNode;
    items: Item[];
    type: 'anniversary' | 'office' | 'emergency';
}

const renderItem = (item: Item, type: 'anniversary' | 'office' | 'emergency') => {
    if (type === 'anniversary') {
        const annivItem = item as AnniversarySuggestion;
        return (
            <>
                <p className="font-semibold text-slate-200">{annivItem.title}</p>
                <p className="text-slate-400 text-sm">{annivItem.description}</p>
            </>
        );
    }
    if (type === 'office') {
        const officeItem = item as OfficeSupply;
        return (
            <>
                <p className="font-semibold text-slate-200">{officeItem.item}</p>
                <p className="text-slate-400 text-sm">{officeItem.details}</p>
            </>
        );
    }
    if (type === 'emergency') {
        const emergencyItem = item as EmergencyItem;
        return (
            <>
                <p className="font-semibold text-slate-200">{emergencyItem.item}</p>
                <p className="text-slate-400 text-sm">{emergencyItem.status}</p>
            </>
        );
    }
    return null;
}


export const ShoppingContextCard: React.FC<ShoppingContextCardProps> = ({ title, icon, items, type }) => {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/15 rounded-2xl p-7 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/15 group">
            <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl text-cyan-300 border border-cyan-500/30 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>
            </div>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-4 p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/30 rounded-xl border border-cyan-500/10 hover:border-cyan-500/20 hover:bg-slate-800/70 transition-all duration-300">
                        <div className="text-xl mt-1 text-cyan-300">
                            {('icon' in item) ? item.icon : <ClipboardListIcon className="w-6 h-6 text-slate-400" />}
                        </div>
                        <div className="flex-1">
                            {renderItem(item, type)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
