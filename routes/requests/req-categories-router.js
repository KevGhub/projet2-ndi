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
router.post("/verif-create-req", fileUploader.single("pictureUpload"), (req, res, next) => {
  // enforce login rules to access create a request ***************************
  if (!req.user) {
    req.flash("logError", `You have to be logged in ! 🥣`);
    res.redirect("/identification");
  } else {
    
    const { title, description, place, goal, category } = req.body;
    const creator = req.user._id;
    const urlCat = category.toLowerCase();
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
      category,
      urlCat
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

// REQUEST CATEGORIES LISTING to category list ****************************************
router.get("/requete-categorie/:oneCategory", (req, res, next) => {
  Request.find({ urlCat: { $eq: req.params.oneCategory } })
    .then(requeteResults => {
      console.log(requeteResults);
      res.locals.requeteResults = requeteResults;
      res.render("requests-views/req-listing");
    })
    .catch(err => next(err));
  
  
});




//GET TO REQUEST DETAIL PAGE****************************************
router.get("/requete-detail/:id", (req, res, next) => {
  Request.findById(req.params.id)
    .then(reqDoc => {
      res.locals.reqDoc = reqDoc;
      res.render("requests-views/req-detail");
    })
    .catch(err => next(err));
});

//---------- VOTE COOUTER

//*********************************************************************
router.post("/requete-detail/:id/vote", (req, res, next) => {
  Request.findByIdAndUpdate(req.params.id, {
    $inc: {
      numberOfVote: 1
    }
  })
    .then(reqDoc => {
      res.locals.reqDoc = reqDoc;
      res.redirect(`/requete-detail/${reqDoc._id}`);
    })
    .catch(err => next(err));
});

module.exports = router;
