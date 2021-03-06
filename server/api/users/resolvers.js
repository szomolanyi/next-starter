const crypto = require('crypto');
const { UserInputError, ApolloError } = require('apollo-server-micro');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const sha1 = require('js-sha1');

const User = require('../../models/users');
const Token = require('../../models/token');
const createResult = require('../../../lib/result-codes');

const genVerificationEmailHtml = (verifyLink) => `
<h1>Account activation.</h1>
<h3>Your account has been successfully created. Click <a href="${verifyLink}">this link</a> to activate your account.</h3>
`;

const sendVerificationEmail = async (_userId, email) => {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('Cannot send verification email, environment variable SENDGRID_API_KEY is not defined');
    throw new UserInputError('We were not able to send you verification email. We are working on to solve the problem. You can login and verify your account later.');
  }
  const token = new Token({ _userId, token: crypto.randomBytes(16).toString('hex') });
  await token.save();
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
  );
  console.log({ m: 'sendVerificationEmail', email, DEV_EMAIL: process.env.DEV_EMAIL });
  try {
    await transport.sendMail({
      from: process.env.APP_EMAIL,
      to: process.env.DEV_EMAIL ? process.env.DEV_EMAIL : email,
      subject: 'Next starter - account verification email',
      html: genVerificationEmailHtml(`${process.env.APP_URL}/verify?token=${token.token}`),
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
    users: async (obj, { pattern }) => {
      const filter = {};
      if (pattern) {
        filter.$or = [
          { email: { $regex: pattern } },
          { firstName: { $regex: pattern } },
          { lastName: { $regex: pattern } },
        ];
      }
      const users = await User.find(filter);
      return users;
    },
    currentUser: (Obj, data, { user }) => {
      if (user) return user;
      return null;
    },
    user: async (obj, { _id }) => {
      const user = await User.findById({ _id });
      return user;
    },
  },
  User: {
    follows: async ({ follows }) => {
      const promises = follows.map((usr) => User.findById(usr));
      return Promise.all(promises);
    },
    createdAt: ({ createdAt }) => createdAt.toISOString(),
    displayName: ({ firstName, lastName }) => {
      if (firstName && lastName) return `${firstName} ${lastName}`;
      if (firstName) return firstName;
      if (lastName) return lastName;
      return null;
    },
  },
  Mutation: {
    createUser: async (obj, { email, password }, { login }) => {
      const user = await User.register(new User({
        email,
        follows: [],
        hasLocalPassword: true,
      }), password);
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
      if (userTmp && !userTmp.hasLocalPassword) {
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
    editUserProfile: async (Obj, { firstName, lastName, about }, context) => {
      if (!context.user) {
        throw new ApolloError('Not authenthicated', 'NOT_AUTHENTICATED', {});
      }
      const user = await User.findById(context.user._id);
      user.firstName = firstName;
      user.lastName = lastName;
      user.about = about;
      await user.save();
      return user;
    },
    followUser: async (obj, { _id }, context) => {
      if (!context.user) {
        throw new ApolloError('Not authenthicated', 'NOT_AUTHENTICATED', {});
      }
      if (_id === context.user._id.toString()) {
        throw new ApolloError('Unable to follow yourself', 'BAD_USER_INPUT', {});
      }
      const user = await User.findById(context.user._id);
      const followedUser = await User.findById(_id);
      if (user.follows) {
        const currentFollows = user.get('follows');
        if (!currentFollows.includes(_id)) {
          user.follows.push(_id);
        }
      } else {
        user.follows = [_id];
      }
      if (followedUser.followers) {
        const currentFollowers = followedUser.get('followers');
        if (!currentFollowers.includes(context.user._id)) {
          followedUser.followers.push(context.user._id);
        }
      } else {
        followedUser.followers = [context.user._id];
      }
      await followedUser.save();
      await user.save();
      return user;
    },
    unFollowUser: async (obj, { _id }, context) => {
      if (!context.user) {
        throw new ApolloError('Not authenthicated', 'NOT_AUTHENTICATED', {});
      }
      const user = await User.findById(context.user._id);
      const followedUser = await User.findById(_id);
      if (user.follows) {
        const currentFollows = user.get('follows');
        user.follows = currentFollows.filter((e) => e === _id);
      }
      if (followedUser.followers) {
        const currentFollowers = followedUser.get('followers');
        followedUser.followers = currentFollowers.filter((e) => e === context.user._id);
      }
      await followedUser.save();
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
