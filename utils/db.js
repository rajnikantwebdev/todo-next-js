import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE);
    console.log("MongoDb connected!!");
  } catch (error) {
    console.log("Error while connecting: ", error);
  }
};

export default connectDb;
