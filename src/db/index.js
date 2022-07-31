const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/blogdb_graphql");

  console.log("MongoDB connected");
};

module.exports = { connectDB };
