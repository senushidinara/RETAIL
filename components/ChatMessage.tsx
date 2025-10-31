import React from 'react';
import type { ChatMessage as ChatMessageType } from '../types';
import { UserIcon } from './icons/UserIcon';
import { RobotIcon } from './icons/RobotIcon';

interface ChatMessageProps {
    message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.sender === 'user';

    return (
        <div className={`flex items-end gap-3 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <RobotIcon className="w-5 h-5 text-white" />
                </div>
            )}
            <div className={`max-w-2xl px-5 py-4 rounded-2xl ${isUser ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-none shadow-lg shadow-cyan-500/30' : 'bg-gradient-to-br from-slate-800/60 to-slate-900/40 text-slate-100 rounded-bl-none border border-cyan-500/20 shadow-lg shadow-cyan-500/5'}`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
            {isUser && (
                 <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <UserIcon className="w-5 h-5 text-white" />
                </div>
            )}
        </div>
    );
};
