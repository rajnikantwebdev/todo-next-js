"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CommentComponent from "@/components/CommentComponent";
import UserComponent from "@/components/userComponent";

const Page = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [content, setContent] = useState("");
  const [allComments, setAllComments] = useState(null);

  console.log("content: ", content);
  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/fetchBlogWithId?id=${id}`
        );
        if (response.data) {
          setBlog(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    if (id) {
      getBlog();
    }
  }, [id]);

  const addComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/comment?id=${blog?._id}`,
        {
          message: content,
        }
      );

      console.log(response);
    } catch (error) {
      console.log("error while adding comment ", error);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/getComment?id=${blog._id}`
        );
        if (response) {
          setAllComments(response?.data?.data);
        }
      } catch (error) {
        console.error(error?.message || "unable to get comments");
      }
    };

    if (blog?._id) {
      getComments();
    }
  }, [blog?._id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full px-8 py-12">
      <div className="flex items-center gap-8">
        <div className="flex-1 bg-white">
          <Image width={1280} height={720} alt="blog-picture" src={blog.img} />
        </div>
        {blog.video && blog.video !== "" && (
          <div className="flex-1">
            <video width="1280" height="720" controls>
              <source src={blog.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h1 className="text-3xl text-thirdColor font-bold">{blog?.title}</h1>
        <p className="text-lg text-purple-300 mt-4 mb-4">{blog?.description}</p>
        <hr />
        <span className="text-purple-300 text-sm mb-1">{blog?.author}</span>
        <br />
        <span className="text-purple-300 text-sm mb-1">
          {new Date(blog?.createdAt).toLocaleDateString()}
        </span>
      </div>
      <hr />

      <CommentComponent
        setContent={(e) => setContent(e.target.value)}
        content={content}
        data={""}
        onClick={() => addComment()}
      />

      {allComments !== null ? (
        allComments?.map((c) => <UserComponent comment={c} />)
      ) : (
        <p className="text-thirdColor text-lg">No comments</p>
      )}
    </section>
  );
};

export default Page;
