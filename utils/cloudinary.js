import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_API_SECRET,
});

const uploadToCloud = async (localPath) => {
  try {
    return await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          if (result) {
            resolve(result?.url);
          }
        })
        .end(localPath);
    });
  } catch (error) {
    console.log("error while upload to cloudinary", error);
    throw new Error(error?.message || "Error while uploading file");
  }
};

export default uploadToCloud;
