const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const {
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
} = require("./queries");

const {
  register,
  login,
  createPost,
  updatePost,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
  createImage,
  createAvatar,
  updateUser,
  createCategory,
} = require("./mutations");

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
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
  },
});

const MutatinType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {
    register,
    login,
    createPost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment,
    createImage,
    createAvatar,
    updateUser,
    createCategory,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutatinType,
});
