const User = require('../../models/users');


module.exports = {
  Query: {
    users: async () => User.find(),
    currentUser: (Obj, data, { user }) => {
      if (user) return { email: user.email };
      return null;
    },
  },
  Mutation: {
    createUser: async (obj, { email, password }) => {
      const user = await User.register(new User({ email }), password);
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
      console.log('Logout');
      logout();
      return true;
    },
  },
};
