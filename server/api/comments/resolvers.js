const { ApolloError, UserInputError } = require('apollo-server-express');
const { Types: { ObjectId } } = require('mongoose');

const Comment = require('../../models/comments');

module.exports = {
  Query: {
    comments: async (obj, data) => {
      let cursor = data.cursor ? data.cursor : null;
      const limit = data.limit ? data.limit : 5;
      let findObj = {};
      if (data.searchPattern) {
        findObj = {
          ...findObj,
          $text: {
            $search: data.searchPattern,
          },
        };
      }
      if (data.cursor) {
        findObj = {
          ...findObj,
          _id: { $lt: new ObjectId(data.cursor) },
        };
      }
      const comments = await Comment.find(findObj).sort('-_id').limit(limit);
      console.log({ m: 'comments', findObj, comments });
      cursor = comments.length > 0 ? comments[comments.length - 1]._id : cursor;
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
