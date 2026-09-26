const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const propertyRoutes = require('./routes/propertyRoutes');

const app = express();

// Configure CORS middleware (handles regular requests AND preflight OPTIONS automatically)
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
  })
);

// Middleware for parsing JSON and Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
