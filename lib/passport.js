const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local');

const User = require("../models/users")


passport.serializeUser(function(user, done) {
  done(null, user._id);
})

passport.deserializeUser(function(_id, done) {
  const rss = User.findById(_id).then( (user) => {
    done(null, user)
  })
})

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  user = await User.findOne({email})
  if (!user) {
    return done(null, false, { msg: `Email ${email} not found.` })
  }
  return done(null, user)
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err) }
    if (!user) {
      return done(null, false, { msg: `Email ${email} not found.` })
    }
    return done(null, user)
    /*
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err) }
      if (isMatch) {
        return done(null, user)
      }
      return done(null, false, { msg: 'Invalid email or password.' })
    })*/
  })
}))

const postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      //req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      //req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })//(req, res, next)
}

module.exports={postLogin}
