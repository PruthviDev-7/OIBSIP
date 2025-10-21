import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log('Admin user already exists:', adminEmail);
      process.exit(0);
    }

    const admin = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: adminEmail,
      password: process.env.SEED_ADMIN_PASSWORD || 'Admin@123',
      phone: process.env.SEED_ADMIN_PHONE || '0123456789',
      address: {
        street: 'Admin St',
        city: 'City',
        state: 'State',
        zipCode: '00000'
      },
      role: 'admin',
      isVerified: true
    });

    await admin.save();
    console.log('Admin user created:', adminEmail);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
