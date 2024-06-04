import { createClient } from "@/utils/supabaseServer";
import { CommentModel } from "@/models/Comments.models";
import { ObjectId } from "bson";

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
    const searchingId = request.nextUrl.searchParams.get("id");

    if (!searchingId) {
      return new Response(JSON.stringify({ message: "Unauthorized access" }), {
        status: 400,
      });
    }

    const owner = data?.user?.id;
    const email = data?.user?.email;
    console.log(typeof owner);
    const currentOwner = owner.toString();
    const blogId = searchingId;
    console.log("blog-id: ", blogId);
    const { message } = await request.json();
    console.log("comment :", message);

    let blogOjectId;
    try {
      blogOjectId = new ObjectId(blogId);
    } catch (error) {
      console.log("Invalid ObjectId: ", error);
      return new Response(JSON.stringify({ message: "Invalid user ID" }), {
        status: 400,
      });
    }

    const comment = await CommentModel.create({
      content: message,
      owner: currentOwner,
      blog: blogOjectId,
      email: email,
    });

    return new Response(JSON.stringify({ comment }), { status: 200 });
  } catch (error) {
    console.log("Comment error: ", error);
    throw new Error(error?.message || "Unable to add comment");
  }
}
