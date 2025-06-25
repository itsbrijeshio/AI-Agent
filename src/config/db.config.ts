import mongoose from "mongoose";
import envConfig from "./env.config";

const connectDB = async () => {
  try {
    mongoose.connect(envConfig.mongoDb as string);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB ERR:", error);
    process.exit(1);
  }
};

export default connectDB;
