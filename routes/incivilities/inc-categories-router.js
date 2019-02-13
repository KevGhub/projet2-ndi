const express = require("express");
const router = express.Router();
const Category = require("../../models/category-model.js");
const Incivilities = require("../../models/incivility-model.js");

//Incivilities categories to list of  Incivilities  ****************************************

// ######### Route All categories to category list router  ######
router.get("/incivilites-categorie/:oneCategory", (req, res, next) => {
  Incivilities.find({ urlCategory: { $eq: req.params.oneCategory } })
    .then(incivilityResults => {
      console.log(incivilityResults);
      res.locals.incivilityArray = incivilityResults;

      res.render("incivilities-views/inc-list.hbs");
    })

    .catch(err => next(err));
});

router.get("/incivilites/:oneIncivility", (req, res, next) => {
  Incivilities.find({ urlName: { $eq: req.params.oneIncivility } })
    .then(incivilityResults => {
      //console.log(incivilityResults);
      res.locals.incivilityArray = incivilityResults;

      res.render("incivilities-views/inc-case-detail.hbs");
    })

    .catch(err => next(err));
});

module.exports = router;

// // ######### Route All categories to category list Tranquilite  ######

// router.get("/incivilites-categories-Tranquilite-liste", (req, res, next) => {
//   const { name } = req.body;
//   Category.find()
//     .then(categoryResults => {
//       console.log(categoryResults);
//       res.locals.categoryResults = categoryResults[1].name;
//       res.render("incivilities-views/inc-list.hbs");
//     })

//     .catch(err => next(err));
// });

// // ######### Route All categories to category list Environnement  ######

// router.get("/incivilites-categories-Environnement-liste", (req, res, next) => {
//   const { name } = req.body;
//   Category.find()
//     .then(categoryResults => {
//       console.log(categoryResults);
//       res.locals.categoryResults = categoryResults[2].name;
//       res.render("incivilities-views/inc-list.hbs");
//     })

//     .catch(err => next(err));
// });

// ////////////////////////////////////
// // ######### Route All categories to category list Dignite  ######

// router.get("/incivilites-categories-Dignite-liste", (req, res, next) => {
//   const { name } = req.body;
//   Category.find()
//     .then(categoryResults => {
//       console.log(categoryResults);
//       res.locals.categoryResults = categoryResults[3].name;
//       res.render("incivilities-views/inc-list.hbs");
//     })

//     .catch(err => next(err));
// });
