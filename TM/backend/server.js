const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import models to sync database
const User = require('./models/User');
const Task = require('./models/Task');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Sync database models
const syncDatabase = async () => {
  try {
    await User.sync({ alter: true });
    await Task.sync({ alter: true });
    console.log('Database models synchronized');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

