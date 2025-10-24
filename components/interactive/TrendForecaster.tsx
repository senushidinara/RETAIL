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
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
            <h3 className="text-3xl font-bold text-white mb-4 text-center">Viral Trend Forecaster</h3>
            <p className="text-slate-400 mb-6 text-center max-w-2xl mx-auto text-lg">
                Select a product category and a future season to generate a prediction for the next viral hit.
            </p>

            <div className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                        <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-base">
                            <option>Fashion</option>
                            <option>Home Goods</option>
                            <option>Tech Gadgets</option>
                            <option>Beauty</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="season" className="block text-sm font-medium text-slate-400 mb-1">Season</label>
                         <select id="season" value={season} onChange={e => setSeason(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-base">
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
                    className="w-full flex items-center justify-center gap-3 p-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors text-lg"
                >
                    {isLoading ? <><LoadingSpinner /> Forecasting...</> : <><ZapIcon className="w-5 h-5" /> Forecast Trend</>}
                </button>
                {error && <p className="text-rose-400 text-center mt-4">{error}</p>}
            </div>

            {isLoading && !result && (
                <div className="text-center mt-8 text-slate-400">
                    <p>Analyzing market signals and predicting the future...</p>
                </div>
            )}

            {result && (
                 <div className="mt-8 p-6 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div className="text-center mb-6">
                        <p className="text-slate-400 text-lg">Predicted Trend</p>
                        <p className="text-3xl font-bold text-cyan-400">{result.trendName}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex-1">
                             <p className="text-slate-300 text-lg">{result.description}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-slate-400 text-base">Confidence</p>
                             <p className="text-6xl font-bold text-white">{result.confidence}%</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};