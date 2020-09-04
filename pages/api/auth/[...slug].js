import nc from 'next-connect';
import common from '../../../server/common';
import passport from '../../../server/passport';

const asyncLogin = (req, user) => new Promise((resolve, reject) => req.login(user, (err) => {
  if (err) {
    reject(err);
  }
  resolve();
}));

const runAuthAsync = (req, res) => new Promise((resolve, reject) => {
  passport.authenticate('google', (err, user) => {
    if (err) {
      res.end(`Error ${err}`);
      reject(err);
    }
    resolve(user);
  })(req, res);
});

const runAuthAsync1 = (req, res) => new Promise((resolve, reject) => {
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  },
  (err, user) => {
    if (err) {
      reject(err);
    } else {
      resolve(user);
    }
  })(req, res);
});

const google = async (req, res, phase) => {
  let user;
  switch (phase) {
    case 'callback':
      user = await runAuthAsync(req, res);
      await asyncLogin(req, user);
      res.redirect(`${process.env.APP_URL}/twitter`);
      break;
    default:
      await runAuthAsync1(req, res);
      break;
  }
};

export default nc()
  .use(common)
  .get(async (req, res) => {
    const {
      query: { slug },
    } = req;
    const [type, phase] = slug;
    try {
      switch (type) {
        case 'google':
          await google(req, res, phase);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  });
