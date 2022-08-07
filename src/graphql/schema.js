const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const {
  usersList,
  user,
  postsList,
  post,
  commentList,
  comment,
  imageList,
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
} = require("./mutations");

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: { usersList, user, postsList, post, commentList, comment, imageList },
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
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutatinType,
});
