
import React from 'react';

export const RobotIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M12 8V4H8v4"/>
    <rect width="16" height="12" x="4" y="12" rx="2"/>
    <path d="M2 12h2"/>
    <path d="M20 12h2"/>
    <path d="M12 18v-2"/>
    <path d="M9 16.5v-1"/>
    <path d="M15 16.5v-1"/>
  </svg>
);
