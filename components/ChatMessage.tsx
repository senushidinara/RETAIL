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
        <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                    <RobotIcon className="w-6 h-6 text-cyan-400" />
                </div>
            )}
            <div className={`max-w-xl p-4 rounded-2xl ${isUser ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}>
                <p className="text-base">{message.content}</p>
            </div>
            {isUser && (
                 <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-slate-300" />
                </div>
            )}
        </div>
    );
};
