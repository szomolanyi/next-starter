const typeDefs = `
extend type Query {
  comments(cursor: String, limit: Int): CommentsFeed
}

type Comment {
  _id: String
  title: String
  text: String
}

type CommentsFeed {
  cursor: String
  comments: [Comment]!
}

extend type Mutation {
  createComment(title: String!, text: String!): Comment
  deleteComment(_id: String!): String
  editComment(_id: String!, title: String!, text: String!): Comment
}
`;
module.exports = typeDefs;
