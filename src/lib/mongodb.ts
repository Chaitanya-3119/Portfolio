import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

export const isDbConfigured = Boolean(
  MONGODB_URI &&
    !MONGODB_URI.includes("your-username") &&
    !MONGODB_URI.includes("your-password") &&
    !MONGODB_URI.includes("<")
);

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  if (!isDbConfigured) {
    throw new Error(
      "MongoDB URI is not configured or contains placeholder credentials."
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
