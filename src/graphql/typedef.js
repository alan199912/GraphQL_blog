const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const { User, Post, Comment, Image, Avatar, Category } = require("../models");

const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "typed for the user model",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
    bio: { type: GraphQLString },
    avatar: {
      type: AvatarType,
      resolve: (parent) => Avatar.findById(parent.avatarId),
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: "PostType",
  description: "typed for the post model",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    slug: { type: GraphQLString },
    featuredImage: {
      type: imageType,
      resolve: (parent) => Image.findById(parent.imageId),
    },
    author: {
      type: UserType,
      resolve: (parent) => User.findById(parent.authorId),
    },
    comment: {
      type: new GraphQLList(CommentType),
      resolve: (parent) => Comment.find({ postId: parent._id }),
    },
    category: {
      type: CategoryType,
      resolve: (parent) => Category.findById(parent.categoryId),
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  description: "typed for the comment model",
  fields: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: (parent) => User.findById(parent.userId),
    },
    post: {
      type: PostType,
      resolve: (parent) => Post.findById(parent.postId),
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

const imageType = new GraphQLObjectType({
  name: "imageType",
  description: "typed for the image model",
  fields: {
    id: { type: GraphQLID },
    url: { type: GraphQLString },
    post: {
      type: PostType,
      resolve: (parent) => Post.findById(parent.postId),
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

const AvatarType = new GraphQLObjectType({
  name: "AvatarType",
  description: "typed for the image model",
  fields: {
    id: { type: GraphQLID },
    url: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: (parent) => User.findById(parent.userId),
    },
  },
});

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  description: "typed for the category model",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
  },
});

module.exports = {
  UserType,
  PostType,
  CommentType,
  imageType,
  AvatarType,
  CategoryType,
};
