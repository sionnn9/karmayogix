// server/src/config/db.config.mjs
import mongoose from "mongoose";

// Database connection function
const connectDB = async () => {
  try {
    console.log(process.env.DATABASE_URL);
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: "flowguard",
    });

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);

    process.exit(1);
  }
};

export default connectDB;
