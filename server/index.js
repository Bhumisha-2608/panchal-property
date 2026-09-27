const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const propertyRoutes = require('./routes/propertyRoutes');

const app = express();

// Explicitly handle CORS preflight for all origins
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  })
);

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