import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare } from 'lucide-react';
import logoImg from '../assets/logoo.png';

const Navbar = () => {
  return (
    <nav className="bg-[#0a0a0c] text-white border-b border-[#d4af37]/20 sticky top-0 z-50 py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img 
            src={logoImg} 
            alt="Panchal Property Logo" 
            className="w-11 h-11 object-contain rounded-full border border-[#d4af37]/50 shadow-md group-hover:scale-105 transition duration-300"
          />
          <div className="hidden sm:block">
            <h1 className="font-serif text-lg tracking-wider text-[#d4af37] font-bold leading-none">
              PANCHAL PROPERTY
            </h1>
            <span className="text-[9px] text-gray-400 font-sans tracking-widest uppercase block mt-1">
              LAND CONSULTANT • INDORE
            </span>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <a
            href="tel:+919685792058"
            className="flex items-center space-x-2 text-xs text-white border border-gray-800 hover:border-[#d4af37] px-4 py-2 rounded-full font-medium transition bg-[#121217]"
          >
            <Phone className="h-3.5 w-3.5 text-[#d4af37]" />
            <span>96857-92058</span>
          </a>

          <a
            href="https://wa.me/919685792058"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-xs bg-[#d4af37] text-black hover:bg-[#e5c158] px-4 py-2 rounded-full font-bold transition shadow-lg shadow-[#d4af37]/20"
          >
            <MessageSquare className="h-3.5 w-3.5 fill-current" />
            <span>WhatsApp Direct</span>
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;