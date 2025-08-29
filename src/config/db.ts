import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

async function connectDB() {
  try {
    mongoose.connect(MONGODB_URI)
    console.log("MongoDB connected successfully");
    return mongoose;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to the database");
  }
}

export default connectDB;