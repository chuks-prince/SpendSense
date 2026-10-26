const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
// 1. OPTIMIZED CORS LAYER (Allows both local testing and live web clients)
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 2. ROOT DISCOVERY PATH (Clears the "Cannot GET /" screen)
app.get('/', (req, res) => {
  res.json({ status: "Online", message: "SpendSense API is running perfectly!" });
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/waitlistDB';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema & Model for Waitlist
const waitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

const WaitlistUser = mongoose.model('WaitlistUser', waitlistSchema);

// API Route: Handle Waitlist Form Submission
app.post('/api/waitlist', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    // Check if email already registered
    const existingUser = await WaitlistUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'This email is already on the waitlist!' });
    }

    // Save new user
    const newUser = new WaitlistUser({ email });
    await newUser.save();

    res.status(201).json({ message: 'Success! You have been added to the waitlist.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
