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
require('./lib/passport');

const User = require('./models/users');
const Token = require('./models/token');

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
    ]
  })
);

app.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err) return res.redirect(`${process.env.APP_URL}/login`); // TODO: add PUG error page
    return req.login(user, (err1) => {
      if (err1) {
        return res.redirect(`${process.env.APP_URL}/login`); // TODO: add PUG error page
      }
      return res.redirect(`${process.env.APP_URL}`);
    });
  })(req, res, next);
});

app.get('/server/confirmemail1', (req, res) => {
  Token.findOne({ token: req.query.token }, (err, token) => {
    if (err) {
      console.log(err);
    }
    if (!token) {
      return res.render('confirmemail', { message: 'Token was not found or it is timed out', canlog: false });
    }
    return User.findOne({ _id: token._userId }, (err1, user) => {
      if (err1) {
        console.log(err1);
      }
      if (!user) {
        return res.render('confirmemail', { message: 'We were unable to find a user for this token.', canlog: false });
      }
      if (user.isVerified) {
        return res.render('confirmemail', { message: 'This user has already been verified.', canlog: true });
      }
      // Verify and save the user
      user.isVerified = true;
      return user.save((err2) => {
        if (err2) {
          console.log(err2);
          res.render('confirmemail', { message: 'Internal error', canlog: false });
        }
        return res.render('confirmemail', { message: 'Great, your account has been activated !', canlog: true });
      });
    });
  });
});

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
