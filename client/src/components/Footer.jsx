import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileCheck, 
  Ruler, 
  Handshake, 
  MessageSquare, 
  Phone, 
  MapPin, 
  MessageCircle 
} from 'lucide-react';

const Footer = () => {
  const handleWhatsApp = () => {
    const text = "Hi, I am looking to buy/sell land in Indore. Please share details.";
    window.open(`https://wa.me/919685792058?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <footer className="bg-black text-gray-300 font-sans">
      {/* --- Top Features Strip --- */}
      <div className="bg-[#18181b] border-y border-gray-800/80 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          
          {/* Feature 1 */}
          <div className="flex flex-col items-center space-y-2">
            <FileCheck className="w-8 h-8 text-[#d4af37]" />
            <h4 className="text-white font-bold text-sm">Clear Title Land</h4>
            <p className="text-xs text-gray-400">Verified documents & registry</p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center space-y-2">
            <Ruler className="w-8 h-8 text-[#d4af37]" />
            <h4 className="text-white font-bold text-sm">Accurate Dimensions</h4>
            <p className="text-xs text-gray-400">Front road & Bigha/Sq.Ft specs</p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center space-y-2">
            <Handshake className="w-8 h-8 text-[#d4af37]" />
            <h4 className="text-white font-bold text-sm">Fair Pricing</h4>
            <p className="text-xs text-gray-400">Direct deal with land consultant</p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center space-y-2">
            <MessageSquare className="w-8 h-8 text-[#d4af37]" />
            <h4 className="text-white font-bold text-sm">Instant WhatsApp</h4>
            <p className="text-xs text-gray-400">Get site location directly</p>
          </div>

        </div>
      </div>

      {/* --- Main Footer Content --- */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold font-serif text-[#d4af37] uppercase tracking-wider">
            PANCHAL PROPERTY
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
            Indore's trusted Land Consultant. Specializing in prime agricultural land, highway parcels, residential plots, and investment opportunities.
          </p>
          <p className="text-xs font-semibold text-[#d4af37] pt-1">
            ॐ || श्री गणेशाय नमः ||
          </p>
        </div>

        {/* Column 2: Contact & Location */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            CONTACT & LOCATION
          </h4>
          <div className="space-y-2 text-xs text-gray-400">
            <a href="tel:+919685792058" className="flex items-center space-x-2.5 hover:text-white transition">
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <span>+91 96857-92058</span>
            </a>
            <div className="flex items-center space-x-2.5">
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              <span>Indore, Madhya Pradesh</span>
            </div>
            <a 
              href="https://instagram.com/panchalproperty.indore" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-2.5 hover:text-white transition"
            >
              {/* Native Inline SVG for Instagram to avoid export errors */}
              <svg 
                className="w-4 h-4 text-[#d4af37]" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>@panchalproperty.indore</span>
            </a>
          </div>
        </div>

        {/* Column 3: Call To Action */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            LOOKING TO BUY OR SELL LAND?
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Contact us on WhatsApp to list your property or get private land options in Indore.
          </p>
          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center space-x-2 bg-[#121215] border border-[#d4af37]/40 hover:border-[#d4af37] text-[#d4af37] px-4 py-2.5 rounded-full text-xs font-bold transition shadow-lg mt-1"
          >
            <MessageCircle className="w-4 h-4 text-[#d4af37]" />
            <span>Send Message on WhatsApp</span>
          </button>
        </div>

      </div>

      {/* --- Bottom Copyright Bar with Hidden Mobile Admin Access --- */}
      <div className="border-t border-gray-900 py-4 px-4 text-xs text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Panchal Property Indore. All Rights Reserved.</p>
          
          <div className="flex items-center space-x-1">
            <span>Designed with Black & Gold Theme</span>
            {/* Tapping this small dot on mobile opens /admin */}
            <Link 
              to="/admin" 
              className="text-gray-600 hover:text-gray-400 select-none px-0.5"
              title="Dashboard"
            >
              •
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;