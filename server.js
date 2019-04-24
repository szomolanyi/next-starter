//load and check required env variables
const dotenv = require('dotenv')
if (process.env.NODE_ENV !== "production")
  dotenv.load({ path: ".env-dev" })
if (!process.env.MONGODB_URI) {
  throw "Required env variable process.env.MONGODB_URI not defined"
}

const express = require('express')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)
const { ApolloServer } = require('apollo-server-express')
const schema = require('./api')
const { getDatabase } = require('./models/mongo')

//express app
const app = express()

//express session
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET || 'unsafe secret',
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    dbPromise: getDatabase() //TODO : use same connection to mongo
    //url: process.env.MONGODB_URI,
    //autoReconnect: true,
  })
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//apollo server 
const apollo_server = new ApolloServer({
  schema,
  context: ({req}) => {
    console.log(req.headers)
  }
})
apollo_server.applyMiddleware({ app }); // app is from an existing express app

module.exports = app
