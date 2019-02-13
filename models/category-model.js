const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, default: "URL" } // ?photo default?
});

const Category = mongoose.model("Category", categorySchema, "catergory");

module.exports = Category;
