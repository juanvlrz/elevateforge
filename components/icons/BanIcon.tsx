
import React from 'react';

export const BanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
    {/* Corner brackets */}
    <path d="M5 3 L3 3 L3 5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 3 L21 3 L21 5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 21 L3 21 L3 19" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 21 L21 21 L21 19" strokeLinecap="round" strokeLinejoin="round" />
    {/* X */}
    <path d="M8 8 L16 16" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 8 L8 16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);