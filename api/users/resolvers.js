const crypto = require('crypto');
const { UserInputError } = require('apollo-server-express');
const User = require('../../models/users');
const Token = require('../../models/token');


module.exports = {
  Query: {
    users: async () => User.find(),
    currentUser: (Obj, data, { user }) => {
      if (user) return user;
      return null;
    },
  },
  Mutation: {
    createUser: async (obj, { email, password }) => {
      const user = await User.register(new User({ email }), password);
      const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
      await token.save();
      return user;
    },
    deleteUser: async (obj, { _id }) => {
      await User.findByIdAndDelete(_id);
      return true;
    },
    editUser: async (Obj, { _id, email, password }) => {
      await User.findByIdAndUpdate(_id, { email, password });
      return { _id, email, password };
    },
    login: async (Obj, { email, password }, { login }) => {
      const { user, error } = await User.authenticate()(email, password);
      if (error) throw error;
      return new Promise((resolve, reject) => login(user, (err) => {
        if (err) {
          reject(err);
        }
        resolve({ email: user.email });
      }));
    },
    logout: (Obj, data, { logout }) => {
      logout();
      return true;
    },
  },
};
