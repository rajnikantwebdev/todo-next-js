import { Blog } from "@/models/Bog.models";

export async function GET(request) {
  try {
    const data = await Blog.find({});
    return new Response(JSON.stringify({ data }), {
      status: 200,
    });
  } catch (error) {
    console.log("Error while fetching data ", error);
    throw new Error(error?.message || "Fetching failed");
  }
}
