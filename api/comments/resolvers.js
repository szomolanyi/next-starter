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
    deleteComment: (obj, { _id }) => {
      return true
    },
    editComment: (Obj, { _id, title, text }) => {
      return {
        _id: 1,
        title,
        text
      }
    }
  }
}
