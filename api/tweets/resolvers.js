const { ApolloError } = require('apollo-server-express');
const { Types: { ObjectId } } = require('mongoose');

const Tweet = require('../../models/tweets');
const Users = require('../../models/users');

module.exports = {
  Query: {
    tweetsFeed: async (obj, data) => {
      let tweets;
      let cursor;
      const limit = data.limit ? data.limit : 5;
      if (data.cursor) {
        tweets = await Tweet.find({ _id: { $lt: new ObjectId(data.cursor) } }).sort('-_id').limit(limit);
        cursor = tweets.length > 0 ? tweets[tweets.length - 1]._id : data.cursor;
      } else {
        tweets = await Tweet.find().sort('-_id').limit(limit);
        cursor = tweets.length > 0 ? tweets[tweets.length - 1]._id : null;
      }
      return {
        cursor,
        tweets,
      };
    },
  },
  Tweet: {
    author: async ({ author }) => {
      const user = await Users.findById(author);
      return {
        email: user.email,
      };
    },
    createdAt: ({ createdAt }) => createdAt.toISOString(),
    likes: async ({ likes }) => {
      const promises = likes.map(liker => Users.findById(liker));
      return Promise.all(promises);
    },
  },
  Mutation: {
    createTweet: async (obj, data, context) => {
      if (!context.user) {
        throw new ApolloError('Not authenthicated', 'NOT_AUTHENTICATED', {});
      }
      const tweet = new Tweet({
        ...data,
        author: context.user._id,
        likes: [],
        edited: false,
        reactions: [],
      });
      return tweet.save();
    },
    deleteTweet: async (obj, { _id }) => {
      await Tweet.findByIdAndDelete(_id);
      return _id;
    },
    editTweet: async (Obj, { _id, text }) => {
      await Tweet.findByIdAndUpdate(_id, { text });
      return { _id, text };
    },
    likeTweet: async (Obj, { _id, userId }) => {
      const tweet = await Tweet.findById(new ObjectId(_id));
      const isIn = tweet.likes.reduce((prev, val) => prev || val.toString() === userId, false);
      if (isIn) {
        const newLikes = tweet.likes.filter(val => val.toString() !== userId);
        tweet.likes = newLikes;
      } else {
        tweet.likes.push(new ObjectId(userId));
      }
      return tweet.save();
    },
  },
};
