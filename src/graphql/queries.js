const { GraphQLList, GraphQLID, GraphQLString } = require("graphql");
const {
  UserType,
  PostType,
  CommentType,
  imageType,
  CategoryType,
} = require("./typedef");
const { User, Post, Comment, Image, Category } = require("../models");

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

const getRecentPosts = {
  type: new GraphQLList(PostType),
  name: "Post",
  description: "Get post details by orderBy asc and last",
  args: {
    orderBy: { type: GraphQLString },
    last: { type: GraphQLString },
  },
  id: { type: GraphQLID },
  resolve: (_, { orderBy, last }) =>
    Post.find().sort({ createdAt: orderBy }).limit(last),
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
  args: {
    slug: { type: GraphQLString },
  },
  resolve: async (_, { slug }) => {
    const post = await Post.findOne({ slug });
    return await Comment.find({ postId: post._id });
  },
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
  resolve: async () => await Image.fi,
};

const categoryList = {
  type: new GraphQLList(CategoryType),
  description: "Get categories list",
  resolve: async () => await Category.find(),
};

const postBySlug = {
  type: PostType,
  description: "Get post by slug",
  args: {
    slug: { type: GraphQLString },
  },
  resolve: async (_, { slug }) => await Post.findOne({ slug }),
};

const getSimilarPosts = {
  type: new GraphQLList(PostType),
  description: "Get similar posts",
  args: {
    slug: { type: GraphQLString },
  },
  resolve: async (_, { slug }) => {
    return await Post.find({ slug: { $ne: slug } });
  },
};

const getFeaturedPosts = {
  type: new GraphQLList(PostType),
  description: "Get featured posts",
  resolve: async () => await Post.find({ isFeatured: true }),
};

const getPostsByCategory = {
  type: new GraphQLList(PostType),
  description: "Get posts by category",
  args: {
    slug: { type: GraphQLString },
  },
  resolve: async (_, { slug }) => {
    const category = await Category.findOne({ slug });
    return await Post.find({ categoryId: category._id });
  },
};

module.exports = {
  usersList,
  user,
  postsList,
  post,
  commentList,
  comment,
  imageList,
  getRecentPosts,
  categoryList,
  postBySlug,
  getSimilarPosts,
  getFeaturedPosts,
  getPostsByCategory,
};
