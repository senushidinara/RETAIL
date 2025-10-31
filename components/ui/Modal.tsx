import React, { ReactNode } from 'react';
import { XIcon } from '../icons/XIcon';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: 'md' | 'lg' | 'xl' | '2xl';
}

const sizeClasses = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
};


export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'lg' }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50 transition-opacity animate-fade-in"
            onClick={onClose}
        >
            <div
                className={`bg-gradient-to-br from-slate-900/95 to-slate-950/95 border border-cyan-500/20 rounded-3xl shadow-2xl shadow-cyan-500/20 w-full m-4 flex flex-col ${sizeClasses[size]}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-7 border-b border-cyan-500/10 flex-shrink-0">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">{title}</h3>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all duration-300 border border-transparent hover:border-cyan-500/30">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-8 overflow-y-auto custom-scrollbar" style={{maxHeight: '80vh'}}>
                    {children}
                </div>
            </div>
        </div>
    );
};
