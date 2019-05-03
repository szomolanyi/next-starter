const Comment = require("../../models/comments")

module.exports = {
  Query: {
    comments: async () => {
      return await Comment.find()
    }
  },
  Mutation: {
    createComment: async (obj, data) => {
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
