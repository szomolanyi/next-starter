const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema();
tweetSchema.add({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likers: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  retweeters: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  edited: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
  },
  replies: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  replyOn: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

tweetSchema.set('timestamps', true);

tweetSchema.index({
  text: 'text',
},
{
  name: 'Tweets weighted text search',
  weights: {
    text: 5,
  },
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
