
const {mergeSchemas, makeExecutableSchema} = require('graphql-tools')

const CommentsSchema = require('./comments/Comments')
const CommentsResolvers = require('./comments/resolvers')
const UsersSchema = require("./users/Users")
const UserResolvers = require("./users/resolvers")

module.exports = mergeSchemas({
  schemas: [
    makeExecutableSchema({typeDefs: CommentsSchema}),
    makeExecutableSchema({typeDefs: UsersSchema}),
  ],
  resolvers: [CommentsResolvers, UserResolvers]
})
