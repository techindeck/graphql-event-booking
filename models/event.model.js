const mongoose = require("mongoose");

const Schema = mongoose.Schema; // Schema is a constructor function

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Event", eventSchema);
