const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//------------------------------ Incivility SCHEMA

const incivilitySchema = new Schema(
  {
    name: { type: String, required: true },
    category: ["protection", "environnement", "tranquilité", "dignité"],
    icon: { type: String, default: URL }, // ? URL ?
    description: { type: String, required: true },
    law: { type: String, required: true },
    associations: [
      { name: { type: String }, img: { type: "String" }, url: { type: String } }
    ]
  },

  {
    // additionnal setting for the Schema class defined here
    timestamps: true
  }
);

const Incivility = mongoose.model("Incivility", incivilitySchema);

module.exports = Incivility;
