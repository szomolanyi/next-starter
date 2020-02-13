const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

commentSchema.index({
  title: 'text',
  text: 'text',
},
{
  name: 'Weighted text search',
  weights: {
    title: 10,
    text: 5,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
