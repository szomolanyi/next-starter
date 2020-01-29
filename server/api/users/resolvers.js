const crypto = require('crypto');
const { UserInputError } = require('apollo-server-express');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const Email = require('email-templates');
const sha1 = require('js-sha1');

const { ApolloError } = require('apollo-server-express');

const User = require('../../models/users');
const Token = require('../../models/token');
const createResult = require('../../../lib/result-codes');

const sendVerificationEmail = async (_userId, email) => {
  const token = new Token({ _userId, token: crypto.randomBytes(16).toString('hex') });
  await token.save();
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
  );
  const emailTemplate = new Email({
    transport,
    send: true,
    preview: false,
    views: {
      root: 'server/emails',
    },
  });
  console.log({ m: 'sendVerificationEmail', email, DEV_EMAIL: process.env.DEV_EMAIL });
  try {
    await emailTemplate.send({
      template: 'email-verify',
      message: {
        from: process.env.APP_EMAIL,
        to: process.env.DEV_EMAIL ? process.env.DEV_EMAIL : email,
      },
      locals: {
        verifyLink: `${process.env.APP_URL}/verify?token=${token.token}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw new UserInputError('We were not able to send you verification email. We are working on to solve the problem. You can login and verify your account later.');
  }
};

const login_ = async (user, login) => new Promise((resolve, reject) => login(user, (err) => {
  if (err) {
    reject(err);
  }
  resolve(user);
}));

module.exports = {
  Query: {
    users: async () => User.find(),
    currentUser: (Obj, data, { user }) => {
      if (user) return user;
      return null;
    },
  },
  User: {
    displayName: ({ firstName, lastName }) => {
      if (firstName && lastName) return `${firstName} ${lastName}`;
      if (firstName) return firstName;
      if (lastName) return lastName;
      return null;
    },
  },
  Mutation: {
    createUser: async (obj, { email, password }, { login }) => {
      const user = await User.register(new User({ email, hasLocalPassword: true }), password);
      await sendVerificationEmail(user._id, user.email);
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
      const userTmp = await User.findOne({ email });
      if (!userTmp.hasLocalPassword) {
        throw new UserInputError('Local password is not created, only social authentication is possible');
      }
      const { user, error } = await User.authenticate()(email, password);
      if (error) throw error;
      login_(user, login);
    },
    logout: (Obj, data, { logout }) => {
      logout();
      return true;
    },
    sendVerifyEmail: async (Obj, data, { user }) => {
      console.log(`sendVerifyEmail user.email=${user.email}`);
      await sendVerificationEmail(user._id, user.email);
      return true;
    },
    verifyEmail: async (Obj, { token }) => {
      try {
        const tokenInstance = await Token.findOne({ token });
        if (!tokenInstance) {
          return createResult('TOKEN_NOT_FOUND');
        }
        const user = await User.findOne({ _id: tokenInstance._userId });
        if (!user) {
          return createResult('USER_NOT_FOUND');
        }
        if (user.isVerified) {
          return createResult('ALREADY_VERIFIED');
        }
        user.isVerified = true;
        await user.save();
        return createResult('OK');
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    editUserProfile: async (Obj, { firstName, lastName }, context) => {
      if (!context.user) {
        throw new ApolloError('Not authenthicated', 'NOT_AUTHENTICATED', {});
      }
      const user = await User.findById(context.user._id);
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
      return user;
    },
    setImageUrl: async (Obj, { url, type }, context) => {
      if (!context.user) {
        throw new ApolloError('Not authenthicated', 'NOT_AUTHENTICATED', {});
      }
      const user = await User.findById(context.user._id);
      user[type] = url;
      await user.save();
      return user;
    },
    signCloudinaryUpload: (Obj, { data }, context) => {
      if (!context.user) {
        throw new ApolloError('Not authenthicated', 'NOT_AUTHENTICATED', {});
      }
      return sha1(`${data}${process.env.CLOUDINARY_SECRET}`);
    },
  },
};
