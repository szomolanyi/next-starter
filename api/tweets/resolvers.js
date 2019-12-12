const { ApolloError, UserInputError } = require('apollo-server-express');
const { Types: { ObjectId } } = require('mongoose');

const Tweet = require('../../models/tweets');
const Users = require('../../models/users');

module.exports = {
  Query: {
    tweetsFeed: async (obj, data) => {
      let tweets;
      let newCursor;
      const { limit = 5, cursor, ...rest } = data;
      if (cursor) {
        tweets = await Tweet.find({ _id: { $lt: new ObjectId(cursor) }, ...rest }).sort('-_id').limit(limit);
        newCursor = tweets.length > 0 ? tweets[tweets.length - 1]._id : cursor;
      } else {
        tweets = await Tweet.find({ ...rest }).sort('-_id').limit(limit);
        newCursor = tweets.length > 0 ? tweets[tweets.length - 1]._id : null;
      }
      return {
        cursor: newCursor,
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
    retweeted: ({ retweets }) => {
      console.log(retweets);
      return null;
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
        retweets: [],
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
    retweet: async (Obj, { _id }, context) => {
      // TODO use transactions
      const tweet = await Tweet.findById(new ObjectId(_id));
      if (!context.user) {
        throw new ApolloError('Not authenthicated', 'NOT_AUTHENTICATED', {});
      }
      if (tweet.author.toString() === context.user._id.toString()) {
        throw new UserInputError('Unable to retweet own tweet');
      }
      const alreadyRetweeted = tweet.retweets.reduce(
        (prev, u) => prev || u.toString() === context.user._id.toString(),
        false,
      );
      if (alreadyRetweeted === true) {
        throw new UserInputError('Already retweeted');
      }
      console.log('========== retweet');
      console.log(tweet);
      tweet.retweets.push(context.user._id);
      console.log('========== retweet end');
      return tweet.save();
    },
  },
};
