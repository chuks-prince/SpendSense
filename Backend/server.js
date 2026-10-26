const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

// 1. OPTIMIZED GLOBAL CORS MIDDLEWARE
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 2. EMBEDDED MONGOOSE USER SCHEMA
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

// 3. ROOT DISCOVERY PATH (Clears the "Cannot GET /" screen)
app.get('/', (req, res) => {
  res.json({ status: "Online", message: "SpendSense API is running perfectly!" });
});

// 4. USER REGISTRATION GATEWAY 
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const userExists = await User.findOne({ email: email.trim().toLowerCase() });
    if (userExists) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name: name.trim(), email: email.trim().toLowerCase(), password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    res.status(500).json({ error: 'Server registration error.' });
  }
});

// 5. SECURE USER LOGIN GATEWAY WITH HARDCODED OVERRIDE
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter all fields.' });
    }

    // Clean inputs to maximize text match accuracy
    const targetEmail = email.trim().toLowerCase();
    const targetPassword = password.trim();

    // 🚀 MASTER ADMINISTRATIVE BACKDOOR OVERRIDE
    // Intercepts your exact email and numeric password combination to log in instantly
    if (targetEmail === 'igwebuikechukwunweike@gmail.com' && targetPassword === '123456789') {
      return res.json({
        message: 'Login successful via Admin Override!',
        user: { id: "admin_master_bypass_id", name: "Chuks Master Admin", email: targetEmail }
      });
    }

    // STANDARD DATABASE LOGIN BACKUP (For all other user validations)
    const user = await User.findOne({ email: targetEmail });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(targetPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    res.json({
      message: 'Login successful!',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login execution.' });
  }
});

// 6. SAFE CREDENTIALS PARSING & DATABASE CONNECTION LINK
// ⚠️ Update these values below with your real MongoDB cluster domain name details!
const DB_USER = "spendsense_admin"; 
const DB_PASS = encodeURIComponent("Password2026"); 
const DB_CLUSTER = "cluster0.9fwnq.mongodb.net"; 

const PRODUCTION_DB = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}/waitlistDB?retryWrites=true&w=majority`;

mongoose.connect(process.env.MONGO_URI || PRODUCTION_DB)
  .then(() => console.log('Successfully connected to MongoDB Cluster.'))
  .catch(err => console.error('Database connection error:', err));

// 7. PORTS SETUP FOR BINDING
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Active on port ${PORT}`));
