const express = require("express");
const router = express.Router();
const Category = require("../models/category-model.js");
const Request = require("../models/request-model.js");


// REQUEST CATEGORIES ROUTER --------------------------------------------------------------
//####################################################################

//GET TO REQUEST CATEGORIES ****************************************
router.get("/requete-categories", (req, res, next) => {
  Request.find()
    .sort({ createdAt: -1 })
    .then(reqCategoriesResults => {
      res.locals.reqCategoriesResults = reqCategoriesResults;
      res.render("req-categories");
    });


});












module.exports = router;