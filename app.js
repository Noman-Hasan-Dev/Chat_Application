const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Path = require('path');
const cookieParser = require('cookie-parser');


// internal imprts
const { notFoundHandler, errorHandler } = require('./midlewares/common/errorHandler')
const app = express();
dotenv.config();

// Default MongoDB connection string if not provided
const mongoConnectionString = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/chat-app';

// Database Connection
mongoose.connect(mongoConnectionString, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
})
.then(() => {
    console.log("Database connected successfully");
    console.log(`Connected to: ${mongoConnectionString}`);
})
.catch((err) => {
    console.error("Database connection error:", err.message);
    console.log("💡 Solutions:");
    console.log("1. Make sure MongoDB is running locally on port 27017");
    console.log("2. Or use MongoDB Atlas cloud database");
    console.log("3. Check your MONGO_CONNECTION_STRING in .env file");
    // Don't exit the process, let the app run without database for now
});

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
    console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('⚠️ Mongoose disconnected');
});

// Request Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'ejs');

// set static folder  
app.use(express.static(Path.join(__dirname, 'public')));

// parse cookies - Fixed: COOKIE_SECRET instead of COOCKIE_SECRET
app.use(cookieParser(process.env.COOKIE_SECRET || 'fallback-secret'));

// Basic route for testing
app.get('/', (req, res) => {
    res.send(`
        <h1>Chat Application</h1>
        <p>Server is running!</p>
        <p>Database status: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected'}</p>
        <p>MongoDB URL: ${mongoConnectionString}</p>
    `);
});

//404 Not Found Handler


//routing setup

//404 Not Found Handler
app.use(notFoundHandler);
// Defalut Error Handler 
app.use(errorHandler);
//error handling
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📱 Visit: http://localhost:${PORT}`);
});