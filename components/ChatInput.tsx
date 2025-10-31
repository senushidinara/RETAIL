import React from 'react';
import { SendIcon } from './icons/SendIcon';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSubmit, isLoading, placeholder }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!isLoading) {
      onSubmit(value);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "What are you shopping for today?"}
        disabled={isLoading}
        className="relative w-full bg-gradient-to-r from-slate-800/80 to-slate-800/60 backdrop-blur-sm border border-cyan-500/30 text-slate-100 rounded-full py-4 pl-8 pr-20 text-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition duration-300 placeholder-slate-500 shadow-lg shadow-cyan-500/5"
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading || !value.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 disabled:bg-slate-600 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-110 disabled:scale-100 font-bold"
      >
        <SendIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
