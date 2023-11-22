import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToMongoDb = async () => {
  if (isConnected) {
    return console.log("MongoDb is already connected");
  }

  if (!process.env.MONGODB_URL) {
    return console.log("Missing mongodb url");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "stackoverflow",
    });
    console.log("connected to mongodb");

    isConnected = true;
  } catch (error) {
    console.log("error encountered: ", error);
  }
};
