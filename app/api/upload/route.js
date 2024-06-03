import uploadToCloud from "@/utils/cloudinary";
import { supabase } from "@/utils/supabase";
import { Blog } from "@/models/Bog.models";
import Cookies from "js-cookie";
import { createClient } from "@/utils/supabaseServer";

export async function POST(request) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log("error in access_token: ", error);
      return new Response(JSON.stringify({ message: "Unauthorized access" }), {
        status: 400,
      });
    }

    const supaId = data?.user?.id;
    const FormData = await request.formData();
    const title = FormData.get("title");
    const description = FormData.get("description");
    const img = FormData.get("img");
    const video = FormData?.get("video") || null;
    const author = FormData.get("author");

    if ([title, description, author].some((value) => value.trim() === "")) {
      throw new Error("All fields are required");
    }

    if (!img) {
      throw new Error("Image file is required");
    }
    const imgBuffer = await img.arrayBuffer();

    let videoBuffer;
    let videoCloudBuffer;
    let uploadVideo;

    if (video !== null) {
      videoBuffer = await video.arrayBuffer();
      videoCloudBuffer = new Uint8Array(videoBuffer);
      uploadVideo = await uploadToCloud(videoCloudBuffer);
    }

    const buffer = new Uint8Array(imgBuffer);
    const uploadImage = await uploadToCloud(buffer);

    const blogData = await Blog.create({
      supaId: supaId,
      title: title,
      description: description,
      img: uploadImage,
      video: uploadVideo || "",
      author: author,
    });

    return new Response(JSON.stringify({ blogData }), {
      status: 200,
    });
  } catch (error) {
    console.log("Error while uploading the blog...", error);
    throw new Error(error?.message || "Something went wrong try again later!");
  }
}
