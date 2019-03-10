const express = require('express')
const next = require('next')
const dotenv = require('dotenv')
const database = require('./models/default.js')
const {ApolloServer} = require('apollo-server-express')
const { typeDefs, resolvers} = require('./api/schema')
//const typeDefs = require('./schema')

//console.log(schema)

// load environment file
dotenv.load({path: ".env"})
//apollo server 
console.log('tusom1')
const apollo_server = new ApolloServer({ typeDefs, resolvers })
console.log('tusom')



//create next app
const dev = process.env.NODE_ENV !== 'production'
const next_app = next({ dev })
const handle = next_app.getRequestHandler()



next_app.prepare()
  .then(() => {
    database.connectDatabase()
  })
  .then(() => {
    const app = express()
    console.log('tt1')
    apollo_server.applyMiddleware({ app  }); // app is from an existing express app
    console.log('tt2')

    app.get('*', (req, res) => {
      return handle(req, res)
    })

    app.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
      console.log(`> Graphql is api ready on ${apollo_server.graphqlPath}`)
    })
  })
  /*.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })*/
  