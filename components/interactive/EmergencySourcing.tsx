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
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-rose-500/15 rounded-2xl p-10 backdrop-blur-sm shadow-lg shadow-rose-500/5">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-rose-300 via-rose-400 to-orange-400 bg-clip-text text-transparent mb-3 text-center">Emergency Sourcing Finder</h3>
            <p className="text-slate-300 mb-8 text-center max-w-2xl mx-auto text-sm">
                When a critical component is out of stock, enter the item and location to generate alternative sourcing strategies.
            </p>

            <div className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div>
                        <label htmlFor="emergency-item" className="sr-only">Critical Item</label>
                        <input
                            id="emergency-item"
                            type="text"
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                            placeholder="e.g., Generators and bottled water"
                            className="w-full bg-gradient-to-br from-slate-800/60 to-slate-800/40 border border-rose-500/30 text-slate-100 rounded-xl p-4 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 focus:outline-none text-sm placeholder-slate-500 transition-all duration-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="emergency-location" className="sr-only">Location</label>
                        <input
                            id="emergency-location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g., Miami, FL during hurricane"
                            className="w-full bg-gradient-to-br from-slate-800/60 to-slate-800/40 border border-rose-500/30 text-slate-100 rounded-xl p-4 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 focus:outline-none text-sm placeholder-slate-500 transition-all duration-300"
                        />
                    </div>
                </div>
                 <button
                    onClick={handleFindSourcing}
                    disabled={isLoading || !item.trim() || !location.trim()}
                    className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 text-white font-bold hover:shadow-lg hover:shadow-rose-500/40 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 text-sm uppercase tracking-wide"
                >
                    {isLoading ? <><LoadingSpinner /> Finding Options...</> : <><AlertIcon className="w-5 h-5" /> Find Sourcing Strategies</>}
                </button>
                {error && <p className="text-rose-400 text-center mt-4 text-sm font-medium">{error}</p>}
            </div>

            {isLoading && !strategy && (
                 <div className="text-center mt-10 text-slate-400">
                    <p className="text-sm">Contacting global logistics network and assessing options...</p>
                </div>
            )}

            {strategy && (
                 <div className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {strategy.strategies.map((opt, index) => (
                            <div key={index} className={`p-6 rounded-xl border backdrop-blur-sm hover:shadow-lg transition-all duration-300 ${opt.priority === 'High' ? 'border-rose-500/40 bg-rose-500/10 hover:shadow-rose-500/20' : opt.priority === 'Medium' ? 'border-amber-500/40 bg-amber-500/10 hover:shadow-amber-500/20' : 'border-sky-500/40 bg-sky-500/10 hover:shadow-sky-500/20'}`}>
                                <div className="flex items-center justify-between mb-3">
                                    <p className="font-bold text-white text-base">{opt.option}</p>
                                    <span className="text-3xl">{opt.icon}</span>
                                </div>
                                <p className="text-sm text-slate-300 mb-4">{opt.details}</p>
                                <div className="text-right">
                                     <span className={`text-xs font-bold px-3 py-1 rounded-lg inline-block ${opt.priority === 'High' ? 'bg-rose-500/30 text-rose-200' : opt.priority === 'Medium' ? 'bg-amber-500/30 text-amber-200' : 'bg-sky-500/30 text-sky-200'}`}>
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
