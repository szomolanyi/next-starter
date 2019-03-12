const express = require('express')
const dotenv = require('dotenv').load({ path: ".env" })
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./api/schema')

//express app
const app = express()

//apollo server 
const apollo_server = new ApolloServer({ typeDefs, resolvers })
apollo_server.applyMiddleware({ app }); // app is from an existing express app

module.exports = app
