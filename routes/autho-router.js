const express = require("express");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const fileUploader = require("../config/file-upload.js");
const router = express.Router();

// SIGNUP --------------------------------------------------------------
//####################################################################
router.get('/identification', (req, res, next) => {
  res.render('auth-views/log-sign-form')
});

// \\  PROCESSING SIGNUP VERIFICATION ****************************************
router.post(
  "/verif-signup", 
  fileUploader.single("pictureUpload"),
  (req, res, next) => {
    const {
      lastName,
      firstName,
      email,
      originalPassword,
      age,
      pseudo,
    } = req.body;

    // \\*********************************************************************

    // \\ enforce password rules ******************************************************
    if (!originalPassword || !originalPassword.match(/[0-9]/)) {
      req.flash(
        "logError",
        `Oops, votre mot de passe doit contenir au moins un chiffre entre 0-9 🌺`
      );
      res.redirect("/identification");
      return;
    }
    // \\**********************************************************************************

    // get part of the Cloudinary information (width, height, url...)
    // const profileImg = req.file.secure_url;
    // \\ encrytp the user's password before saving ****************************************
    const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

    let profileImg;

    if (req.file) {
      profileImg = req.file.secure_url;
    }

    User.create({
      lastName,
      firstName,
      email,
      encryptedPassword,
      age,
      pseudo,
      profileImg
    })
      .then(() => {
        req.flash("logSuccess", `Inscription SUCCESS 🦖`);
        res.redirect("/identification");
      })
      .catch(err => next(err));
  }
);
// \\*********************************************************************

// PROCESSING LOGIN VERIFICATION ****************************************
router.post('/verif-login', (req, res, next) => {
  const { email, originalPassword } = req.body;
  //*********************************************************************

  // validate the password ****************************************
  User.findOne({ email: { $eq: email } })
    .then(userResult => {
      if (!userResult) {
        req.flash('emailError', `Email is incorrect 🌚`);
        res.redirect("/identification");
        return
      };
      //*********************************************************************

      // validate the password ****************************************
      const { encryptedPassword } = userResult;

      if (!bcrypt.hashSync(originalPassword, encryptedPassword)) {
        req.flash('passwordError', `Password can't be blank and must contain a number 🥊`);
        res.redirect("/identification");
        return;
      }
      //*********************************************************************

      // EMAIL & PASSWORD ARE CORRECT ****************************************
      req.logIn(userResult, () => {
        req.flash('logSuccess', `Log In SUCCESS 🏆`);
        res.redirect('/');
      })
      // *********************************************************************
    })
    .catch(err => next(err));
});
// END LOGIN ROUTER  --------------------------------------------------------------
//####################################################################



// LOGOUT ROUTER --------------------------------------------------------------
//####################################################################
router.get('/deconnexion', (req, res, next) => {
  req.logout();
  req.session.save(() => {
    req.flash('logOutSuccess', `Log OUT SUCCESS 🏆`);
    res.redirect('/');
  });
});
// END LOGOUT ROUTER --------------------------------------------------------------
//####################################################################



module.exports = router;