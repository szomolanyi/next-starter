import nc from 'next-connect';
import common from '../../../server/common';
import passport from '../../../server/passport';

const asyncLogin = (req, user) => new Promise((resolve, reject) => req.login(user, (err) => {
  if (err) {
    reject(err);
  }
  resolve();
}));

const asyncAuth = (req, res, type, options) => new Promise((resolve, reject) => {
  passport.authenticate(
    type,
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

const scopes = {
  google: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
  facebook: ['email'],
};

export default nc()
  .use(common)
  .get(async (req, res) => {
    const {
      query: { slug },
    } = req;
    const [type, phase] = slug;
    try {
      if (phase === 'callback') {
        const user = await asyncAuth(req, res, type, { scope: scopes[type] });
        await asyncLogin(req, user);
        res.redirect(process.env.APP_URL ? `${process.env.APP_URL}` : '/');
      } else {
        await asyncAuth(req, res, type, { scope: scopes[type] });
      }
    } catch (error) {
      console.log(error);
      res.redirect(process.env.APP_URL ? `${process.env.APP_URL}/loginfailed` : '/');
    }
  });
