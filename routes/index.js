const express = require("express");
const router = express.Router();
const Category = require('../models/category-model.js')


// HOMEPAGE ROUTER --------------------------------------------------------------
//####################################################################
  //GET TO HOMEPAGE ****************************************
router.get("/", (req, res, next) => {
  res.render("index");
});

  //HOMEPAGE TO INCIVILITIES CATEGORY ****************************************
router.get("/incivility-category", (req, res, next) => {
  Category.find()

    .then(categoryResults => {
      res.locals.categoryArray = categoryResults;
      res.render("incivilities-views/inc-categories.hbs");
    })

    // next(err) skips to the error handler in "bin/wwww" (error.hbs)
    .catch(err => next(err));
});

//HOMEPAGE TO INCIVILITIES CATEGORY ****************************************
router.get("/request-category", (req, res, next) => {
  Category.find()

    .then(categoryResults => {
      res.locals.categoryArray = categoryResults;
      res.render("requests-views/req-categories.hbs");
    })

    // next(err) skips to the error handler in "bin/wwww" (error.hbs)
    .catch(err => next(err));
});

module.exports = router;
