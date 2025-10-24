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
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "What are you shopping for today?"}
        disabled={isLoading}
        className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-full py-4 pl-6 pr-20 text-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-200"
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading || !value.trim()}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-cyan-600 text-white hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-110 disabled:scale-100"
      >
        <SendIcon className="w-6 h-6" />
      </button>
    </div>
  );
};