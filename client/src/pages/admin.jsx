import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { 
  Lock, 
  LogOut, 
  Trash2, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  X, 
  MapPin, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Globe,
  Search
} from 'lucide-react';

const Admin = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Admin Credentials
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "panchal123";

  // Form, Listings & Search State
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    priceUnit: 'Lakh',
    location: '',
    mapLocation: '',
    size: '',
    frontage: '',
    propertyType: 'Agricultural Land',
    description: '',
    isAvailable: true,
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Admin Preview Modal State
  const [previewProperty, setPreviewProperty] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const session = localStorage.getItem('panchal_admin_auth');
    if (session === 'true') {
      setIsAuthenticated(true);
      fetchProperties();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === ADMIN_USER && loginForm.password === ADMIN_PASS) {
      setIsAuthenticated(true);
      localStorage.setItem('panchal_admin_auth', 'true');
      setLoginError('');
      fetchProperties();
    } else {
      setLoginError('Invalid Username or Password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('panchal_admin_auth');
  };

  const fetchProperties = async () => {
    try {
      const res = await API.get('/properties');
      const data = res.data?.data || res.data || [];
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load properties', err);
    }
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const combined = [...selectedFiles, ...newFiles];

    if (combined.length > 5) {
      alert('You can select up to 5 images max.');
      setSelectedFiles(combined.slice(0, 5));
      return;
    }
    setSelectedFiles(combined);
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadData = new FormData();

      Object.keys(formData).forEach((key) => {
        uploadData.append(key, formData[key]);
      });

      selectedFiles.forEach((file) => {
        uploadData.append('images', file);
      });

      await API.post('/properties', uploadData, {
        headers: { 
          'Content-Type': 'multipart/form-data' 
        }
      });

      alert('Property Added Successfully!');
      setFormData({
        title: '',
        price: '',
        priceUnit: 'Lakh',
        location: '',
        mapLocation: '',
        size: '',
        frontage: '',
        propertyType: 'Agricultural Land',
        description: '',
        isAvailable: true,
      });
      setSelectedFiles([]);
      fetchProperties();
    } catch (err) {
      console.error('Publish error:', err);
      alert(`Failed to publish property: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await API.patch(`/properties/${id}`, { isAvailable: !currentStatus });
      fetchProperties();
    } catch (err) {
      try {
        await API.put(`/properties/${id}`, { isAvailable: !currentStatus });
        fetchProperties();
      } catch (fallbackErr) {
        alert('Failed to update property status');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await API.delete(`/properties/${id}`);
      fetchProperties();
    } catch (err) {
      console.error(err);
      alert('Failed to delete property');
    }
  };

  // Filter listings based on single search bar query
  const filteredProperties = properties.filter((prop) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      prop.title?.toLowerCase().includes(query) ||
      prop.location?.toLowerCase().includes(query) ||
      prop.propertyType?.toLowerCase().includes(query) ||
      prop.price?.toString().toLowerCase().includes(query) ||
      prop.priceUnit?.toLowerCase().includes(query) ||
      prop.size?.toLowerCase().includes(query) ||
      prop.frontage?.toLowerCase().includes(query) ||
      prop.description?.toLowerCase().includes(query)
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-[#121215] border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-[#d4af37]/10 rounded-full border border-[#d4af37]/30 text-[#d4af37] mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white font-serif uppercase tracking-wide">Admin Portal Login</h2>
            <p className="text-xs text-gray-400">Enter credentials to manage Panchal Property listings</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Username</label>
              <input
                type="text"
                required
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                placeholder="Enter username"
                className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl p-3 text-sm text-white outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Password</label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Enter password"
                className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl p-3 text-sm text-white outline-none focus:border-[#d4af37]"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 font-semibold text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#e5c158] text-black font-bold py-3 rounded-xl transition shadow-lg text-sm"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* --- Top Header with Navigation & Logout --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-800 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#d4af37] font-serif uppercase">Admin Control Panel</h1>
          <p className="text-xs text-gray-400">Add, edit, view internal locations, or toggle listings</p>
        </div>
        
        {/* Header Action Buttons */}
        <div className="flex items-center space-x-2.5">
          <Link
            to="/"
            className="flex items-center space-x-1.5 text-xs bg-[#1a1a20] border border-gray-700 text-gray-200 hover:border-[#d4af37] hover:text-[#d4af37] px-3 py-2 rounded-xl transition font-semibold"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Go to Main Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 text-xs bg-red-950/80 border border-red-800 text-red-300 hover:bg-red-900 px-3 py-2 rounded-xl transition font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Add New Listing Form */}
      <form onSubmit={handleSubmit} className="bg-[#121215] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <h2 className="text-base font-bold text-white uppercase border-b border-gray-800 pb-2">Add New Property Listing</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Property Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. 10 Bigha Prime Land"
              className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-[#d4af37] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Property Type</label>
            <select
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-[#d4af37] outline-none"
            >
              <option>Agricultural Land</option>
              <option>Residential Plot</option>
              <option>Commercial Land</option>
              <option>Industrial Plot</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Demand Price *</label>
            <div className="flex space-x-2">
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. 45"
                className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-[#d4af37] outline-none"
              />
              <input
                type="text"
                value={formData.priceUnit}
                onChange={(e) => setFormData({ ...formData, priceUnit: e.target.value })}
                placeholder="Lakhs / Bigha"
                className="w-32 bg-[#0a0a0c] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-[#d4af37] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Location / Area *</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Gram Ramvasa, Highway Touch"
              className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-[#d4af37] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Frontage / Road Touch</label>
            <input
              type="text"
              value={formData.frontage}
              onChange={(e) => setFormData({ ...formData, frontage: e.target.value })}
              placeholder="e.g. 200 Ft. Main Road Touch / 150 Ft. Front"
              className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-[#d4af37] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Size / Area</label>
            <input
              type="text"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              placeholder="e.g. 10 Bigha / 1500 Sq. Ft."
              className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-[#d4af37] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Google Maps Link (Admin Only)</label>
            <input
              type="text"
              value={formData.mapLocation}
              onChange={(e) => setFormData({ ...formData, mapLocation: e.target.value })}
              placeholder="https://maps.google.com/..."
              className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-[#d4af37] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Availability Status</label>
            <select
              value={formData.isAvailable ? "true" : "false"}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.value === "true" })}
              className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-[#d4af37] outline-none"
            >
              <option value="true">Available</option>
              <option value="false">Sold Out</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs text-gray-400 uppercase">Browse & Upload Images (Up to 5)</label>
          <div className="relative border-2 border-dashed border-gray-800 hover:border-[#d4af37]/50 rounded-xl p-4 text-center cursor-pointer bg-[#0a0a0c] transition">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center space-y-1">
              <Upload className="w-6 h-6 text-[#d4af37]" />
              <span className="text-xs text-gray-300 font-semibold">Click to browse or drag photos here</span>
              <span className="text-[10px] text-gray-500">
                {selectedFiles.length > 0 ? `${selectedFiles.length} file(s) selected` : 'Select up to 5 property images'}
              </span>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedFiles.map((file, i) => (
                <span key={i} className="inline-flex items-center space-x-1.5 text-[11px] bg-[#1a1a20] border border-gray-800 text-gray-200 px-2.5 py-1 rounded-lg">
                  <span className="truncate max-w-[120px]">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="text-gray-400 hover:text-red-400 transition ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs text-gray-400 uppercase mb-1">Description / Notes</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Key highlights, connectivity, title status..."
            className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-[#d4af37] outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#d4af37] to-[#e5c158] text-black font-bold py-3 rounded-xl transition text-sm shadow-lg"
        >
          {loading ? 'Publishing Listing...' : 'Publish Property Listing'}
        </button>
      </form>

      {/* --- Existing Listings Section --- */}
      <div className="bg-[#121215] border border-gray-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800/80 pb-4">
          <h2 className="text-base font-bold text-white uppercase">
            Existing Listings ({filteredProperties.length} / {properties.length})
          </h2>

          {/* Single Universal Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, area, price, type..."
              className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white focus:border-[#d4af37] outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((prop) => {
              const isAvailable = prop.isAvailable !== false && prop.isSold !== true && prop.status !== 'Sold';

              return (
                <div key={prop._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#0a0a0c] border border-gray-800 p-4 rounded-xl gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-white">{prop.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                        isAvailable ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
                      }`}>
                        {isAvailable ? 'Available' : 'Sold Out'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{prop.location} • ₹{prop.price} {prop.priceUnit}</p>

                    {/* Admin Google Maps Link */}
                    {prop.mapLocation && (
                      <a
                        href={prop.mapLocation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[11px] text-[#d4af37] hover:underline font-semibold"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>Open Admin Map Location</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end flex-wrap gap-y-2">
                    <button
                      onClick={() => {
                        setPreviewProperty(prop);
                        setActiveImageIndex(0);
                      }}
                      className="bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Admin Card Preview</span>
                    </button>

                    <button
                      onClick={() => handleToggleStatus(prop._id, isAvailable)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-semibold flex items-center space-x-1.5 transition ${
                        isAvailable 
                          ? 'bg-amber-950/60 border-amber-800 text-amber-300 hover:bg-amber-900' 
                          : 'bg-emerald-950/60 border-emerald-800 text-emerald-300 hover:bg-emerald-900'
                      }`}
                    >
                      {isAvailable ? (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Mark Sold</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Available</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(prop._id)}
                      className="bg-red-950/80 border border-red-800 text-red-300 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-xs text-gray-500 border border-dashed border-gray-800 rounded-xl">
              No listings matched your search "{searchQuery}".
            </div>
          )}
        </div>
      </div>

      {/* --- ADMIN PROPERTY CARD PREVIEW MODAL --- */}
      {previewProperty && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121215] border border-gray-800 rounded-2xl max-w-lg w-full p-6 space-y-4 relative shadow-2xl">
            <button
              onClick={() => setPreviewProperty(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-gray-900 border border-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
              Admin Internal Property Card
            </div>

            {/* Image Slider */}
            {previewProperty.images && previewProperty.images.length > 0 ? (
              <div className="relative h-52 bg-black rounded-xl overflow-hidden border border-gray-800">
                <img
                  src={previewProperty.images[activeImageIndex]}
                  alt="Property"
                  className="w-full h-full object-cover"
                />
                {previewProperty.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev === 0 ? previewProperty.images.length - 1 : prev - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 rounded-full text-white hover:bg-black"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev === previewProperty.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 rounded-full text-white hover:bg-black"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="h-40 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center text-xs text-gray-500">
                No Images Uploaded
              </div>
            )}

            {/* Property Details */}
            <div className="space-y-2 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{previewProperty.title}</h3>
                  <p className="text-xs text-gray-400">{previewProperty.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-extrabold text-[#d4af37]">₹{previewProperty.price} {previewProperty.priceUnit}</p>
                  <p className="text-[10px] text-gray-400">{previewProperty.size}</p>
                </div>
              </div>

              {previewProperty.frontage && (
                <div className="text-xs text-amber-300 font-semibold bg-[#1a1810] border border-amber-900/50 px-3 py-1.5 rounded-lg">
                  Frontage: {previewProperty.frontage}
                </div>
              )}

              {previewProperty.description && (
                <p className="text-xs text-gray-300 bg-[#0a0a0c] p-3 rounded-xl border border-gray-800">
                  {previewProperty.description}
                </p>
              )}

              {previewProperty.mapLocation ? (
                <a
                  href={previewProperty.mapLocation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center space-x-2 w-full py-2.5 bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#d4af37] font-semibold text-xs rounded-xl hover:bg-[#d4af37]/20 transition"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open Hidden Admin Map Link</span>
                </a>
              ) : (
                <div className="text-[11px] text-gray-500 italic pt-1">
                  No Google Maps link provided for this listing.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;