const { GraphQLString, GraphQLID } = require("graphql");
const { User, Post, Comment, Image, Avatar } = require("../models");
const { createJWTToken } = require("../util/auth");
const {
  PostType,
  CommentType,
  imageType,
  AvatarType,
  UserType,
} = require("./typedef");

const register = {
  type: GraphQLString,
  description: "Register a new user",
  args: {
    username: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    displayName: {
      type: GraphQLString,
    },
  },
  async resolve(_, args) {
    const { username, email, password, displayName } = args;

    const user = await new User({
      username,
      email,
      password,
      displayName,
    });
    await user.save();

    return "Register a new user";
  },
};

const login = {
  type: GraphQLString,
  description: "Login user",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, args) {
    const user = await User.findOne({ email: args.email }).select("+password");

    if (!user || args.password !== user.password) {
      throw new Error("Invalid credentials");
    }

    const token = createJWTToken({
      _id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
    });

    return token;
  },
};

const updateUser = {
  type: UserType,
  description: "Update a user",
  args: {
    id: { type: GraphQLID },
    username: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    displayName: {
      type: GraphQLString,
    },
    bio: {
      type: GraphQLString,
    },
    avatarId: {
      type: GraphQLID,
    },
  },
  async resolve(
    _,
    { id, username, email, password, displayName, bio, avatarId },
    { verifyUser }
  ) {
    // if (!verifyUser) {
    //   throw new Error("Unauthorized access");
    // }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        username,
        email,
        password,
        displayName,
        bio,
        avatarId,
      },
      { new: true, runValidators: true }
    );

    return updatedUser;
  },
};

const createPost = {
  type: PostType,
  description: "Create a new post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  resolve: async (_, args, { verifyUser }) => {
    if (!verifyUser) {
      throw new Error("Unauthorized access");
    }

    const newPost = new Post({
      title: args.title,
      body: args.body,
      slug: args.slug,
      authorId: verifyUser._id,
    });

    const post = await newPost.save();

    return post;
  },
};

const updatePost = {
  type: PostType,
  description: "Update a post",
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  resolve: async (_, { id, title, body, slug }, { verifyUser }) => {
    if (!verifyUser) {
      throw new Error("Unauthorized access");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id, authorId: verifyUser._id },
      { title, body, slug },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      throw new Error("Post dont found");
    }

    return updatedPost;
  },
};

const deletePost = {
  type: GraphQLString,
  description: "Delete a post",
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, { id }, { verifyUser }) => {
    if (!verifyUser) {
      throw new Error("Unauthorized access");
    }

    const deletedPost = await Post.findByIdAndDelete({
      _id: id,
      authorId: verifyUser._id,
    });

    if (!deletedPost) {
      throw new Error("Post not found");
    }

    return "Post deleted successfully";
  },
};

const createComment = {
  type: CommentType,
  description: "Create a new comment",
  args: {
    postId: { type: GraphQLID },
    comment: { type: GraphQLString },
  },
  resolve: async (_, { comment, postId }, { verifyUser }) => {
    if (!verifyUser) {
      throw new Error("Unauthorized access");
    }

    const newComment = new Comment({
      comment,
      postId,
      userId: verifyUser._id,
    });

    const commentSaved = await newComment.save();

    return commentSaved;
  },
};

const updateComment = {
  type: CommentType,
  description: "Update a comment",
  args: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
  },
  resolve: async (_, { id, comment }, { verifyUser }) => {
    if (!verifyUser) {
      throw new Error("Unauthorized access");
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      { _id: id, userId: verifyUser._id },
      { comment },
      { new: true, runValidators: true }
    );

    if (!updatedComment) {
      throw new Error("Comment dont found");
    }

    return updatedComment;
  },
};

const deleteComment = {
  type: GraphQLString,
  description: "Delete a comment",
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, { id }, { verifyUser }) => {
    if (!verifyUser) {
      throw new Error("Unauthorized access");
    }

    const deletedPost = await Comment.findByIdAndDelete({
      _id: id,
      userId: verifyUser._id,
    });

    if (!deletedPost) {
      throw new Error("Comment not found");
    }

    return "Comment deleted successfully";
  },
};

const createImage = {
  type: imageType,
  description: "Create a new image",
  args: {
    postId: { type: GraphQLID },
    url: { type: GraphQLString },
  },
  resolve: async (_, { url, postId }, { verifyUser }) => {
    // if (!verifyUser) {
    //   throw new Error("Unauthorized access");
    // }

    const newImage = new Image({
      url,
      postId,
    });

    const imageSaved = await newImage.save();

    return imageSaved;
  },
};

const createAvatar = {
  type: AvatarType,
  description: "Create a new avatar",
  args: {
    userId: { type: GraphQLID },
    url: { type: GraphQLString },
  },
  resolve: async (_, { url, userId }, { verifyUser }) => {
    // if (!verifyUser) {
    //   throw new Error("Unauthorized access");
    // }

    const newAvatar = new Avatar({
      url,
      userId,
    });

    const avatarSaved = await newAvatar.save();

    return avatarSaved;
  },
};

module.exports = {
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
};
