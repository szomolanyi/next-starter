const mongoose = require('mongoose');

/* GraphQL schema
_id: ID!
text: String
author: String!
likes: Int
edited: Boolean
reactions: [Post]!
*/


const postSchema = new mongoose.Schema();
postSchema.add({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  edited: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
  },
  reactions: {
    type: [postSchema],
    required: true,
  },
});

postSchema.set('timestamps', true);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
