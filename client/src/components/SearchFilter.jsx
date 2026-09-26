import React from 'react';
import { Search, MapPin, Building, RotateCcw } from 'lucide-react';

const SearchFilter = ({ filters, setFilters, resetFilters }) => {
  return (
    <div className="bg-[#121217] border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Flexible Area / Keyword Search */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
            Search Area / Location
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.searchQuery || ''}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="e.g. Vijay Nagar, Super Corridor..."
              className="w-full bg-slate-900 border border-gray-800 rounded-xl p-2.5 pl-9 text-sm text-white outline-none focus:border-[#d4af37]"
            />
            <MapPin className="w-4 h-4 text-[#d4af37] absolute left-3 top-3" />
          </div>
        </div>

        {/* Flexible Property Type Input */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
            Property Type
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.propertyType || ''}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              placeholder="e.g. Plot, Villa, Commercial..."
              className="w-full bg-slate-900 border border-gray-800 rounded-xl p-2.5 pl-9 text-sm text-white outline-none focus:border-[#d4af37]"
            />
            <Building className="w-4 h-4 text-[#d4af37] absolute left-3 top-3" />
          </div>
        </div>

        {/* Max Price Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
            Max Price (₹ Lakhs)
          </label>
          <input
            type="number"
            value={filters.maxPrice || ''}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            placeholder="e.g. 100"
            className="w-full bg-slate-900 border border-gray-800 rounded-xl p-2.5 text-sm text-white outline-none focus:border-[#d4af37]"
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#d4af37] transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;