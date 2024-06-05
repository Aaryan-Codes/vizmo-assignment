const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    images: [
      {
        url: {
          type: String,
        },
        caption: {
          type: String,
        },
        altText: {
          type: String,
        },
      },
    ],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blogs", blogSchema);
module.exports = Blog;
