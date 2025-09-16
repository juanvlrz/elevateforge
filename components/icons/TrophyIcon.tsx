import React from 'react';

export const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M11.25 2.25c.586 0 1.15.222 1.564.618L14.436 4.5h-4.872l1.622-1.632A2.25 2.25 0 0111.25 2.25zM3.75 6a.75.75 0 00-.75.75v.038c0 .321.102.626.287.872l1.513 2.27A4.5 4.5 0 009 12.75h6a4.5 4.5 0 003.163-1.04l1.513-2.27a1.5 1.5 0 00.287-.872V6.75A.75.75 0 0019.5 6h-15zM2.25 15a.75.75 0 00-.75.75v.038c0 .321.102.626.287.872l1.513 2.27A4.5 4.5 0 006 21.75h12a4.5 4.5 0 003.163-1.04l1.513-2.27a1.5 1.5 0 00.287-.872V15.75a.75.75 0 00-.75-.75h-19.5z"
      clipRule="evenodd"
    />
  </svg>
);
