const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true, minlength: 100 },
    place: { type: String, required: true },
    goal: { type: String, required: true },
    voteAim: { type: Number },
    numberOfVote: { type: Number },

    img: {
      type: String,
      default: "https://media.giphy.com/media/3o7bukvWq54k2Q9H2w/giphy.gif"
    },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    category: {
      type: String,
      enum: ["Protection", "Environnement", "Tranquilite", "Dignite"],
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
