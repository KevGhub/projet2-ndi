const passport = require('passport');

const User = require("../models/user-model");


passport.serializeUser((userResult, done) => {
  done(null, userResult.email);
});


passport.deserializeUser((userId, done) => {
  User.findOne(userId.email)
    .then(userResult => {
      done(null, userResult);
    })

    .catch(err => done(err));
});