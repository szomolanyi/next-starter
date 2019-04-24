
const {mergeSchemas, makeExecutableSchema} = require('graphql-tools')

const TodosSchema = require('./todos/Todos')
const CommentsSchema = require('./comments/Comments')
const TodosResolvers = require('./todos/resolvers')
const CommentsResolvers = require('./comments/resolvers')
const UsersSchema = require("./users/Users")
const UserResolvers = require("./users/resolvers")

module.exports = mergeSchemas({
  schemas: [
    makeExecutableSchema({typeDefs: TodosSchema}), 
    makeExecutableSchema({typeDefs: CommentsSchema}),
    makeExecutableSchema({typeDefs: UsersSchema}),
  ],
  resolvers: [TodosResolvers, CommentsResolvers, UserResolvers]
})
