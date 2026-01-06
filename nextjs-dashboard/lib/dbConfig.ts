'use server'

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development and across serverless function invocations.
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connect() {
    // 1. If we have a cached connection, return it immediately
    if (cached.conn) {
        return cached.conn;
    }

    // 2. If no connection promise exists, start the connection process
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Prevents hanging if the DB is down
        };

        console.log('--- Establishing New MongoDB Connection ---');
        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        // 3. Await the promise (either the new one or the existing one)
        cached.conn = await cached.promise;
    } catch (e) {
        // If connection fails, clear the promise so the next attempt can try again
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connect;