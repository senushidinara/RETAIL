import React from 'react';

export const HandshakeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className || "w-6 h-6"}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M14.5 16.5 12 15l-2.5 1.5"/>
        <path d="m20 17-1.5-1.5a2.36 2.36 0 0 0-3.32 0l-1.18 1.18a2.36 2.36 0 0 1-3.32 0l-1.18-1.18a2.36 2.36 0 0 0-3.32 0L4 17"/>
        <path d="m14 14 1-1"/>
        <path d="M10 14 9 13"/>
    </svg>
);