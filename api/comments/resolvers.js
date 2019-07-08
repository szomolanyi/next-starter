const { ApolloError, UserInputError } = require('apollo-server-express');

const Comment = require('../../models/comments');

module.exports = {
  Query: {
    comments: () => Comment.find(),
  },
  Mutation: {
    createComment: async (obj, data, context) => {
      if (!context.user) {
        throw new ApolloError('Not authenticted', 'NOT_AUTHENTICATED', {});
      }
      const comment = new Comment(data);
      try {
        return await comment.save();
      } catch (error) {
        console.log({ error });
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
