import { Blog } from "@/models/Bog.models";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const searchingId = request.nextUrl.searchParams.get("id");
    const data = await Blog.findById(searchingId);
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.log("Unable to fetch Blog", error);
    throw new Error(error?.message || "Unable to fetch blog try again later");
  }
}
