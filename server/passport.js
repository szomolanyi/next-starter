const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./models/users');


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_APP_CLIENT_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
  callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
  passReqToCallback: true,
},
async (request, accessToken, refreshToken, profile, done) => {
  if (!profile.verified) {
    return done(new Error('Google account is not verified'), false);
  }
  try {
    const user = await User.findOne({ email: profile.email });
    if (user && !user.isVerified) {
      return done(new Error('Local email found, but it is not verified'), false);
    }
    if (!user) {
      const newUser = new User({
        firstName: profile.given_name,
        lastName: profile.family_name,
        google: profile,
        email: profile.email,
        isVerified: true,
        hasLocalPassword: false,
      });
      await newUser.save();
      return done(null, newUser);
    }
    user.firstName = profile.given_name;
    user.lastName = profile.family_name;
    user.google = profile;
    await user.save();
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

/*
Use if standard LocalStrategy is used:

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  User.findById(_id).then((user) => {
    done(null, user);
  });
});
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);
    if (!user) {
      return done(null, false, { message: 'Invalid email or password' });
    }
    return user.comparePassword(password, (err2, isMatch) => {
      if (err2) return done(err2);
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { message: 'Invalid email or password' });
    });
  });
}));
const postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      // req.flash('errors', info);
      return res.redirect('/login');
    }
    req.login(user, (err) => {
      console.log({ m: 'afterlogin', user, err });
      if (err) { return next(err); }
      // req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};
*/

module.exports = {};
