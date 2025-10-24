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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity animate-fade-in"
            onClick={onClose}
        >
            <div 
                className={`bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full m-4 flex flex-col ${sizeClasses[size]}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-5 border-b border-slate-700 flex-shrink-0">
                    <h3 className="text-xl font-bold text-slate-100">{title}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar" style={{maxHeight: '80vh'}}>
                    {children}
                </div>
            </div>
        </div>
    );
};