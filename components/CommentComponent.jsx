import React from "react";

const CommentComponent = ({ content, data, setContent, onClick }) => {
  return (
    <section class="py-8 lg:py-16 antialiased">
      <div class="max-w-2xl px-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion (20)
          </h2>
        </div>
        <form class="mb-6">
          <div class="py-2 px-4 mb-4 rounded-lg rounded-t-lg border bg-secondColor">
            <label for="comment" class="sr-only">
              Your comment
            </label>
            <textarea
              value={content}
              onChange={setContent}
              id="comment"
              rows="4"
              class="px-0 w-full text-sm  focus:ring-0 focus:outline-none text-thirdColor bg-secondColor"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            disabled={content === ""}
            onClick={onClick}
            type="button"
            class="text-white bg-thirdColor px-2 py-1"
          >
            Post comment
          </button>
        </form>
      </div>
    </section>
  );
};

export default CommentComponent;
