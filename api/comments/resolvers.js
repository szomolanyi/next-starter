const comments = require('../../models/comments')

module.exports = {
  Query: {
    comments: async () => {
      const c = await comments.getComments()
      return c
    }
  },
  Mutation: {
    createComment: async (obj, { title, text }) => {
      const id = await comments.createComment(title, text)
      return { _id: id, title, text }
    },
    deleteComment: async (obj, { _id }) => {
      const res = await comments.deleteComment(_id)
      return res
    },
    editComment: async (Obj, { _id, title, text }) => {
      const res = await comments.editComment(_id, title, text)
      return res
    }
  }
}
