const express = require("express");

const Category = require("../models/category-model.js");

// create the route object (container of routes)
const router = express.Router();

// ---- To add a new route
router.get("/info-category", (req, res, next) => {
  Category.find()
    // HERE possible to filter:   category.find({author: $eq : ... })

    .then(categoryResults => {
      res.locals.categoryArray = categoryResults;
      res.render("info-category-list.hbs");
    })

    // next(err) skips to the error handler in "bin/wwww" (error.hbs)
    .catch(err => next(err));
});

module.exports = router;
