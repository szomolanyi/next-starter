import mongoose from 'mongoose';
import nc from 'next-connect';
import session from 'express-session';
import ConnectMongo from 'connect-mongo';
import passport from './passport';

const MongoStore = ConnectMongo(session);

const connectDbMiddleware = async (req, res, next) => {
  if (mongoose.connections[0].readyState) return next();
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  return next();
};

const envCheckMiddleware = () => {
  let envCheckDone = false;
  return (req, res, next) => {
    if (envCheckDone === false) {
      envCheckDone = true;
      if (!process.env.SENDGRID_API_KEY) {
        console.warn('SENDGRID_API_KEY environment variable is not defined ... application will not be able to send emails.');
      }
      if (!process.env.GOOGLE_APP_CLIENT_ID || !process.env.GOOGLE_APP_SECRET || process.env.GOOGLE_APP_CLIENT_ID === 'none') {
        console.warn('GOOGLE_APP_CLIENT_ID or GOOGLE_APP_SECRET are not defined ... google sosial auth will not work.');
      }
    }
    next();
  };
};

export default nc()
  .use(envCheckMiddleware())
  .use(connectDbMiddleware)
  /*
  .use(session({
    name: 'sess',
    secret: 'some_not_random_password_that_is_at_least_32_characters',
    cookie: {
      maxAge: 60 * 60 * 8, // 8 hours,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    },
  }))
  */
  .use(session({
    resave: false, // true sposobuje, ze nefunguje logout
    saveUninitialized: false, // true sposobuje, ze nefunguje login TODO: preskumat true,
    key: 'token',
    secret: process.env.SESSION_SECRET || 'unsafe secret',
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  }))
  .use(passport.initialize())
  .use(passport.session());
