
const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');

const RootSchema = `
  type Query {
    version: String
  }
  type Mutation {
    getVersion: String
  }
  type Response {
    code: String!
    message: String!
  }
`;

const CommentsSchema = require('./comments/Comments');
const CommentsResolvers = require('./comments/resolvers');
const PostsSchema = require('./posts/Posts');
const PostsResolvers = require('./posts/resolvers');
const UsersSchema = require('./users/Users');
const UserResolvers = require('./users/resolvers');

module.exports = makeExecutableSchema({
  typeDefs: [RootSchema, UsersSchema, CommentsSchema, PostsSchema],
  resolvers: merge(CommentsResolvers, UserResolvers, PostsResolvers),
});
