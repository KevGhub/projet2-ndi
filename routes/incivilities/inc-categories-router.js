const express = require("express");
const router = express.Router();
const Category = require("../../models/category-model.js");
const Incivilities = require("../../models/incivility-model.js");

//Incivilities categories to list of  Incivilities  ****************************************

// ######### Route All categories to category list Protection router  ######
router.get("/incivilites-categories-protection-liste", (req, res, next) => {
  const { name } = req.body;
  Category.find()
    .then(categoryResults => {
      console.log(categoryResults);
      res.locals.categoryResults = categoryResults[0].name;
      // res.render("incivilities-views/inc-list.hbs");
    })

    .catch(err => next(err));

  const { category } = req.body;
  Incivilities.find({ category: { $eq: category } })
    .then(incivilityResults => {
      res.locals.incivilityResults = incivilityResults;
      res.render("incivilities-views/inc-list.hbs");
    })

    .catch(err => next(err));
});

// ######### Route All categories to category list Tranquilite  ######

router.get("/incivilites-categories-Tranquilite-liste", (req, res, next) => {
  const { name } = req.body;
  Category.find()
    .then(categoryResults => {
      console.log(categoryResults);
      res.locals.categoryResults = categoryResults[1].name;
      res.render("incivilities-views/inc-list.hbs");
    })

    .catch(err => next(err));
});

// ######### Route All categories to category list Environnement  ######

router.get("/incivilites-categories-Environnement-liste", (req, res, next) => {
  const { name } = req.body;
  Category.find()
    .then(categoryResults => {
      console.log(categoryResults);
      res.locals.categoryResults = categoryResults[2].name;
      res.render("incivilities-views/inc-list.hbs");
    })

    .catch(err => next(err));
});

////////////////////////////////////
// ######### Route All categories to category list Dignite  ######

router.get("/incivilites-categories-Dignite-liste", (req, res, next) => {
  const { name } = req.body;
  Category.find()
    .then(categoryResults => {
      console.log(categoryResults);
      res.locals.categoryResults = categoryResults[3].name;
      res.render("incivilities-views/inc-list.hbs");
    })

    .catch(err => next(err));
});

module.exports = router;
