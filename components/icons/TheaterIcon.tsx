import React from 'react';

export const TheaterIcon: React.FC<{ className?: string }> = ({ className }) => (
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
       <path d="M2 12c0-2.8.9-5.3 2.4-7.3"/>
       <path d="M22 12c0-2.8-.9-5.3-2.4-7.3"/>
       <path d="M7 19.3c-1.8-1.4-3-3.5-3-5.9"/>
       <path d="M17 19.3c1.8-1.4 3-3.5 3-5.9"/>
       <path d="M10.3 20.8c.4.1.8.2 1.7.2s1.3-.1 1.7-.2"/>
       <path d="M14.2 4.2c-.4-.1-.8-.2-1.2-.2s-.8.1-1.2.2"/>
       <path d="M12 2v2"/>
       <path d="M12 20v2"/>
       <path d="M12 8a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4Z"/>
    </svg>
);
