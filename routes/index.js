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
router.get("/incivilites-categorie", (req, res, next) => {
  Category.find()

    .then(categoryResults => {
      res.locals.categoryArray = categoryResults;
      res.render("incivilities-views/inc-categories.hbs");
    })

    .catch(err => next(err));
});

  //HOMEPAGE TO REQUESTS CATEGORY ****************************************
router.get("/requete-categorie", (req, res, next) => {
  Category.find()

    .then(categoryResults => {
      res.locals.categoryArray = categoryResults;
      res.render("requests-views/req-categories.hbs");
    })

    .catch(err => next(err));
});

module.exports = router;
