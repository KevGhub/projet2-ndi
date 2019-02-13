const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//------------------------------ USER SCHEMA

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true, unique: true, match: /^.+@.+\..+$/ },
    profileImg: {
      type: String,
      default: "https://media.giphy.com/media/xThtaxbIPLT9XqWcDK/giphy.gif"
    },
    age: { type: Number, required: true, min: 16 },
    pseudo: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    userRequest: [
      {
        type: Schema.Types.ObjectId,
        ref: "Request"
      }
    ],
    vote: [
      {
        type: Number,
        enum: ["normal", "admin"],
        default: "normal"
      }
    ]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
