import React from "react";

const UserComponent = ({ comment }) => {
  return (
    <article class="max-w-2xl px-4 py-4 text-base bg-secondColor">
      <footer class="flex justify-between items-center mb-2">
        <div class="flex items-center">
          <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            {comment?.email || "Unknown User"}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            <time pubdate datetime="2022-02-08" title="February 8th, 2022">
              {new Date(comment?.createdAt).toLocaleDateString()}
            </time>
          </p>
        </div>
      </footer>
      <p class="text-gray-500 dark:text-gray-400">{comment?.content}</p>
    </article>
  );
};

export default UserComponent;
