const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//------------------------------ Incivility SCHEMA

const incivilitySchema = new Schema(
  {
    name: { type: String, required: true },
    urlName: { type: String },

    //category: ["protection", "environnement", "tranquilite", "dignite"],
    category: { type: String },

    urlCategory: { type: String },

    icon: { type: String, default: URL }, // ? URL ?
    description: { type: String, required: true },
    law: { type: String, required: true },
    associations: [
      {
        name: { type: String },
        img: { type: String, default: "http://gph.is/1Kjtlft" },
        url: { type: String }
      }
    ]
  },

  {
    // additionnal setting for the Schema class defined here
    timestamps: true
  }
);

const Incivility = mongoose.model("Incivility", incivilitySchema);

module.exports = Incivility;
