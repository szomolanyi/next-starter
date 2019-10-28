const typeDefs = `
extend type Query {
  postsFeed(cursor: String, limit: Int): PostsFeed
}

type Post {
  _id: ID!
  text: String!
  author: User!
  likes: Int
  edited: Boolean
  reactions: [Post]!
  createdAt: String!
}

type PostsFeed {
  cursor: ID
  posts: [Post]!
}

extend type Mutation {
  createPost(text: String!): Post
  deletePost(_id: ID!): String
  editPost(_id: ID!, text: String!): Post
}
`;

module.exports = typeDefs;
