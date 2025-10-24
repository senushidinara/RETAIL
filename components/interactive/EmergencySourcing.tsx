import React, { useState } from 'react';
import { findEmergencySourcing } from '../../services/geminiService';
import type { SourcingStrategy } from '../../types';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { AlertIcon } from '../icons/AlertIcon';

const priorityColors = {
    High: 'border-rose-500 bg-rose-500/10 text-rose-300',
    Medium: 'border-amber-500 bg-amber-500/10 text-amber-300',
    Low: 'border-sky-500 bg-sky-500/10 text-sky-300'
};

export const EmergencySourcing: React.FC = () => {
    const [item, setItem] = useState('');
    const [location, setLocation] = useState('');
    const [strategy, setStrategy] = useState<SourcingStrategy | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFindSourcing = async () => {
        if (!item.trim() || !location.trim()) return;
        setIsLoading(true);
        setError(null);
        setStrategy(null);
        try {
            const result = await findEmergencySourcing(item, location);
            setStrategy(result);
        } catch (e) {
            setError((e as Error).message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
            <h3 className="text-3xl font-bold text-white mb-4 text-center">Emergency Sourcing Finder</h3>
            <p className="text-slate-400 mb-6 text-center max-w-2xl mx-auto text-lg">
                When a critical component is out of stock, enter the item and location to generate alternative sourcing strategies.
            </p>

            <div className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="emergency-item" className="sr-only">Critical Item</label>
                        <input 
                            id="emergency-item"
                            type="text"
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                            placeholder="e.g., Critical Medical Ventilator Parts"
                            className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-base"
                        />
                    </div>
                    <div>
                        <label htmlFor="emergency-location" className="sr-only">Location</label>
                        <input 
                            id="emergency-location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g., Midwest Distribution Center"
                            className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-base"
                        />
                    </div>
                </div>
                 <button
                    onClick={handleFindSourcing}
                    disabled={isLoading || !item.trim() || !location.trim()}
                    className="w-full flex items-center justify-center gap-3 p-3 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors text-lg"
                >
                    {isLoading ? <><LoadingSpinner /> Finding Options...</> : <><AlertIcon className="w-5 h-5" /> Find Sourcing Strategies</>}
                </button>
                {error && <p className="text-rose-400 text-center mt-4">{error}</p>}
            </div>

            {isLoading && !strategy && (
                 <div className="text-center mt-8 text-slate-400">
                    <p>Contacting global logistics network and assessing options...</p>
                </div>
            )}

            {strategy && (
                 <div className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {strategy.strategies.map((opt, index) => (
                            <div key={index} className={`p-4 rounded-lg border ${priorityColors[opt.priority]}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-semibold text-slate-200 text-base">{opt.option}</p>
                                    <span className="text-2xl">{opt.icon}</span>
                                </div>
                                <p className="text-sm text-slate-400 mb-3">{opt.details}</p>
                                <div className="text-right">
                                     <span className={`text-xs font-bold px-2 py-1 rounded-full ${priorityColors[opt.priority]}`}>
                                        {opt.priority.toUpperCase()} PRIORITY
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};