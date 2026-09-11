const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(`⏳ Attempting to connect to MongoDB at: ${process.env.MONGO_URI}`);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`✗ Error connecting to MongoDB: ${error.message}`);
    console.error(`   Make sure MongoDB is running on ${process.env.MONGO_URI}`);
    process.exit(1);
  }
};

module.exports = connectDB;
