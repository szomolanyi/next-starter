const { UserInputError } = require('apollo-server-express');
const User = require('../../models/users');


module.exports = {
  Query: {
    users: async () => User.find(),
  },
  Mutation: {
    createUser: async (obj, data) => {
      let user = await User.findOne({ email: data.email });
      if (user) {
        throw new UserInputError('User already exists', { email: 'User already registered' });
      }
      user = new User(data);
      return user.save();
    },
    deleteUser: async (obj, { _id }) => {
      await User.findByIdAndDelete(_id);
      return true;
    },
    editUser: async (Obj, { _id, email, password }) => {
      await User.findByIdAndUpdate(_id, { email, password });
      return { _id, email, password };
    },
  },
};
