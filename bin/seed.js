require("dotenv").config();

const mongoose = require("mongoose");

// get the incivility model to do our database query
const Incivility = require("../models/incivility-model.js");
const incivilitiesData = require("./incivilities.json");

const Request = require("../models/request-model.js");

const User = require("../models/user-model.js");
const Category = require("../models/category-model.js");

// get the Incivilities-data from json file

mongoose
  .connect("mongodb://localhost/ndi-data", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}💥"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// ---- insert Incivilities ----
Incivility.insertMany(incivilitiesData)
  .then(incivilitityResults => {
    console.log(`Inserted ${incivilitityResults.length} Incivilities 📘 👍`);
  })
  .catch(err => {
    console.log("Insert FAILURE", err);
  });

module.exports = Incivility;
