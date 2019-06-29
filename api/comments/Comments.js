const typeDefs = `
type Query {
  comments: [Comment]
}

type Comment {
  _id: String
  title: String
  text: String
}

type Mutation {
  createComment(title: String!, text: String!): Comment
  deleteComment(_id: String!): String
  editComment(_id: String!, title: String!, text: String!): Comment
}
`;
module.exports = typeDefs;
