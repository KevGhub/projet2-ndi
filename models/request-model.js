const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true, minlength: 100 },
    place: { type: String }, // not required
    goal: { type: Number, required: true },
    img: { type: String, default: "URL" } // photo default ??
  },
  {
    // additionnal setting for the Schema class defined here
    timestamps: true
  }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
