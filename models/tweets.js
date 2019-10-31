const mongoose = require('mongoose');

/* GraphQL schema
_id: ID!
text: String
author: String!
likes: [User]!
edited: Boolean
reactions: [Tweet]!
*/


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
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  edited: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
  },
  reactions: {
    type: [tweetSchema],
    required: true,
  },
});

tweetSchema.set('timestamps', true);

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
