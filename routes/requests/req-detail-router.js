const express = require("express");
const router = express.Router();
const Category = require("../models/category-model.js");
const Request = require("../models/request-model.js");


// REQUEST ROUTER --------------------------------------------------------------
//####################################################################

// ADD A REQUEST --------------------------------------------------------------
router.get("/req-create", (req, res, next) => {
  // enforce login rules to access create a room ****************************************************
  if (req.user) {
    // AUTHORIZATION : redirect to login if you're not log in
    res.render("room-views/room-form");
  } else {
    req.flash('add-room-error', `You have to be looged in ! 🥣`);
    //redirect to login page if userResult is NULL (no account with the email)
    res.redirect('/login');
  }
});
//*********************************************************************


// PROCESSING VERIFICATION ****************************************
router.post("/verif-add-room", fileUploader.single('pictureUpload'), (req, res, next) => {
  const { name, description } = req.body
  // fileUploader.single() .single() is a maethod from multer that allow you put upload 1 file
  // for multiply files use .array()
  // put the key of the file you want to récuperer from the form

  //req.user comes from Passport's de
  const host = req.user._id;

  // multer puts all file into it got from the service into req.file
  console.log('file upload is ALWAYS in a req.file OR req.files', req.file);

  // get part of the Cloudinary information (width, height, url...)
  const pictureUrl = req.file.secure_url;
  //*********************************************************************


  //create a room ****************************************
  Room.create({ name, description, pictureUrl, host })
    .then(() => {
      // req.flash send a feedback message before a redirect
      // (it's defined by the 'connect-flash' npm package)
      // must containe 2 ARGUMENTS : TYPE (= css class for styling), TEXT (of the msg)
      req.flash('add-room-success', `Room Created SUCCESS 🍔`);
      //redirect to login page if userResult is NULL (no account with the email)
      res.redirect('/my-rooms');
    })
    .catch(err => next(err));
});
  //*********************************************************************
  // END ADD A ROOM --------------------------------------------------------------





module.exports = router;