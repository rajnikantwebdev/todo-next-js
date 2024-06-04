import { Schema, models, model } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    owner: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = models.Comment || model("Comment", commentSchema);
