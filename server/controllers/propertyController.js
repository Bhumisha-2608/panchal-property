const Property = require('../models/Property');
const { cloudinary } = require('../config/cloudinary');

// GET all properties
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });

    const normalizedData = properties.map((prop) => {
      const doc = prop.toObject();
      let imgList = doc.images || doc.imageUrls || doc.imageUrl || [];
      if (typeof imgList === 'string') imgList = [imgList];

      return {
        ...doc,
        images: imgList,
        isAvailable: doc.isAvailable ?? !doc.isSold,
      };
    });

    res.status(200).json(normalizedData);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const doc = property.toObject();
    let imgList = doc.images || doc.imageUrls || doc.imageUrl || [];
    if (typeof imgList === 'string') imgList = [imgList];

    res.status(200).json({
      success: true,
      data: {
        ...doc,
        images: imgList,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE new property
exports.createProperty = async (req, res) => {
  try {
    let finalImages = [];

    // Parse existing text URLs if sent in body
    if (req.body.images) {
      finalImages = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
    } else if (req.body.imageUrls) {
      finalImages = Array.isArray(req.body.imageUrls)
        ? req.body.imageUrls
        : [req.body.imageUrls];
    }

    // Process files handled by Multer
    if (req.files && req.files.length > 0) {
      const fileUrls = req.files.map((file) => file.path || file.secure_url || file.url);

      // Fallback manual upload if buffer is present (memory storage)
      if (!fileUrls[0] && req.files[0].buffer) {
        const uploadPromises = req.files.map((file) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: 'panchal_properties' },
              (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
              }
            );
            stream.end(file.buffer);
          });
        });
        const uploadedUrls = await Promise.all(uploadPromises);
        finalImages = [...finalImages, ...uploadedUrls];
      } else {
        finalImages = [...finalImages, ...fileUrls];
      }
    }

    const isAvailableVal =
      req.body.isAvailable !== undefined
        ? req.body.isAvailable === 'true' || req.body.isAvailable === true
        : req.body.isSold !== undefined
        ? !(req.body.isSold === 'true' || req.body.isSold === true)
        : true;

    const propertyData = {
      ...req.body,
      title: req.body.title || 'Untitled Property',
      price: req.body.price ? String(req.body.price) : '0',
      priceUnit: req.body.priceUnit || 'Lakh',
      location: req.body.location || '',
      mapLocation: req.body.mapLocation || req.body.mapLink || '',
      mapLink: req.body.mapLink || req.body.mapLocation || '',
      size: req.body.size || req.body.areaSize || '',
      description: req.body.description || '',
      propertyType: req.body.propertyType || 'Plot',
      isAvailable: isAvailableVal,
      isSold: !isAvailableVal,
      status: isAvailableVal ? 'Available' : 'Sold',
      isFeatured: req.body.isFeatured === 'true' || req.body.isFeatured === true,
      images: finalImages,
    };

    const property = await Property.create(propertyData);
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    console.error('CREATE PROPERTY ERROR:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE property
exports.updateProperty = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (
      req.body.isAvailable !== undefined ||
      req.body.isSold !== undefined ||
      req.body.status !== undefined
    ) {
      let isAvailable;

      if (req.body.isAvailable !== undefined) {
        isAvailable = req.body.isAvailable === true || req.body.isAvailable === 'true';
      } else if (req.body.isSold !== undefined) {
        isAvailable = !(req.body.isSold === true || req.body.isSold === 'true');
      } else if (req.body.status !== undefined) {
        isAvailable = req.body.status.toLowerCase() === 'available';
      }

      updateData.isAvailable = isAvailable;
      updateData.isSold = !isAvailable;
      updateData.status = isAvailable ? 'Available' : 'Sold';
    }

    if (req.body.images || req.body.imageUrls) {
      const incomingImages = req.body.images || req.body.imageUrls;
      updateData.images = Array.isArray(incomingImages)
        ? incomingImages
        : [incomingImages];
    }

    // Append newly uploaded images on update if any
    if (req.files && req.files.length > 0) {
      const newUrls = req.files.map((file) => file.path || file.secure_url || file.url);
      updateData.images = [...(updateData.images || []), ...newUrls];
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { returnDocument: 'after', runValidators: false }
    );

    if (!updatedProperty) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.status(200).json({
      success: true,
      data: updatedProperty,
    });
  } catch (error) {
    console.error('UPDATE PROPERTY ERROR:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    res.status(200).json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};