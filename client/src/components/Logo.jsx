import React from 'react';

const Logo = ({ className = "w-11 h-11" }) => {
  return (
    <div className={`relative rounded-full border border-[#d4af37]/50 bg-[#0a0a0c] flex items-center justify-center p-1 shadow-md overflow-hidden ${className}`}>
      <svg viewBox="0 0 500 500" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Circular Frame */}
        <circle cx="250" cy="250" r="235" stroke="#d4af37" strokeWidth="10" />
        <circle cx="250" cy="250" r="220" stroke="#d4af37" strokeWidth="3" />
        
        {/* Architectural Buildings */}
        <path d="M170 420 V220 L210 180 L250 220 V420 Z" fill="#d4af37" />
        <path d="M225 420 V130 L250 100 L275 130 V420 Z" fill="#d4af37" />
        <path d="M290 420 V230 L330 190 L370 230 V420 Z" fill="#d4af37" />
        
        {/* Roof Structure */}
        <path d="M120 280 L250 160 L380 280 L360 300 L250 200 L140 300 Z" fill="#d4af37" />
        
        {/* Decorative Tree Graphic */}
        <path d="M380 260 C370 240 390 220 405 230 C415 215 435 225 430 240 C445 250 435 270 420 270 V290 H400 V270 C385 270 375 260 380 260 Z" fill="#d4af37" />
        
        {/* Center Grid Window */}
        <rect x="235" y="225" width="12" height="12" fill="#0a0a0c" />
        <rect x="253" y="225" width="12" height="12" fill="#0a0a0c" />
        <rect x="235" y="243" width="12" height="12" fill="#0a0a0c" />
        <rect x="253" y="243" width="12" height="12" fill="#0a0a0c" />
      </svg>
    </div>
  );
};

export default Logo;