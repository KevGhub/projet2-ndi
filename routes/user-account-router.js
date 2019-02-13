const express = require("express");
const User = require("../models/user-model");
const router = express.Router();
const Request = require("../models/request-model");


// USER ACCOUNT ROUTER --------------------------------------------------------------
//####################################################################

// ACCESS TO USER ACCOUNT PAGE --------------------------------------------------------------
router.get("/mon-compte/:id", (req, res, next) => {
  // enforce login rules to access create a room ****************************************************
  if (!req.user) {
    req.flash("logError", `You have to be logged in ! 🥣`);
    res.redirect("/identification");
  } else {   
    const userRequest = req.user._id;  
      // GET USER'S INFO **************************************************
      User.findById(req.params.id)
      .then(userDoc => {
        res.locals.userDoc = userDoc;
        res.redirect("user-account-views/user-account" + userDoc._id);
      })
      .then(
        // GET USER'S REQUEST **************************************************
        Request.findById(userRequest)
        .sort({ createdAt: -1 })
        .then(reqUser => {
          res.locals.reqUser = reqUser;
          res.render("user-account-views/user-account");    
        })
      )
      .catch(err => next(err));

    
  }
  //*********************************************************************


  //GET TO USER'S REQUEST LISTING ****************************************
 

  //*********************************************************************
  // END SHOW USER PROFIL --------------------------------------------------------------
});
  //*********************************************************************





module.exports = router;