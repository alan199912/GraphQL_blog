const { Schema, model } = require("mongoose");

const imageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Image", imageSchema);
