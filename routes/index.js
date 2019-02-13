const express = require("express");
const router = express.Router();
const Category = require('../models/category-model')


// HOMEPAGE ROUTER --------------------------------------------------------------
//####################################################################

  //GET TO HOMEPAGE ****************************************
router.get("/", (req, res, next) => {
  res.render("index");
});


  //HOMEPAGE TO REQUESTS CATEGORY ****************************************
router.get("/requete-categorie", (req, res, next) => {
  Category.find()

    .then(categoryResults => {
      res.locals.categoryArray = categoryResults;
      res.render("requests-views/req-categories");
    })

    .catch(err => next(err));
});

module.exports = router;
