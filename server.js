//load and check required env variables
const dotenv = require('dotenv')
if (process.env.NODE_ENV !== "production")
  dotenv.load({ path: ".env-dev" })
if (!process.env.MONGODB_URI) {
  throw "Required env variable process.env.MONGODB_URI not defined"
}

const express = require('express')
const session = require('express-session')
const BodyParser = require("body-parser")
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)
const { ApolloServer } = require('apollo-server-express')
const schema = require('./api')
const mongoose = require("mongoose")
require('./lib/passport')

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


//apollo server 
const apollo_server = new ApolloServer({
  schema,
  context: ({req}) => {
    return {
      user: req.user
    }
  }
})
apollo_server.applyMiddleware({ app }); // app is from an existing express app

//routes
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      //req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      //req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
})

module.exports = app
