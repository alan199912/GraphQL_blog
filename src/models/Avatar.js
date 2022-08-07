const { Schema, model } = require("mongoose");

const avatarSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Avatar", avatarSchema);
