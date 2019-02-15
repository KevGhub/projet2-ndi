const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  urlName: { type: String, required: true },
  icon: { type: String, default: "https://media.giphy.com/media/3o7bukvWq54k2Q9H2w/giphy.gif" } // ?photo default?
});

const Category = mongoose.model("Category", categorySchema, "category");

module.exports = Category;
