import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    const connectionsInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "MongoDb Connected Successfully",
      connectionsInstance.connection.host
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default databaseConnection;
