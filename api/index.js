
const {mergeSchemas, makeExecutableSchema} = require('graphql-tools')

const TodosSchema = require('./todos/Todos.js')
const CommentsSchema = require('./comments/Comments')
const TodosResolvers = require('./todos/resolvers')
const CommentsResolvers = require('./comments/resolvers')

module.exports = mergeSchemas({
  schemas: [
    makeExecutableSchema({typeDefs: TodosSchema}), 
    makeExecutableSchema({typeDefs: CommentsSchema})
  ],
  resolvers: [TodosResolvers, CommentsResolvers]
})
