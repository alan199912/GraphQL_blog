const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true },
    isFeatured: { type: Boolean, required: true },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageId: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Post", postSchema);
