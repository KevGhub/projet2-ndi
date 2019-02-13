const express = require("express");
const User = require("../models/user-model");
const router = express.Router();


// USER ACCOUNT ROUTER --------------------------------------------------------------
//####################################################################

// ACCESS TO USER ACCOUNT PAGE --------------------------------------------------------------
router.get("/mon-compte", (req, res, next) => {
  // enforce login rules to access create a room ****************************************************
  if (!req.user) {
    req.flash("logError", `You have to be logged in ! 🥣`);
    //redirect to login page if userResult is NULL (no account with the email)
    res.redirect("/identification");
  }
  //*********************************************************************

  // find user in databse using the ID from the url **************************************************

  User.findById(req.user._id)
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