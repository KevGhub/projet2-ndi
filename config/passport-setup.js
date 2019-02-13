const passport = require('passport');

const User = require("../models/user-model");


passport.serializeUser((userResult, done) => {
  done(null, userResult.email);
});


passport.deserializeUser((userEmail, done) => {
  User.findOne({ email: { $eq: userEmail } })
    .then(userResult => {
      done(null, userResult);
    })

    .catch(err => done(err));
});