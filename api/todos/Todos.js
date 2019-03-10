const {gql} = require( 'apollo-server-express')


const typeDefs = gql`
type Query {
  todos: [Todo]
}

type Todo {
  id: String
  text: String
}

type Mutation {
  createTodo(text: String!): Todo
  deleteTodo(id: String!): Boolean
  editTodo(id: String!, text: String!): Todo
}
`
 module.exports = typeDefs