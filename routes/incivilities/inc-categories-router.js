const express = require("express");
const router = express.Router();
const Category = require("../../models/category-model.js");
const Incivilities = require("../../models/incivility-model.js");

//Incivilities categories to list of  Incivilities  ****************************************

router.get("/incivilites-categories-Protection-liste", (req, res, next) => {
  const { name } = req.body;
  Category.find()
    .then(categoryResults => {
      // console.log(categoryResults);
      res.locals.categoryResults = categoryResults[0].name;
      // res.render("incivilities-views/inc-list.hbs");
    })

    .catch(err => next(err));

  const { category } = req.body;
  Incivilities.findOne({ category: { $eq: category } })
    .then(incivilityResults => {
      res.locals.incivilityResults = incivilityResults;
      res.render("incivilities-views/inc-list.hbs");
    })

    .catch(err => next(err));
});

module.exports = router;
