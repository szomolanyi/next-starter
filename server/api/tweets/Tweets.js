const typeDefs = `
extend type Query {
  tweetsFeed(cursor: String, limit: Int, userId: ID, feedType: String, pattern: String): TweetsFeed
}

type Tweet {
  _id: ID!
  text: String!
  author: User!
  likers: [User]!
  retweetedBy: [User]!
  retweetersCount: Int!
  edited: Boolean
  replies: [Tweet]!
  repliesCount: Int!
  replyOn: Tweet
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
  createTweet(text: String!, replyOn: ID): Tweet
  deleteTweet(_id: ID!): String
  editTweet(_id: ID!, text: String!): Tweet
  likeTweet(_id: ID!, userId: ID!): Tweet
  retweet(_id: ID!): Tweet
}
`;

module.exports = typeDefs;
