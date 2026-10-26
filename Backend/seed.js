const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 1. Re-use the exact same schema structure your server uses
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// 2. Paste your direct database connection string details here
const DB_USER = "igwebuikechukwunweike_db_user"; 
const DB_PASS = encodeURIComponent("nevergiveup123"); 
const DB_CLUSTER = "cluster0.ogkavmj.mongodb.net"; // Double check that this matches your actual cluster address string

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}/waitlistDB?retryWrites=true&w=majority`;

async function seedUser() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB Atlas...');

    // Clean up any existing duplicate testing entry first
    await User.deleteOne({ email: 'igwebuikechukwunweike@gmail.com' });

    // Hashing the password exactly how bcrypt handles it during standard registration
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456789', salt);

    const defaultUser = new User({
      name: 'Chuks Admin',
      email: 'igwebuikechukwunweike@gmail.com',
      password: hashedPassword
    });

    await defaultUser.save();
    console.log('🚀 Success! Your account credentials have been securely inserted straight into your database cluster.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed. Check your DB_CLUSTER string or password credentials:', err);
    process.exit(1);
  }
}

seedUser();
