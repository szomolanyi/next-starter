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

export default nc()
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
