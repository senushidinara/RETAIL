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
        <aside className="w-64 bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-xl border-r border-cyan-500/10 p-6 flex flex-col h-screen sticky top-0 shadow-2xl shadow-cyan-500/5">
            <div className="flex items-center gap-3 mb-10">
                 <div className="p-2 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-lg border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
                    <LayoutDashboardIcon className="w-7 h-7 text-cyan-300"/>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent">RetailBrain AI</h1>
            </div>
            <nav className="flex flex-col gap-2">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                            activeTab === item.id
                                ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/20 text-cyan-200 border border-cyan-400/30 shadow-lg shadow-cyan-500/10'
                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-cyan-300 hover:border hover:border-cyan-500/20'
                        }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="my-6">
                <div className="relative overflow-hidden rounded-2xl h-32 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-500/20 shadow-xl shadow-cyan-500/10 group">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets%2Fb3ca505f4755410ca1f128143966e5c6%2Fcf14a290af864298a1eba5336d233d98?format=webp"
                        alt="RetailBrain featured"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-40"></div>
                </div>
            </div>
            <div className="mt-auto">
                 <div className="p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl text-center border border-cyan-500/20 shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/10 transition-shadow">
                    <p className="text-sm font-semibold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Upgrade to Pro</p>
                    <p className="text-xs text-slate-400 mt-2">Unlock advanced analytics and features.</p>
                    <button className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 text-sm uppercase tracking-wide">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </aside>
    );
};
