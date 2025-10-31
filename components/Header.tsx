import React, { useState } from 'react';
import { SettingsIcon } from './icons/SettingsIcon';
import { UserIcon } from './icons/UserIcon';
import { PlaceholderModal } from './modals/PlaceholderModal';

export const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="flex justify-end items-center">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="p-3 rounded-full text-slate-400 hover:text-cyan-300 hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 border border-transparent hover:border-cyan-500/30"
                        aria-label="Settings"
                    >
                        <SettingsIcon className="w-6 h-6" />
                    </button>
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
