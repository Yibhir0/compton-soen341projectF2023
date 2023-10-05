const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Creating a new schema for the property model. */
const propertySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  propertyType: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("Property", propertySchema);