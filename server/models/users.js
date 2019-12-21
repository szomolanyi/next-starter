const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  isVerified: { type: Boolean, default: false },
  hasLocalPassword: { type: Boolean, default: false },
  firstName: String,
  lastName: String,
  google: {
    sub: String,
    id: String,
    displayName: String,
    name: {
      givenName: String,
      familyName: String
    },
    given_name: String,
    family_name: String,
    email_verified: Boolean,
    verified: Boolean,
    language: String,
    email: String,
    picture: String
  }
}, {
  timestamps: true,
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  errorMessages: {
    UserExistsError: 'Email Already Exists',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
