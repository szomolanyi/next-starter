// load and check required env variables
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
if (!process.env.MONGODB_URI) {
  throw new Error('Required env variable process.env.MONGODB_URI not defined');
}

const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const schema = require('./api');
require('./passport');

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
console.log(`process.env.STANDALONE_GRAPHQL2=${process.env.STANDALONE_GRAPHQL}`);
if (process.env.STANDALONE_GRAPHQL === 'YES') {
  app.use(cors({
    origin: process.env.APP_URL,
    credentials: true,
  }));
}

// pug is used to render special pages, confirmemail, ...
app.set('view engine', 'pug');
app.set('views', 'server/views');

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
apolloServer.applyMiddleware({ app, cors: false }); // app is from an existing express app

/* google auth endpoint */
app.get('/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }));

app.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err) {
      console.log({ m: 'Google auth error', err });
      return res.render('social_auth_err');
    }
    return req.login(user, (err1) => {
      if (err1) {
        console.log({ m: 'Google auth login error', err1 });
        return res.render('social_auth_err');
      }
      return res.redirect(`${process.env.APP_URL}`);
    });
  })(req, res, next);
});

module.exports = app;
