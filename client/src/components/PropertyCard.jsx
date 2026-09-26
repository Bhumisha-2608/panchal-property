import React, { useState } from 'react';
import { MapPin, MessageSquare, ChevronLeft, ChevronRight, Info, X, ExternalLink, Layers } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Default placeholder image
  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80";

  // Safely extract uploaded images
  const parseImages = () => {
    let raw = property?.images || property?.imageUrls || property?.photos || property?.imageUrl || property?.image;
    
    if (!raw) return [DEFAULT_IMAGE];

    if (Array.isArray(raw)) {
      const filtered = raw.filter(Boolean);
      return filtered.length > 0 ? filtered : [DEFAULT_IMAGE];
    }

    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        if (raw.includes(',')) {
          return raw.split(',').map((img) => img.trim()).filter(Boolean);
        }
      }
      return [raw];
    }

    return [DEFAULT_IMAGE];
  };

  const images = parseImages();

  // Normalize sold status
  const isSold = property?.isAvailable === false || property?.status === 'Sold' || property?.isSold === true;

  const nextPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev + 1) % images.length);
  };

  const prevPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const whatsappNumber = "919685792058";
  const whatsappMessage = encodeURIComponent(
    `Hello Panchal Property, I would like to enquire about the listing: "${property?.title}" located at ${property?.location || 'Indore'}. Price: ₹${property?.price} ${property?.priceUnit || ''}.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  
  // Construct map link
  const mapUrl = property?.mapLocation || property?.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((property?.location || 'Indore') + " Indore")}`;

  return (
    <>
      <div className="bg-[#121215] border border-gray-800/80 rounded-2xl overflow-hidden hover:border-[#d4af37]/40 transition duration-300 flex flex-col justify-between shadow-2xl group">
        
        {/* Top Image Section */}
        <div className="relative h-52 w-full bg-slate-900 overflow-hidden cursor-pointer" onClick={() => { setModalPhotoIndex(currentPhotoIndex); setIsModalOpen(true); }}>
          <img
            src={images[currentPhotoIndex]}
            alt={property?.title || "Property image"}
            onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex items-center space-x-2 z-10">
            <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
              isSold ? 'bg-red-900 text-red-200' : 'bg-[#d4af37] text-black'
            }`}>
              {isSold ? 'SOLD OUT' : 'AVAILABLE'}
            </span>
            {property?.isFeatured !== false && (
              <span className="bg-black/70 backdrop-blur-md border border-gray-700 text-gray-200 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                FEATURED
              </span>
            )}
          </div>

          {/* Category Tag Overlay at Bottom Left of Image */}
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-gray-200 flex items-center space-x-1.5 z-10 border border-gray-800">
            <Layers className="w-3 h-3 text-[#d4af37]" />
            <span>{property?.propertyType || 'Land (Jameen)'}</span>
          </div>

          {/* Image Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#d4af37] text-white hover:text-black p-1.5 rounded-full border border-gray-700 transition z-20"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#d4af37] text-white hover:text-black p-1.5 rounded-full border border-gray-700 transition z-20"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            {/* Title */}
            <h3 className="text-base font-bold text-white font-serif uppercase tracking-wide line-clamp-1">
              {property?.title || 'PRIME LAND PROPERTY'}
            </h3>


          </div>

          {/* Specs Box */}
          <div className="bg-[#0b0b0e] border border-gray-800/80 rounded-xl p-3 grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">SIZE / AREA</span>
              <span className="text-xs font-bold text-white">{property?.size || '10 Bigha'}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">FRONTAGE</span>
              <span className="text-xs font-bold text-white">{property?.frontage || 'Main Road Touch'}</span>
            </div>
          </div>

          {/* Price Header */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-gray-400">Demand Price</span>
            <div className="text-right">
              <span className="text-lg font-black text-[#d4af37] font-serif">₹ {property?.price || '0'}</span>
              <span className="text-xs font-bold text-[#d4af37] ml-1">{property?.priceUnit || ''}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={() => { setModalPhotoIndex(currentPhotoIndex); setIsModalOpen(true); }}
              className="flex items-center justify-center space-x-1.5 bg-[#18181c] hover:bg-gray-800 border border-gray-700 text-gray-200 text-xs font-bold py-2.5 rounded-xl transition"
            >
              <Info className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Details</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1.5 bg-gradient-to-r from-[#d4af37] to-[#e5c158] hover:opacity-90 text-black text-xs font-bold py-2.5 rounded-xl transition shadow-lg"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Inquire</span>
            </a>
          </div>
        </div>
      </div>

      {/* FULL DETAILS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#121215] border border-gray-800 rounded-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-lg font-bold text-[#d4af37] font-serif uppercase tracking-wide">
                {property?.title || 'Property Details'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white bg-slate-900 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-5 text-gray-300 text-sm">
              {/* Image Preview */}
              <div className="relative h-64 sm:h-80 w-full bg-slate-900 rounded-xl overflow-hidden border border-gray-800">
                <img
                  src={images[modalPhotoIndex]}
                  alt="Property Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setModalPhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full border border-gray-700 hover:bg-[#d4af37] hover:text-black transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setModalPhotoIndex((prev) => (prev + 1) % images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full border border-gray-700 hover:bg-[#d4af37] hover:text-black transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#0b0b0e] p-4 rounded-xl border border-gray-800">
                <div>
                  <span className="text-xs text-gray-400 block uppercase">Demand Price</span>
                  <span className="text-base font-bold text-[#d4af37]">₹{property?.price} {property?.priceUnit || ''}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block uppercase">Type</span>
                  <span className="text-sm font-semibold text-white">{property?.propertyType || 'Land'}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block uppercase">Status</span>
                  <span className={`text-sm font-bold ${isSold ? 'text-red-400' : 'text-emerald-400'}`}>
                    {isSold ? 'Sold Out' : 'Available'}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block uppercase">Size / Area</span>
                  <span className="text-sm font-semibold text-white">{property?.size || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block uppercase">Frontage</span>
                  <span className="text-sm font-semibold text-white">{property?.frontage || 'Main Road'}</span>
                </div>
              </div>

              {/* Location Link */}
              <div className="flex items-center justify-between bg-[#0b0b0e] p-3 rounded-xl border border-gray-800">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-[#d4af37]" />
                  <div>
                    <span className="text-xs text-gray-400 block">Location</span>
                    <span className="font-semibold text-white">{property?.location || 'Indore'}</span>
                  </div>
                </div>
                
              </div>

              {/* Description */}
              {property?.description && (
                <div>
                  <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-1">Description</h4>
                  <p className="text-gray-300 leading-relaxed bg-[#0b0b0e] p-3 rounded-xl border border-gray-800/80">
                    {property.description}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-800 bg-[#121215]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#d4af37] to-[#e5c158] text-black font-bold py-2.5 rounded-xl transition text-sm shadow-lg"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyCard;