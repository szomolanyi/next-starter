const typeDefs = `
extend type Query {
  tweetsFeed(cursor: String, limit: Int, filter: TweetFeedInput): TweetsFeed
}

type Tweet {
  _id: ID!
  text: String!
  author: User!
  likers: [User]!
  retweetedBy: [User]
  retweetersCount: Int
  edited: Boolean
  reactions: [Tweet]!
  createdAt: String!
}

input TweetFeedInput {
  author: String
  retweeters: String
  likers: String
  pattern: String
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
  retweet(_id: ID!): Tweet
}
`;

module.exports = typeDefs;
