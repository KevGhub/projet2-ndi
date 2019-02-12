const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//------------------------------ USER SCHEMA

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true, unique: true, match: /^.+@.+\..+$/ }, // unique : ONE user for one email
    profileImg: { type: String, default: URL }, // ? URL ?
    age: { type: Number, required: true, min: 16 },
    anonymousOption: [
      {
        pseudo: { type: String, required: true },
        anonymousImg: { type: String, default: URL }
      }
    ],
    encryptedPassword: { type: String, required: true },

    vote: [
      {
        type: String,
        required: true,
        enum: ["normal", "admin"],
        default: "normal"
      }
    ]
  },
  {
    // additionnal setting for the Schema class defined here
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
