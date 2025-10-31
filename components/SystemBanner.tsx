import React, { useState } from 'react';
import { ZapIcon } from './icons/ZapIcon';
import { XIcon } from './icons/XIcon';

interface BannerMessage {
    type: 'info' | 'success' | 'warning' | 'alert';
    title: string;
    description: string;
    icon: React.ReactNode;
}

const bannerMessages: BannerMessage[] = [
    {
        type: 'success',
        title: 'AI Models Updated',
        description: 'Latest forecasting models now live - 12% accuracy improvement',
        icon: <ZapIcon className="w-5 h-5" />
    },
    {
        type: 'info',
        title: 'Smart Insights Available',
        description: 'New trend predictions based on real-time market analysis',
        icon: <ZapIcon className="w-5 h-5" />
    },
    {
        type: 'alert',
        title: 'Action Required',
        description: '3 supplier agreements need your review',
        icon: <ZapIcon className="w-5 h-5" />
    }
];

const typeStyles = {
    info: 'bg-gradient-to-r from-blue-500/15 to-cyan-500/15 border-blue-500/30 text-blue-300',
    success: 'bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border-emerald-500/30 text-emerald-300',
    warning: 'bg-gradient-to-r from-amber-500/15 to-yellow-500/15 border-amber-500/30 text-amber-300',
    alert: 'bg-gradient-to-r from-rose-500/15 to-orange-500/15 border-rose-500/30 text-rose-300'
};

interface SystemBannerProps {
    initialVisible?: boolean;
}

export const SystemBanner: React.FC<SystemBannerProps> = ({ initialVisible = true }) => {
    const [visible, setVisible] = useState(initialVisible);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!visible) return null;

    const message = bannerMessages[currentIndex];

    const handleNext = () => {
        if (currentIndex < bannerMessages.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setVisible(false);
        }
    };

    return (
        <div className={`relative overflow-hidden rounded-2xl border ${typeStyles[message.type]} p-6 mb-6 transition-all duration-300`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 mt-1 text-xl">{message.icon}</div>
                    <div className="flex-1">
                        <h3 className="font-bold text-white mb-1">{message.title}</h3>
                        <p className="text-sm opacity-90">{message.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    {bannerMessages.length > 1 && (
                        <div className="flex gap-1">
                            {bannerMessages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                                    }`}
                                    aria-label={`Message ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                    {currentIndex < bannerMessages.length - 1 && (
                        <button
                            onClick={handleNext}
                            className="px-4 py-1 text-xs font-bold rounded-full hover:bg-white/10 transition-all duration-300"
                        >
                            Next
                        </button>
                    )}
                    <button
                        onClick={() => setVisible(false)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
                        aria-label="Close banner"
                    >
                        <XIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
