const express = require('express')
//const dotenv = require('dotenv').load({ path: ".env" })
const { ApolloServer } = require('apollo-server-express')
const schema = require('./api')

//express app
const app = express()

//apollo server 
const apollo_server = new ApolloServer({ schema })
apollo_server.applyMiddleware({ app }); // app is from an existing express app

module.exports = app
