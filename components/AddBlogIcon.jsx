import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getUserSession } from "@/utils/getSessoin";

const AddBlogIcon = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    const getUser = async () => {
      const data = await getUserSession();
      setToken(data?.token);
    };
    getUser();
  }, []);

  return (
    <Link
      href={token ? "/createBlog" : "/login"}
      className="fixed bottom-10 right-10 bg-thirdColor rounded-full p-3 cursor-pointer hover:drop-shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-8"
      >
        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
      </svg>
    </Link>
  );
};

export default AddBlogIcon;
