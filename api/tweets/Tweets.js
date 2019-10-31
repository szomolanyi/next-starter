const typeDefs = `
extend type Query {
  tweetsFeed(cursor: String, limit: Int): TweetsFeed
}

type Tweet {
  _id: ID!
  text: String!
  author: User!
  likes: [User]!
  edited: Boolean
  reactions: [Tweet]!
  createdAt: String!
}

type TweetsFeed {
  cursor: ID
  tweets: [Tweet]!
}

extend type Mutation {
  createTweet(text: String!): Tweet
  deleteTweet(_id: ID!): String
  editTweet(_id: ID!, text: String!): Tweet
  likeTweet(_id: ID!, userId: ID!): Tweet
}
`;

module.exports = typeDefs;
