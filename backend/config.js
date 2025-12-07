const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Atlas connection string
// Format: mongodb+srv://<username>:<password>@cluster0.7zkzf.mongodb.net/<database>?retryWrites=true&w=majority&appName=Cluster0
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/webapp';

const connectDB = () => {
  console.log('Attempting to connect to MongoDB Atlas...');
  console.log('MongoDB URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@')); // Hide password
  
  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    socketTimeoutMS: 45000, // 45 seconds socket timeout
    retryWrites: true,
    w: 'majority'
  })
  .then(() => {
    console.log('MongoDB connected successfully');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Host:', mongoose.connection.host);
    console.log('Cluster:', mongoose.connection.host.includes('cluster0') ? 'Cluster0' : 'Unknown');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('Server will continue without MongoDB connection');
    console.log('Please check:');
    console.log('   1. MongoDB Atlas Network Access (IP whitelist - allow 0.0.0.0/0 for testing)');
    console.log('   2. MongoDB Atlas Database User credentials');
    console.log('   3. MongoDB URI in .env file');
    console.log('   4. Internet connection');
    // Don't exit - allow server to run without DB
  });
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = connectDB;
