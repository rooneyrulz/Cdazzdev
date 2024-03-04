import mongoose from "mongoose";

const connect = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
    console.log("Mongo connection successfully established.");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error?.message);
    process.exit(1);
  }
};

export default connect;
