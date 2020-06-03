const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  Address: { type: String },
  Bathroom: { type: Number },
  Bedroom: { type: Number },
  Latitude: { type: Number },
  Longitude: { type: Number },
  Living_Area: { type: Number },
  Price: { type: Number },
  Property_Type: { type: String },
});

module.exports = mongoose.model("Property", PropertySchema);
