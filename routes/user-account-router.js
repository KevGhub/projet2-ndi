const express = require("express");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const fileUploader = require("../config/file-upload.js");
const router = express.Router();


// USER ACCOUNT ROUTER --------------------------------------------------------------
//####################################################################

// ACCESS TO USER ACCOUNT PAGE --------------------------------------------------------------
router.get("/mon-compte/:userId", (req, res, next) => {
  // enforce login rules to access create a room ****************************************************
    if (req.user) {
      // AUTHORIZATION : redirect to login if you're not log in
      res.render("user-account-views/user-account");
    } else {
      req.flash("logError", `You have to be looged in ! 🥣`);
      //redirect to login page if userResult is NULL (no account with the email)
      res.redirect("/identification");
    };
  //*********************************************************************

  // find user in databse using the ID from the url **************************************************
    const { userId } = req.params;
    User.findById(userId)
      .then(userDoc => {
        res.locals.userDoc = userDoc;
        res.render("user-account-views/user-account");
      })
      .catch(err => next(err));
  //*********************************************************************
  // END SHOW USER PROFIL --------------------------------------------------------------
});
  //*********************************************************************





module.exports = router;