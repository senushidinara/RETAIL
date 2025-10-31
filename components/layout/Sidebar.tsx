import React from 'react';
import { ShoppingCartIcon } from '../icons/ShoppingCartIcon';
import { TheaterIcon } from '../icons/TheaterIcon';
import { ZapIcon } from '../icons/ZapIcon';
import { BoxIcon } from '../icons/BoxIcon';
import { HandshakeIcon } from '../icons/HandshakeIcon';
import { WandSparklesIcon } from '../icons/WandSparklesIcon';
import { LayoutDashboardIcon } from '../icons/LayoutDashboardIcon';


interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const navItems = [
    { id: 'unified-shopping', label: 'Unified Shopping', icon: <ShoppingCartIcon className="w-5 h-5" /> },
    { id: 'emotional-commerce', label: 'Emotional Commerce', icon: <TheaterIcon className="w-5 h-5" /> },
    { id: 'predictive-inventory', label: 'Predictive Inventory', icon: <BoxIcon className="w-5 h-5" /> },
    { id: 'crisis-resilience', label: 'Crisis Resilience', icon: <ZapIcon className="w-5 h-5" /> },
    { id: 'image-studio', label: 'Image Studio', icon: <WandSparklesIcon className="w-5 h-5" /> },
    { id: 'autonomous-supply-chain', label: 'Autonomous Supply Chain', icon: <HandshakeIcon className="w-5 h-5" /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col h-screen sticky top-0">
            <div className="flex items-center gap-3 mb-10">
                 <div className="p-2 bg-slate-700 rounded-lg">
                    <LayoutDashboardIcon className="w-7 h-7 text-cyan-400"/>
                </div>
                <h1 className="text-2xl font-bold text-slate-100">RetailBrain AI</h1>
            </div>
            <nav className="flex flex-col gap-2">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                            activeTab === item.id
                                ? 'bg-cyan-500/10 text-cyan-300'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="my-6">
                <div className="relative overflow-hidden rounded-lg h-32 bg-slate-800 border border-slate-700/50">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets%2Fb3ca505f4755410ca1f128143966e5c6%2Fcf14a290af864298a1eba5336d233d98?format=webp"
                        alt="RetailBrain featured"
                        className="w-full h-full object-cover opacity-90"
                    />
                </div>
            </div>
            <div className="mt-auto">
                 <div className="p-4 bg-slate-800 rounded-lg text-center">
                    <p className="text-sm text-slate-300">Upgrade to Pro</p>
                    <p className="text-xs text-slate-500 mt-1">Unlock advanced analytics and features.</p>
                    <button className="mt-4 w-full bg-cyan-600 text-white font-semibold py-2 rounded-lg hover:bg-cyan-500 transition-colors text-sm">
                        Upgrade
                    </button>
                </div>
            </div>
        </aside>
    );
};
