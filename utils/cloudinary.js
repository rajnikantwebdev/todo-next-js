import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_API_SECRET,
});

const uploadToCloud = async (localPath) => {
  try {
    await cloudinary.uploader.upload_stream(localPath, {
      resource_type: "auto",
    });
  } catch (error) {
    console.log("error while upload to cloudinary", error);
    throw new Error(error?.message || "Error while uploading file");
  }
};

export default uploadToCloud;
