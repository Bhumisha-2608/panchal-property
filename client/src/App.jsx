import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import API from './api/axios';
import Admin from './pages/admin';
import PropertyCard from './components/PropertyCard.jsx';
import SearchFilter from './components/SearchFilter.jsx';
import { MessageSquare, Phone } from 'lucide-react';
import Footer from "./components/Footer";

// --- Home Component ---
const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Flexible Search & Filter State
  const [filters, setFilters] = useState({
    searchQuery: '',
    propertyType: '',
    maxPrice: '',
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await API.get('/properties');
        const data = res.data?.data || res.data || [];
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Filter Logic: Matches search query against location & title, property type, and optional max price
  const filteredProperties = properties.filter((prop) => {
    // Location / Title search match
    const matchesSearch = filters.searchQuery
      ? (prop.location || '').toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        (prop.title || '').toLowerCase().includes(filters.searchQuery.toLowerCase())
      : true;

    // Category / Property type search match
    const matchesType = filters.propertyType
      ? (prop.propertyType || '').toLowerCase().includes(filters.propertyType.toLowerCase())
      : true;

    // Max price filter match
    const matchesPrice = filters.maxPrice
      ? Number(prop.price) <= Number(filters.maxPrice)
      : true;

    return matchesSearch && matchesType && matchesPrice;
  });

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      propertyType: '',
      maxPrice: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Header Section */}
      <div className="text-center space-y-4 pt-4">
        {/* Sanskrit Auspicious Badge */}
        <div className="inline-block border border-[#d4af37]/40 px-4 py-1 rounded-full bg-[#121217]">
          <span className="text-[#d4af37] text-sm font-semibold">
            ॐ || श्री गणेशाय नमः ||
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl font-serif font-black text-white tracking-wide uppercase">
          PRIME LAND & PLOTS IN <br />
          <span className="text-[#d4af37]">INDORE</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto font-light">
          <strong className="text-white">Your Property | Our Responsibility</strong> — Buy, Sell & Invest in Agricultural Land, Commercial Parcels, and Residential Plots with complete trust.
        </p>
      </div>

      {/* Flexible Search & Filter Bar Component */}
      <div className="max-w-4xl mx-auto space-y-2">
        <SearchFilter 
          filters={filters} 
          setFilters={setFilters} 
          resetFilters={handleReset} 
        />
        <div className="flex justify-between items-center px-2 text-xs">
          <span className="bg-[#d4af37] text-black px-2.5 py-0.5 rounded font-bold text-[11px]">
            Showing {filteredProperties.length} of {properties.length} properties
          </span>
        </div>
      </div>

      {/* Featured Section Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-serif font-bold text-white tracking-wide uppercase">
          FEATURED PROPERTIES & LAND
        </h2>
        <p className="text-gray-400 text-xs">
          Handpicked prime land parcels available across Indore region
        </p>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12 text-gray-500 text-xs animate-pulse">
            Loading properties...
          </div>
        ) : filteredProperties.length > 0 ? (
          filteredProperties.map((property, idx) => (
            <PropertyCard key={property._id || property.id || idx} property={property} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-[#121217] border border-gray-800 rounded-2xl text-gray-400 text-xs">
            No properties found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

// --- Navbar Component (PANCHAL PROPERTY) ---
const Navbar = () => {
  return (
    <nav className="bg-[#0a0a0c] border-b border-gray-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/logo.jpeg" 
            alt="Panchal Property Logo" 
            className="h-11 w-11 object-cover rounded-full border border-[#d4af37]/50"
          />
          <div>
            <span className="font-serif text-xl font-bold text-[#d4af37] tracking-wider block leading-tight">
              PANCHAL PROPERTY
            </span>
            <span className="text-[10px] text-gray-400 tracking-widest block uppercase">
              LAND CONSULTANT • INDORE
            </span>
          </div>
        </Link>

        {/* Contact Header Buttons */}
        <div className="flex items-center space-x-3">
          
          <a
            href="tel:9685792058"
            className="hidden sm:flex items-center space-x-1.5 border border-gray-800 bg-[#121217] px-4 py-2 rounded-full text-xs text-gray-200 font-semibold hover:border-gray-700"
          >
            <Phone className="h-3.5 w-3.5 text-gray-400" />
            <span>96857-92058</span>
          </a>
          <a
            href="https://wa.me/919685792058"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 bg-[#d4af37] text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-[#e5c158] transition"
          >
            <MessageSquare className="h-3.5 w-3.5 fill-current" />
            <span>WhatsApp Direct</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

// --- Main Root Component ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;