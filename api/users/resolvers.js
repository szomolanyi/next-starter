const crypto = require('crypto');
const { UserInputError, ApolloError } = require('apollo-server-express');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const Email = require('email-templates');
const User = require('../../models/users');
const Token = require('../../models/token');
const createResult = require('../../lib/result-codes');

const sendVerificationEmail = async (_userId) => {
  const token = new Token({ _userId, token: crypto.randomBytes(16).toString('hex') });
  await token.save();
  console.log(process.env.SENDGRID_API_KEY);
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
  );
  const emailTemplate = new Email({
    transport,
    send: true,
    preview: false,
  });
  try {
    await emailTemplate.send({
      template: 'email-verify',
      message: {
        from: 'sender@example.com',
        to: 'szomolanyi@gmail.com',
      },
      locals: {
        token: token.token,
      },
    });
  } catch (error) {
    console.log(error);
    throw new UserInputError('We were not able to send you verification email. We are working on to solve the problem. You can login and verify your account later.');
  }
};

const login_ = async (user, login) => {
  return new Promise((resolve, reject) => login(user, (err) => {
    if (err) {
      reject(err);
    }
    resolve(user);
  }));
};

module.exports = {
  Query: {
    users: async () => User.find(),
    currentUser: (Obj, data, { user }) => {
      if (user) return user;
      return null;
    },
  },
  Mutation: {
    createUser: async (obj, { email, password }, { login }) => {
      const user = await User.register(new User({ email }), password);
      await sendVerificationEmail(user._id);
      await login_(user, login);
      return user;
    },
    deleteUser: async (obj, { _id }) => {
      await User.findByIdAndDelete(_id);
      return true;
    },
    editUser: async (Obj, { _id, email, password }) => {
      await User.findByIdAndUpdate(_id, { email, password });
      return { _id, email };
    },
    login: async (Obj, { email, password }, { login }) => {
      const { user, error } = await User.authenticate()(email, password);
      if (error) throw error;
      login_(user, login);
    },
    logout: (Obj, data, { logout }) => {
      logout();
      return true;
    },
    sendVerifyEmail: async (Obj, data, { user }) => {
      await sendVerificationEmail(user._id);
      return true;
    },
    verifyEmail: async (Obj, { token }) => {
      try {
        console.log({ m: 'verifyuEmail start' });
        const tokenInstance = await Token.findOne({ token });
        console.log({ m: 'verifyuEmail 2' });
        if (!tokenInstance) {
          return createResult('TOKEN_NOT_FOUND');
        }
        console.log({ m: 'verifyuEmail 3' });
        const user = await User.findOne({ _id: tokenInstance._userId });
        if (!user) {
          return createResult('USER_NOT_FOUND');
        }
        console.log({ m: 'verifyuEmail 4' });
        if (user.isVerified) {
          return createResult('ALREADY_VERIFIED');
        }
        console.log({ m: 'verifyuEmail 5' });
        user.isVerified = true;
        await user.save();
        console.log({ m: 'verifyuEmail 6' });
        return createResult('OK');
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
