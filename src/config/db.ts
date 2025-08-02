import mongoose from 'mongoose';

// declare global {
//   var mongoose: { 
//     conn: typeof mongoose | null; 
//     promise: Promise<typeof mongoose> | null; 
//   } | undefined;
// }

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// let cached = global.mongoose;

// if (!cached) {  
//   cached = global.mongoose = { conn: null, promise: null };
// }

// const mongooseCache = cached as { 
//   conn: typeof mongoose | null; 
//   promise: Promise<typeof mongoose> | null; 
// };

async function connectDB() {
  // if (mongooseCache.conn) {
  //   return mongooseCache.conn;
  // }

  // if (!mongooseCache.promise) {
  //   mongooseCache.promise = mongoose.connect(MONGODB_URI);
  // }
  // mongooseCache.conn = await mongooseCache.promise;
  // return mongooseCache.conn;
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