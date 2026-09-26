const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: String, default: '0' },
    priceUnit: { type: String, default: 'Lakh' },
    location: { type: String, default: '' },
    mapLocation: { type: String, default: '' },
    mapLink: { type: String, default: '' },
    size: { type: String, default: '' },
    areaSize: { type: String, default: '' },
    description: { type: String, default: '' },
    propertyType: { type: String, default: 'Plot' },
    
    // Status flags
    isAvailable: { type: Boolean, default: true },
    isSold: { type: Boolean, default: false },
    status: { type: String, enum: ['Available', 'Sold'], default: 'Available' },
    isFeatured: { type: Boolean, default: false },
    
    // Images array
    images: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);