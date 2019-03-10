//r
//import {merge} from 'lodash'
const merge = require('lodash').merge

//schemas
//import TodosSchema from './todos/Todos.graphql'
//const TodosSchema = require('./todos/Todos.graphql')
const TodosSchema = require('./todos/Todos.js')
const typeDefs = [
  TodosSchema
]

//resolvers
//import TodosResolvers from './todos/resolvers'
const TodosResolvers = require('./todos/resolvers')


const resolvers = merge(
  TodosResolvers,
)

module.exports = { typeDefs, resolvers }

/*console.log(typeDefs)
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return { user: await getUser(req.headers.authorization) }
})
console.log('ttttttttttttttt')
export default schema
*/
