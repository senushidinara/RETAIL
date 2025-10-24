import React, { useState } from 'react';
import { analyzeMoodAndSuggestProducts } from '../../services/geminiService';
import type { MoodAnalysisResult } from '../../types';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { WandSparklesIcon } from '../icons/WandSparklesIcon';

const exampleMood = "Ugh, this week has been so stressful. I just want to relax and forget about work for a bit.";

export const MoodAnalysisEngine: React.FC = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState<MoodAnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!text.trim()) return;
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const analysis = await analyzeMoodAndSuggestProducts(text);
            setResult(analysis);
        } catch (e) {
            setError((e as Error).message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
            <h3 className="text-3xl font-bold text-white mb-4 text-center">Mood-to-Product Engine</h3>
            <p className="text-slate-400 mb-6 text-center max-w-2xl mx-auto text-lg">
                Enter any text—a customer review, a social media post, a chat message—to analyze the underlying mood and get instant, tailored product suggestions.
            </p>

            <div className="max-w-3xl mx-auto">
                <label htmlFor="mood-text-input" className="sr-only">Enter customer text here...</label>
                <textarea
                    id="mood-text-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter customer text here..."
                    rows={4}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-3 text-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
                />
                <div className="text-center mt-2 mb-4">
                     <button
                        onClick={() => setText(exampleMood)}
                        className="text-sm text-cyan-400 hover:text-cyan-300 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700 transition-colors"
                    >
                        Try Example
                    </button>
                </div>
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading || !text.trim()}
                    className="w-full flex items-center justify-center gap-3 p-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors text-lg"
                >
                    {isLoading ? <><LoadingSpinner /> Analyzing...</> : <><WandSparklesIcon className="w-5 h-5" /> Analyze & Suggest</>}
                </button>
                 {error && <p className="text-rose-400 text-center mt-4">{error}</p>}
            </div>

            {result && (
                <div className="mt-8 p-6 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div className="text-center mb-6">
                        <p className="text-slate-400 text-lg">Detected Mood</p>
                        <p className="text-3xl font-bold text-cyan-400">{result.detectedMood}</p>
                        <p className="text-slate-300 mt-1 text-base">"{result.explanation}"</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {result.suggestions.map((item, index) => (
                            <div key={index} className="bg-slate-800 p-4 rounded-lg">
                                <p className="text-3xl mb-2">{item.icon}</p>
                                <p className="font-semibold text-slate-200 text-lg">{item.productName}</p>
                                <p className="text-base text-slate-400">{item.reason}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};