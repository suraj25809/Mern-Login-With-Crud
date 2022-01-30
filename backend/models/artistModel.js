const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const artistSchema = new mongoose.Schema({
  artistname: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  artistrole: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

//Export the model
module.exports = mongoose.model("Artist", artistSchema);
