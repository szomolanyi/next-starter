const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local');

const users = require("../models/users")


passport.serializeUser(function(user, done) {
  done(null, user._id);
})

passport.deserializeUser(function(_id, done) {
  const rss = users.findById(_id).then( (user) => {
    done(null, user)
  })
})

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  user = await users.findUser({email})
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

module.exports={e:"e"}
