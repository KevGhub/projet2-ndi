const express = require("express");
const router = express.Router();
const Category = require("../../models/category-model.js");
const Incivilities = require("../../models/incivility-model.js");

// ######### Categorie Protection to case Animaux router  ######
router.get(
  "/incivilites-categories-Protection-cases-Animaux",
  (req, res, next) => {
    const { name } = req.body;
    Incivilities.find()
      .then(Results => {
        console.log(incivilityResults);
        res.locals.incivilityResults = incivilityResults[0].name;
        // res.render("incivilities-views/inc-list.hbs");
      })

      .catch(err => next(err));
  }
);

module.exports = router;
