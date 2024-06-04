// its is going to have all the components used on the main page
"use client";
import BlogCard from "./BlogCard";
import AddBlogIcon from "./AddBlogIcon";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

const Hero = () => {
  const [blogs, setBlogs] = useState();
  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/fetchBlog`
      );
      if (response) {
        setBlogs(response?.data?.data);
      }
    } catch (error) {
      throw new Error(error?.message || "Fetching Blog failed");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="flex gap-12 py-8 px-8 flex-wrap">
      <AddBlogIcon />
      {blogs?.map((blog) => {
        return <BlogCard key={blog?._id} data={blog} />;
      })}
    </section>
  );
};

export default Hero;
