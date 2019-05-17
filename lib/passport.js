const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local');

const User = require("../models/users")


passport.serializeUser(function(user, done) {
  done(null, user._id);
})

passport.deserializeUser(function(_id, done) {
  User.findById(_id).then( (user) => {
    done(null, user)
  })
})

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({email}, (err, user) => {
    if (err) return done(err)
    if (!user) {
      return done(null, false, { message: "Invalid email or password" })
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err)
      if (isMatch) {
        return done(null, user)
      } 
      return done(null, false, { message: 'Invalid email or password' })
    })
  })
}))

const postLogin = (req, res, next) => {
  /* nepouziva sa */
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      //req.flash('errors', info);
      return res.redirect('/login');
    }
    req.login(user, (err) => {
      if (err) { return next(err); }
      //req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next)
}

module.exports={postLogin}
