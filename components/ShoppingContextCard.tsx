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
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-700/50 rounded-lg text-cyan-400">
                    {icon}
                </div>
                <h3 className="text-2xl font-semibold text-slate-100">{title}</h3>
            </div>
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-4 p-4 bg-slate-800 rounded-lg">
                        <div className="text-xl mt-1">
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
