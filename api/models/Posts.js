const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tbl_posts", PostSchema);