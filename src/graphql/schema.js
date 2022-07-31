const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const {
  usersList,
  user,
  postsList,
  post,
  commentList,
  comment,
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
} = require("./mutations");

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: { usersList, user, postsList, post, commentList, comment },
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
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutatinType,
});
