const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, minlength: 100 },
  place: { type: String }, // not required
  goal: { type: number, required: true },
  img: { type: String, default: URL } // photo default ??
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
