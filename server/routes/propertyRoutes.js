const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require('../controllers/propertyController');

// GET all properties
router.get('/', getProperties);

// POST create property (Middleware added to handle multi-file uploads)
router.post('/', upload.array('images', 5), createProperty);

// OPTIONAL: Endpoint for direct backend uploads if needed
router.post('/upload', upload.array('images', 5), (req, res) => {
  try {
    const urls = req.files.map((file) => file.path || file.secure_url);
    res.status(200).json({ urls });
  } catch (err) {
    res.status(500).json({ message: 'File upload failed', error: err.message });
  }
});

// GET, PUT, DELETE by ID
router.get('/:id', getPropertyById);
router.put('/:id', upload.array('images', 5), updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;