const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const propertyRoutes = require('./routes/propertyRoutes');

const app = express();

// Custom Manual CORS Middleware (Guarantees headers on all GET, POST, and OPTIONS requests)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware for parsing JSON and Form Data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Database Connected Successfully! 🍃'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// API Routes
app.use('/api/properties', propertyRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Panchal Property API is running...');
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Server Error Log:', err.stack || err.message || err);
  res.header('Access-Control-Allow-Origin', '*');
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});