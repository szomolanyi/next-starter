const User = require('../../models/users')

module.exports = {
  Query: {
    users: async () => {
      return await users.getUsers()
    }
  },
  Mutation: {
    createUser: async (obj, data) => {
      const user = new User(data)
      return await user.save()
    },
    deleteUser: async (obj, { _id }) => {
      await Comment.findByIdAndDelete(_id)
      return true
    },
    editUser: async (Obj, { _id, email, password }) => {
      await Comment.findByIdAndUpdate(_id, {title, text})
      return { _id, email, password }
    }
  }
}
