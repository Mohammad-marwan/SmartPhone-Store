import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.DB) {
      throw new Error("MongoDB URI not found in environment variables");
    }

    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Database connected successfully");

    // optional: log when disconnected
    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ Database disconnected");
    });
  } catch (error) {
    console.error("❌ Error connecting to the database:", error.message);
    process.exit(1); // stop server if DB connection fails
  }
};

export default connectDB;
