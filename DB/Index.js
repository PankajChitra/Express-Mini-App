import mongoose from "mongoose";

import {DB_NAME} from "../../config.js";

const connectDB = async () => {
    try {
        const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MongoDB connected !! DB Host : ${connectioninstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

export default connectDB;