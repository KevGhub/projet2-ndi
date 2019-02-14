const express = require("express");
const router = express.Router();
const fileUploader = require("../../config/file-upload");
const Request = require("../../models/request-model");
const User = require("../../models/user-model");

// REQUEST CATEGORIES ROUTER --------------------------------------------------------------
//####################################################################

// ADD A REQUET /nouvelle-requete = req-create.hbs --------------------------------------------------------------
router.get("/nouvelle-requete", (req, res, next) => {
  // enforce login rules to access create a room ****************************************************
  if (req.user) {
    // AUTHORIZATION : redirect to login if you're not log in
    res.render("requests-views/req-create");
  } else {
    req.flash("add-room-error", `You have to be looged in ! 🥣`);
    res.redirect("/identification");
  }
});
//*********************************************************************

// PROCESSING VERIFICATION ****************************************
router.post(
  "/verif-create-req",
  fileUploader.single("pictureUpload"),
  (req, res, next) => {
    // enforce login rules to access create a request ***************************
    if (!req.user) {
      req.flash("logError", `You have to be logged in ! 🥣`);
      res.redirect("/identification");
    } else {
      const { title, description, place, goal, category } = req.body;
      const creator = req.user._id;
      let img;
      if (req.file) {
        img = req.file.secure_url;
      }

      //create a requet ****************************************
      Request.create({
        title,
        description,
        place,
        goal,
        creator,
        img,
        category
      })
        .then(requestDoc => {
          User.findByIdAndUpdate(req.user._id, {
            $push: { userRequest: requestDoc._id }
          })
            .then(() => {
              req.flash("add-room-success", `Request Created SUCCESS 🍔`);
              res.redirect("/requete-detail/" + requestDoc._id);
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    }
  }
);
//*********************************************************************
// END ADD A ROOM --------------------------------------------------------------

//GET TO REQUEST DETAIL PAGE****************************************
router.get("/requete-detail/:id", (req, res, next) => {
  Request.findById(req.params.id)
    .then(reqDoc => {
      res.locals.reqDoc = reqDoc;
      res.render("requests-views/req-detail");
    })
    .catch(err => next(err));
});

//---------- VOTE

//*********************************************************************

//GET TO REQUEST CATEGORIES LISTING PAGE****************************************
router.get("/liste-requetes", (req, res, next) => {
  Request.find()
    .sort({ createdAt: -1 })
    .then(reqCategoriesResults => {
      res.locals.reqCategoriesResults = reqCategoriesResults;
      res.render("requests-views/req-listing");
    });
});
//*********************************************************************

module.exports = router;
