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

const examplePrompt = "I need a 10th anniversary gift for my wife, also need to order more printer paper and ink for the office, and can you check on the status of our emergency flashlight order?";

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
        <div className="h-full flex flex-col bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex-grow p-6 space-y-6 overflow-y-auto custom-scrollbar">
                {messages.length === 0 && !results && (
                    <div className="text-center text-slate-400 pt-16">
                        <h2 className="text-3xl font-bold text-slate-200">Unified Shopping Assistant</h2>
                        <p className="mt-2 text-lg">How can I help you today?</p>
                        <button 
                            onClick={() => handleSubmit(examplePrompt)}
                            className="mt-4 text-sm text-cyan-400 hover:text-cyan-300 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 transition-colors"
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
            <div className="p-6 border-t border-slate-800 flex-shrink-0">
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
