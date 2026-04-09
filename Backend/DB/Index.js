import mongoose from "mongoose";

import {DB_NAME} from "../config.js";

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error('Missing MongoDB connection string. Set MONGODB_URI or MONGO_URI.');
        }

        const connectioninstance = await mongoose.connect(mongoUri);
        console.log(`MongoDB connected !! DB Host : ${connectioninstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

export default connectDB;