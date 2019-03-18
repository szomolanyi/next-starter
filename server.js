const express = require('express')
const dotenv = require('dotenv')
const { ApolloServer } = require('apollo-server-express')
const schema = require('./api')

//load and check required env variables
if (process.env.NODE_ENV !== "production")
  dotenv.load({ path: ".env-dev" })
if (!process.env.MONGODB_URI) {
  throw "Required env variable process.env.MONGODB_URI not defined"
}

//express app
const app = express()

//apollo server 
const apollo_server = new ApolloServer({ schema })
apollo_server.applyMiddleware({ app }); // app is from an existing express app

module.exports = app
