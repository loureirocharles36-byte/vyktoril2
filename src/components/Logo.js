import React from 'react';
export default function Logo({ size = 48 }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4DAAFF" />
          <stop offset="55%" stopColor="#A87FFF" />
          <stop offset="100%" stopColor="#6B21FF" />
        </linearGradient>
        <linearGradient id="lg2" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4DAAFF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#6B21FF" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <polygon points="40,4 74,22 74,58 40,76 6,58 6,22" fill="url(#lg2)" stroke="url(#lg1)" strokeWidth="1.4" opacity="0.8" />
      <path d="M20 22 L40 58 L60 22" stroke="url(#lg1)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="20" cy="22" r="2.5" fill="#4DAAFF" opacity="0.9" />
      <circle cx="60" cy="22" r="2.5" fill="#6B21FF" opacity="0.9" />
      <circle cx="40" cy="58" r="3.2" fill="url(#lg1)" />
    </svg>
  );
}
