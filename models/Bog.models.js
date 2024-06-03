import { Schema, model, models } from "mongoose";

const blogSchema = new Schema(
  {
    supaId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = models.Blog || model("Blog", blogSchema);
