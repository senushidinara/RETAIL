import React, { useState } from 'react';
import { SettingsIcon } from './icons/SettingsIcon';
import { UserIcon } from './icons/UserIcon';
import { PlaceholderModal } from './modals/PlaceholderModal';

export const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="flex justify-between items-center">
                <div className="hidden sm:flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-slate-800/40 to-slate-800/20 border border-cyan-500/15 rounded-xl">
                    <span className="text-sm text-cyan-300 font-semibold">Status:</span>
                    <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="text-sm text-slate-300">All Systems Operational</span>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="relative p-3 rounded-full text-slate-400 hover:text-cyan-300 hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 border border-transparent hover:border-cyan-500/30 group"
                        aria-label="Settings"
                    >
                        <SettingsIcon className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full group-hover:animate-pulse"></span>
                    </button>
                    <div className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-rose-500/20 to-orange-500/10 border border-rose-500/20 rounded-full">
                        <span className="text-xs font-bold text-rose-300">3</span>
                        <span className="text-xs text-rose-300/80 hidden sm:inline">Alerts</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/40 border border-transparent hover:border-cyan-500/20 transition-all duration-300 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur group-hover:blur-md transition-all duration-300"></div>
                            <UserIcon className="relative w-10 h-10 p-1 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-white text-sm">Alex Reid</p>
                            <p className="text-xs text-cyan-300/70">Administrator</p>
                        </div>
                    </div>
                </div>
            </header>
            <PlaceholderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
