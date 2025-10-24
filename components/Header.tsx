import React, { useState } from 'react';
import { SettingsIcon } from './icons/SettingsIcon';
import { UserIcon } from './icons/UserIcon';
import { PlaceholderModal } from './modals/PlaceholderModal';

export const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="flex justify-end items-center">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                        aria-label="Settings"
                    >
                        <SettingsIcon className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50">
                        <UserIcon className="w-10 h-10 p-1 bg-gradient-to-br from-cyan-400 to-sky-600 rounded-full text-white" />
                        <div>
                            <p className="font-semibold text-slate-200">Alex Reid</p>
                            <p className="text-xs text-slate-500">Administrator</p>
                        </div>
                    </div>
                </div>
            </header>
            <PlaceholderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};