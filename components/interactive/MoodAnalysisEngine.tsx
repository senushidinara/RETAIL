import React, { useState } from 'react';
import { analyzeMoodAndSuggestProducts } from '../../services/geminiService';
import type { MoodAnalysisResult } from '../../types';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { WandSparklesIcon } from '../icons/WandSparklesIcon';

const exampleMood = "I need groceries but I’m overwhelmed";

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
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/15 rounded-2xl p-10 backdrop-blur-sm shadow-lg shadow-cyan-500/5">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent mb-3 text-center">Mood-to-Product Engine</h3>
            <p className="text-slate-300 mb-8 text-center max-w-2xl mx-auto text-sm">
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
                    className="w-full bg-gradient-to-br from-slate-800/60 to-slate-800/40 border border-cyan-500/30 text-slate-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all duration-300 placeholder-slate-500 resize-none"
                />
                <div className="text-center mt-3 mb-5">
                     <button
                        onClick={() => setText(exampleMood)}
                        className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 px-5 py-2 rounded-full border border-cyan-500/40 transition-all duration-300"
                    >
                        Try Example
                    </button>
                </div>
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading || !text.trim()}
                    className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/40 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 text-sm uppercase tracking-wide"
                >
                    {isLoading ? <><LoadingSpinner /> Analyzing...</> : <><WandSparklesIcon className="w-5 h-5" /> Analyze & Suggest</>}
                </button>
                 {error && <p className="text-rose-400 text-center mt-4 text-sm font-medium">{error}</p>}
            </div>

            {result && (
                <div className="mt-10 p-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-2xl border border-cyan-500/15">
                    <div className="text-center mb-8">
                        <p className="text-xs font-bold text-cyan-400/70 mb-2 uppercase tracking-wide">Detected Mood</p>
                        <p className="text-4xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent">{result.detectedMood}</p>
                        <p className="text-slate-300 mt-4 text-sm italic">"{result.explanation}"</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {result.suggestions.map((item, index) => (
                            <div key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/30 p-6 rounded-xl border border-cyan-500/10 hover:border-cyan-500/20 hover:bg-slate-800/70 transition-all duration-300">
                                <p className="text-4xl mb-4">{item.icon}</p>
                                <p className="font-bold text-white text-base mb-2">{item.productName}</p>
                                <p className="text-sm text-slate-300">{item.reason}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
