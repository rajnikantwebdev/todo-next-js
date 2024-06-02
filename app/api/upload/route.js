import uploadToCloud from "@/utils/cloudinary";
import { uploadMiddleware } from "@/middlewares/multer";
import { NextResponse } from "next/server";

// export async function POST(req, res) {
//     uploadMiddleware()
//   try {
//     const FormData = await req.formData();
//     const title = FormData.get("title");
//     const description = FormData.get("description");
//     const img = FormData.get("img");
//     const video = FormData?.get("video");
//     const author = FormData.get("author");

//     console.log(title, description, img, video, author);

//     return Response.json({ FormData });
//   } catch (error) {
//     console.log("Error while uploading the blog...");
//     throw new Error(error?.message || "Something went wrong try again later!");
//   }
// }

export async function POST(request) {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "File upload failed." });
    }

    try {
      const { title, description, author } = req.body;
      const img = req.files?.img ? req.files.img[0] : null;
      const video = req.files?.video ? req.files.video[0] : null;

      let imgUrl = null;
      let videoUrl = null;

      if (img) {
        const imgResult = await uploadToCloud(img.buffer);
        imgUrl = imgResult.secure_url;
      }
      console.log("img: ", img);
      if (video) {
        const videoResult = await uploadToCloud(video.buffer);
        videoUrl = videoResult.secure_url;
      }

      console.log(title, description, imgUrl, videoUrl, author);

      return Response.status(200).json({
        title,
        description,
        imgUrl,
        videoUrl,
        author,
      });
    } catch (error) {
      console.error("Error while uploading the blog...", error);
    }
  });
}
