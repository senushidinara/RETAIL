import React, { useState } from 'react';
import { forecastProductTrend } from '../../services/geminiService';
import type { TrendForecast } from '../../types';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { ZapIcon } from '../icons/ZapIcon';

export const TrendForecaster: React.FC = () => {
    const [category, setCategory] = useState('Fashion');
    const [season, setSeason] = useState('Summer 2025');
    const [result, setResult] = useState<TrendForecast | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleForecast = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const forecast = await forecastProductTrend(category, season);
            setResult(forecast);
        } catch (e) {
            setError((e as Error).message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/15 rounded-2xl p-10 backdrop-blur-sm shadow-lg shadow-cyan-500/5">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent mb-3 text-center">Viral Trend Forecaster</h3>
            <p className="text-slate-300 mb-8 text-center max-w-2xl mx-auto text-sm">
                Select a product category and a future season to generate a prediction for the next viral hit.
            </p>

            <div className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div>
                        <label htmlFor="category" className="block text-xs font-bold text-cyan-400/70 mb-2 uppercase tracking-wide">Category</label>
                        <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-gradient-to-br from-slate-800/60 to-slate-800/40 border border-cyan-500/30 text-slate-100 rounded-xl p-4 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none text-sm transition-all duration-300">
                            <option>Fashion</option>
                            <option>Home Goods</option>
                            <option>Tech Gadgets</option>
                            <option>Beauty</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="season" className="block text-xs font-bold text-cyan-400/70 mb-2 uppercase tracking-wide">Season</label>
                         <select id="season" value={season} onChange={e => setSeason(e.target.value)} className="w-full bg-gradient-to-br from-slate-800/60 to-slate-800/40 border border-cyan-500/30 text-slate-100 rounded-xl p-4 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none text-sm transition-all duration-300">
                            <option>Summer 2025</option>
                            <option>Fall 2025</option>
                            <option>Winter 2025</option>
                            <option>Spring 2026</option>
                        </select>
                    </div>
                </div>
                 <button
                    onClick={handleForecast}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/40 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 text-sm uppercase tracking-wide"
                >
                    {isLoading ? <><LoadingSpinner /> Forecasting...</> : <><ZapIcon className="w-5 h-5" /> Forecast Trend</>}
                </button>
                {error && <p className="text-rose-400 text-center mt-4 text-sm font-medium">{error}</p>}
            </div>

            {isLoading && !result && (
                <div className="text-center mt-10 text-slate-400">
                    <p className="text-sm">Analyzing market signals and predicting the future...</p>
                </div>
            )}

            {result && (
                 <div className="mt-10 p-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-2xl border border-cyan-500/15">
                    <div className="text-center mb-8">
                        <p className="text-xs font-bold text-cyan-400/70 mb-2 uppercase tracking-wide">Predicted Trend</p>
                        <p className="text-4xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent">{result.trendName}</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        <div className="lg:col-span-2">
                             <p className="text-slate-200 text-sm leading-relaxed">{result.description}</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-cyan-500/15 to-blue-500/10 rounded-xl border border-cyan-500/20">
                            <p className="text-xs font-bold text-cyan-400/70 mb-3 uppercase tracking-wide">Confidence Score</p>
                             <p className="text-6xl font-black text-cyan-300">{result.confidence}<span className="text-2xl">%</span></p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
