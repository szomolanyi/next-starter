
const {AuthenticationError} = require("apollo-server-express")

const Comment = require("../../models/comments")

module.exports = {
  Query: {
    comments: () => {
      return Comment.find()
    }
  },
  Mutation: {
    createComment: async (obj, data, context) => {
      if (!context.user) {
        throw new ApolloError("Not authenticted", "NOT_AUTHENTICATED", {})
      }
      const comment = new Comment(data)
      return await comment.save()
    },
    deleteComment: async (obj, { _id }) => {
      await Comment.findByIdAndDelete(_id)
      return true
    },
    editComment: async (Obj, { _id, title, text }, context) => {
      await Comment.findByIdAndUpdate(_id, {title, text})
      return { _id, title, text }
    }
  }
}
