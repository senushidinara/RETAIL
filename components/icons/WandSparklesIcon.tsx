import React from 'react';

export const WandSparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
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
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M16 22.01V22" />
        <path d="M7 11.01V11" />
        <path d="M11 7.01V7" />
        <path d="M22 16.01V16" />
    </svg>
);