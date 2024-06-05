import Hero from "@/components/Hero";
import { Blog } from "@/models/Bog.models";
import { Suspense } from "react";

async function fetchBlog() {
  try {
    const blogs = await Blog.find({});
    return <Hero blogs={JSON.parse(JSON.stringify(blogs))} />;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return <div>Error loading blog posts</div>; // Or a more informative error message
  }
}

export default function Home() {
  return (
    <section className="w-full min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        {" "}
        {/* Loading indicator */}
        {fetchBlog()}
      </Suspense>
    </section>
  );
}
