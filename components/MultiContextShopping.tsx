import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage as ChatMessageType, ShoppingResults } from '../types';
import { getShoppingSuggestions } from '../services/geminiService';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import { ShoppingContextCard } from './ShoppingContextCard';
import { LoadingSpinner } from './icons/LoadingSpinner';
import { GiftIcon } from './icons/GiftIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { AlertIcon } from './icons/AlertIcon';

const examplePrompt = "I need a birthday gift, office supplies, and emergency batteries";

export const MultiContextShopping: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<ShoppingResults | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, results, isLoading]);

    const handleSubmit = async (prompt: string) => {
        if (!prompt.trim() || isLoading) return;

        const userMessage: ChatMessageType = { sender: 'user', content: prompt };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);
        setResults(null);

        try {
            const aiResults = await getShoppingSuggestions(prompt);
            setResults(aiResults);
            const aiMessage: ChatMessageType = { sender: 'ai', content: "I've processed your requests. Here are the suggestions and updates for you." };
            setMessages(prev => [...prev, aiMessage]);
        } catch (e) {
            const err = e as Error;
            setError(err.message || 'An unexpected error occurred.');
            const aiMessage: ChatMessageType = { sender: 'ai', content: "I'm sorry, I couldn't process your request. Please try again later." };
            setMessages(prev => [...prev, aiMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-slate-900/60 to-slate-950/60 rounded-3xl border border-cyan-500/10 backdrop-blur-sm shadow-2xl shadow-cyan-500/5">
            <div className="flex-grow p-8 space-y-6 overflow-y-auto custom-scrollbar">
                {messages.length === 0 && !results && (
                    <div className="text-center text-slate-400 pt-12">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent mb-2">Unified Shopping Assistant</h2>
                        <p className="mt-4 text-lg text-slate-300">How can I help you today?</p>
                        <div className="mt-6 flex flex-wrap gap-2 justify-center">
                            <button
                                onClick={() => handleSubmit("Personal shopping for a date night")}
                                className="text-xs font-semibold text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 px-4 py-2 rounded-full border border-cyan-500/50 transition-all duration-300"
                            >
                                💝 Personal
                            </button>
                            <button
                                onClick={() => handleSubmit("Office supplies and equipment needed")}
                                className="text-xs font-semibold text-amber-300 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 px-4 py-2 rounded-full border border-amber-500/50 transition-all duration-300"
                            >
                                💼 Corporate
                            </button>
                            <button
                                onClick={() => handleSubmit("Emergency supplies for disaster preparedness")}
                                className="text-xs font-semibold text-rose-300 bg-gradient-to-r from-rose-500/20 to-red-500/20 hover:from-rose-500/30 hover:to-red-500/30 px-4 py-2 rounded-full border border-rose-500/50 transition-all duration-300"
                            >
                                🚨 Emergency
                            </button>
                        </div>
                        <button
                            onClick={() => handleSubmit(examplePrompt)}
                            className="mt-6 text-sm font-semibold text-cyan-300 hover:text-white bg-gradient-to-r from-cyan-500/30 to-blue-500/30 hover:from-cyan-500/40 hover:to-blue-500/40 px-8 py-3 rounded-full border border-cyan-500/50 transition-all duration-300 shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/25 inline-block"
                        >
                            Try an Example
                        </button>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                ))}
                
                {isLoading && (
                    <div className="flex justify-start items-center gap-3">
                        <LoadingSpinner />
                        <p className="text-slate-400">RetailBrain AI is thinking...</p>
                    </div>
                )}

                {error && <p className="text-rose-400 text-center">{error}</p>}

                {results && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                        <ShoppingContextCard 
                            title="Anniversary Gifts"
                            icon={<GiftIcon className="w-7 h-7" />}
                            items={results.anniversary}
                            type="anniversary"
                        />
                         <ShoppingContextCard 
                            title="Office Supplies"
                            icon={<BriefcaseIcon className="w-7 h-7" />}
                            items={results.office}
                            type="office"
                        />
                         <ShoppingContextCard 
                            title="Emergency Prep"
                            icon={<AlertIcon className="w-7 h-7" />}
                            items={results.emergency}
                            type="emergency"
                        />
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
            <div className="p-8 border-t border-cyan-500/10 flex-shrink-0 bg-gradient-to-b from-transparent to-slate-950/30">
                <ChatInput
                    value={input}
                    onChange={setInput}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};
