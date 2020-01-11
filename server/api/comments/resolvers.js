const { ApolloError, UserInputError } = require('apollo-server-express');
const { Types: { ObjectId } } = require('mongoose');

const Comment = require('../../models/comments');

module.exports = {
  Query: {
    comments: async (obj, data) => {
      let comments;
      let cursor;
      const limit = data.limit ? data.limit : 5;
      if (data.cursor) {
        comments = await Comment.find({ _id: { $lt: new ObjectId(data.cursor) } }).sort('-_id').limit(limit);
        cursor = comments.length > 0 ? comments[comments.length - 1]._id : data.cursor;
      } else {
        comments = await Comment.find().sort('-_id').limit(limit);
        cursor = comments.length > 0 ? comments[comments.length - 1]._id : null;
      }
      return {
        cursor,
        comments,
      };
    },
  },
  Mutation: {
    createComment: async (obj, data, context) => {
      if (!context.user) {
        throw new ApolloError('Not authenthicated', 'NOT_AUTHENTICATED', {});
      }
      const comment = new Comment(data);
      try {
        return await comment.save();
      } catch (error) {
        if (error.code === 11000) {
          throw new UserInputError('Comment already defined', { pokus: 'potomzmaz' });
        } else {
          throw new ApolloError('Internal error');
        }
      }
    },
    deleteComment: async (obj, { _id }) => {
      await Comment.findByIdAndDelete(_id);
      return _id;
    },
    editComment: async (Obj, { _id, title, text }) => {
      await Comment.findByIdAndUpdate(_id, { title, text });
      return { _id, title, text };
    },
  },
};
