const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  isVerified: { type: Boolean, default: false },
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
