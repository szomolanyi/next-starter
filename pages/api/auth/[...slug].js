import nc from 'next-connect';
import common from '../../../server/common';
import passport from '../../../server/passport';

const asyncLogin = (req, user) => new Promise((resolve, reject) => req.login(user, (err) => {
  if (err) {
    reject(err);
  }
  resolve();
}));

const asyncGoogleAuth = (req, res, options) => new Promise((resolve, reject) => {
  passport.authenticate(
    'google',
    options,
    (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    },
  )(req, res);
});

const google = async (req, res, phase) => {
  let user;
  switch (phase) {
    case 'callback':
      user = await asyncGoogleAuth(req, res, {});
      await asyncLogin(req, user);
      res.redirect(`${process.env.APP_URL}/twitter`);
      break;
    default:
      await asyncGoogleAuth(req, res, {
        scope: [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email',
        ],
      });
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
    console.log(`auth type=${type} phase=${phase}`);
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
      res.redirect(`${process.env.APP_URL}/twitter/loginfailed`);
    }
  });
