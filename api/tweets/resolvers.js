const { ApolloError, UserInputError } = require('apollo-server-express');
const { Types: { ObjectId } } = require('mongoose');

const Tweet = require('../../models/tweets');
const Users = require('../../models/users');

/*
currentUser && {
          $or: [
            {
              author: currentUser._id,
            },
            {
              author: {
                $in: currentUser.follows,
              },
            },
          ],
        }
================
hladanie tweetov
1. authentifikovany user home page
author:context.user._id or
$in {author: context.user.follows} or
retweeters:context.user._id
likers:context.user._id

2. UserProfile vlastne tweety
author:param.user_id

3. UserProfile retweeters
retweeters:param.user_id

4. UserProfile
likers : param.user_id
*/

module.exports = {
  Query: {
    tweetsFeed: async (obj, data, context) => {
      let tweets;
      let newCursor;
      const { limit = 5, cursor, filter } = data;
      console.log({ m: 'tweetsFeed01', context });
      let query;
      if (!filter) {
        console.log({ m: 'tweetsFeed01', query });
        if (context.user) {
          console.log({ m: 'tweetsFeed02', query });
          query = {
            $or: [
              { author: context.user._id },
              { retweeters: context.user._id },
              { likers: context.user._id },
              {
                author: { $in: context.user.follows },
              },
            ],
          };
        } else {
          query = {};
        }
      } else {
        query = filter;
      }
      console.log({ m: 'tweetsFeed', query });
      if (cursor) {
        tweets = await Tweet.find({ _id: { $lt: new ObjectId(cursor) }, ...query }).sort('-_id').limit(limit);
        newCursor = tweets.length > 0 ? tweets[tweets.length - 1]._id : cursor;
      } else {
        tweets = await Tweet.find({ ...query }).sort('-_id').limit(limit);
        newCursor = tweets.length > 0 ? tweets[tweets.length - 1]._id : null;
      }
      console.log({ m: 'tweetsFeed after mongo', newCursor, tweets });
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
    likers: async ({ likers }) => {
      const promises = likers.map((liker) => Users.findById(liker));
      return Promise.all(promises);
    },
    retweeted: ({ retweeters }) => {
      console.log(retweeters);
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
        likers: [],
        retweeters: [],
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
      const isIn = tweet.likers.reduce((prev, val) => prev || val.toString() === userId, false);
      if (isIn) {
        const newLikers = tweet.likers.filter(val => val.toString() !== userId);
        tweet.likers = newLikers;
      } else {
        tweet.likers.push(new ObjectId(userId));
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
      const alreadyRetweeted = tweet.retweeters.reduce(
        (prev, u) => prev || u.toString() === context.user._id.toString(),
        false,
      );
      if (alreadyRetweeted === true) {
        throw new UserInputError('Already retweeted');
      }
      console.log('========== retweet');
      tweet.retweeters.push(context.user._id);
      console.log('========== retweet end');
      return tweet.save();
    },
  },
};
