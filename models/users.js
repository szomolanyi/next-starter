const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
}, {
  timestamps: true,
});

userSchema.pre('save', function save(next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    console.log({ salt, u: user.password });
    return bcrypt.hash(user.password, salt, (err2, hash) => {
      if (err2) { return next(err2); }
      user.password = hash;
      return next();
    });
  });
});
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};


const User = mongoose.model('User', userSchema);

module.exports = User;
