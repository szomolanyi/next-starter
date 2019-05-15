//load and check required env variables
const dotenv = require('dotenv')
if (process.env.NODE_ENV !== "production")
  dotenv.load({ path: ".env-dev" })
if (!process.env.MONGODB_URI) {
  throw "Required env variable process.env.MONGODB_URI not defined"
}

const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const BodyParser = require("body-parser")
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)
const { ApolloServer } = require('apollo-server-express')
const schema = require('./api')
const mongoose = require("mongoose")
const {postLogin} = require('./lib/passport')

//mongoose connect
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log(`Failed to connect to MongoDB with URI ${process.env.MONGODB_URI}`)
  process.exit();
});


//express app
const app = express()

app.use(BodyParser.urlencoded({ extended: true }))

//express session
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET || 'unsafe secret',
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  })
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())
//flash
app.use(flash())


//apollo server 
const apollo_server = new ApolloServer({
  schema,
  context: ({req}) => {
    return {
      user: req.user,
      messages: req.flash()
    }
  }
})
apollo_server.applyMiddleware({ app }); // app is from an existing express app

//routes
//app.post('/login', postLogin)
app.post('/login',  passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login' ,
  failureFlash: true
}))

module.exports = app
