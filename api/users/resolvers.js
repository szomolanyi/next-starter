const users = require('../../models/users')

module.exports = {
  Query: {
    users: async () => {
      const c = await users.getUsers()
      return c
    }
  },
  Mutation: {
    createUser: async (obj, { email, password }) => {
      const id = await users.createUser(email, password)
      return { _id: id, email, password }
    },
    deleteUser: async (obj, { _id }) => {
      //const res = await users.deleteUser(_id)
      return true
    },
    editUser: async (Obj, { _id, email, password }) => {
      //const res = await users.editUser(_id, email, password)
      return { _id, email, password }
    }
  }
}
