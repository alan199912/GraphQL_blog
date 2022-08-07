const { GraphQLList, GraphQLID } = require("graphql");
const { UserType, PostType, CommentType, imageType } = require("./typedef");
const { User, Post, Comment, Image } = require("../models");

const usersList = {
  type: new GraphQLList(UserType),
  description: "Get users list",
  resolve: async () => await User.find(),
};

const user = {
  type: UserType,
  name: "User",
  description: "Get user by id",
  args: {
    id: { type: GraphQLID },
  },
  id: { type: GraphQLID },
  resolve: (_, { id }) => User.findById(id),
};

const postsList = {
  type: new GraphQLList(PostType),
  description: "Get posts list",
  resolve: async () => await Post.find(),
};

const post = {
  type: PostType,
  name: "Post",
  description: "Get post by id",
  args: {
    id: { type: GraphQLID },
  },
  id: { type: GraphQLID },
  resolve: (_, { id }) => Post.findById(id),
};

const commentList = {
  type: new GraphQLList(CommentType),
  description: "Get comment list",
  resolve: async () => await Comment.find(),
};

const comment = {
  type: CommentType,
  description: "Get comment by id",
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, { id }) => await Comment.findById(id),
};

const imageList = {
  type: new GraphQLList(imageType),
  description: "Get image list",
  resolve: async () => await Image.find(),
};

module.exports = {
  usersList,
  user,
  postsList,
  post,
  commentList,
  comment,
  imageList,
};
