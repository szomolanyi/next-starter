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
const CookieParser = require("cookie-parser")
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
app.use(CookieParser())

//express session
app.use(session({
  resave: false, //true sposobuje, ze nefunguje logout
  saveUninitialized: false, //true sposobuje, ze nefunguje login TODO: preskumat true,
  //key:'token',
  secret: process.env.SESSION_SECRET || 'unsafe secret',
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
  })
  /*store: new MongoStore({
    mongooseConnection: mongoose.connection,
  })*/
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
    console.log(`context,user: ${req.user?req.user.email:null}`)
    return {
      user: req.user,
    }
  }
})
apollo_server.applyMiddleware({ app }); // app is from an existing express app




const postLogin = (req, res, next) => {
  /* nepouziva sa */
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      //req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      console.log({m:"afterlogin", user, err})
      if (err) { return next(err); }
      //req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next)
}



//routes
app.post('/server/login',  passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login' ,
  failureFlash: true
}))
app.get('/server/logout', (req, res) => {
  req.logout()
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err)
    req.user = null
    res.redirect('/')
  });
})
//app.post('/login', postLogin)

module.exports = app
