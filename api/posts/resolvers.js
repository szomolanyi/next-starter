const { ApolloError } = require('apollo-server-express');
const { Types: { ObjectId } } = require('mongoose');

const Post = require('../../models/posts');
const Users = require('../../models/users');

module.exports = {
  Query: {
    postsFeed: async (obj, data) => {
      let posts;
      let cursor;
      const limit = data.limit ? data.limit : 5;
      if (data.cursor) {
        posts = await Post.find({ _id: { $lt: new ObjectId(data.cursor) } }).sort('-_id').limit(limit);
        cursor = posts.length > 0 ? posts[posts.length - 1]._id : data.cursor;
      } else {
        posts = await Post.find().sort('-_id').limit(limit);
        cursor = posts.length > 0 ? posts[posts.length - 1]._id : null;
      }
      return {
        cursor,
        posts,
      };
    },
  },
  Post: {
    author: async ({ author }) => {
      const user = await Users.findById(author);
      return {
        email: user.email,
      };
    },
    createdAt: ({ createdAt }) => createdAt.toISOString(),
    likes: async ({ likes }) => {
      const promises = likes.map(liker => Users.findById(liker));
      return Promise.all(promises);
    },
  },
  Mutation: {
    createPost: async (obj, data, context) => {
      if (!context.user) {
        throw new ApolloError('Not authenthicated', 'NOT_AUTHENTICATED', {});
      }
      const post = new Post({
        ...data,
        author: context.user._id,
        likes: [],
        edited: false,
        reactions: [],
      });
      return post.save();
    },
    deletePost: async (obj, { _id }) => {
      await Post.findByIdAndDelete(_id);
      return _id;
    },
    editPost: async (Obj, { _id, text }) => {
      await Post.findByIdAndUpdate(_id, { text });
      return { _id, text };
    },
    likePost: async (Obj, { _id, userId }) => {
      const post = await Post.findById(new ObjectId(_id));
      const isIn = post.likes.reduce((prev, val) => prev || val.toString() === userId, false);
      if (isIn) {
        const newLikes = post.likes.filter(val => val.toString() !== userId);
        post.likes = newLikes;
      } else {
        post.likes.push(new ObjectId(userId));
      }
      return post.save();
    },
  },
};