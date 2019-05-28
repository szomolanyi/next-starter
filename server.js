// load and check required env variables
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') { dotenv.load({ path: '.env-dev' }); }
if (!process.env.MONGODB_URI) {
  throw new Error('Required env variable process.env.MONGODB_URI not defined');
}

const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const schema = require('./api');
require('./lib/passport');


// mongoose connect
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log(`Failed to connect to MongoDB with URI ${process.env.MONGODB_URI}`);
  process.exit();
});


// express app
const app = express();

app.use(BodyParser.urlencoded({ extended: true }));
app.use(CookieParser());

// express session
app.use(session({
  resave: false, // true sposobuje, ze nefunguje logout
  saveUninitialized: false, // true sposobuje, ze nefunguje login TODO: preskumat true,
  key: 'token',
  secret: process.env.SESSION_SECRET || 'unsafe secret',
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// flash
app.use(flash());


// apollo server
const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => ({
    user: req.user,
    login: req.login.bind(req),
    logout: req.logout.bind(req),
  }),
  formatError: (err) => {
    console.log(err);
    return err;
  },
});
apolloServer.applyMiddleware({ app }); // app is from an existing express app


/*
Use if standard LocalStrategy is used:

app.post('/server/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));
app.post('/login', postLogin) - alternative: custom login handler
app.get('/server/logout', (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err);
    req.user = null;
    res.redirect('/');
  });
});
*/

module.exports = app;
