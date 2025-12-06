// File: lib/mongodb.ts

import mongoose, { Schema, Document } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/boutique';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// 1. Define the Mongoose Cache structure for global storage
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 2. Define the global variable type for TypeScript
declare global {
  var mongoose: MongooseCache | undefined;
}

// 3. Initialize cached connection or retrieve existing global cache
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Connects to MongoDB, reusing the cached connection if available.
 * @returns {Promise<typeof mongoose>} The Mongoose connection instance.
 */
async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    // Use the existing database connection
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Recommended for serverless environments
    };

    // Start a new connection promise
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Await the connection promise and store the resolved connection
    cached.conn = await cached.promise;
  } catch (e) {
    // Clear the promise if connection fails to allow retries on the next request
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;