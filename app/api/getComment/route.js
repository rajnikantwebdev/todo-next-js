import { CommentModel } from "@/models/Comments.models";
import { ObjectId } from "bson";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");
  console.log("id", id);
  let blogOjectId;

  try {
    blogOjectId = new ObjectId(id);
  } catch (error) {
    console.log("Invalid ObjectId: ", error);
    return new Response(JSON.stringify({ message: "Invalid user ID" }), {
      status: 400,
    });
  }

  try {
    const data = await CommentModel.find({ blog: blogOjectId });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.log("Error while getting comments ", error);
    throw new Error(error?.message || "Unable to get comments");
  }
}
