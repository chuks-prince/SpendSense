const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

// Standard user schema model fallback layout embedded directly to avoid import drops
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Main Root Discovery Verification Route
app.get('/', (req, res) => {
  res.json({ status: "Online", message: "SpendSense API is running perfectly!" });
});

// --- PRODUCTION USER REGISTRATION GATEWAY ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    res.status(500).json({ error: 'Server registration error' });
  }
});

// Connect directly to variable process contexts
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/waitlistDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Active on port ${PORT}`));
