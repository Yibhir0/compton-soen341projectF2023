const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Creating a new schema for the property model. */
const propertySchema = new Schema({
  brokerID: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  city:{
    type: String,
    required: true,
  },
  
  postalCode:{
    type: String,
    required: true,
  },

  propertyType: {
    type: String,
    required: true,
  },

  price:{
    type: Number,
    required: true,
  },

  numberOfBedrooms:{
    type: Number,
    required: true,
  },

  numberOfBathrooms:{
    type: Number,
    required: true,
  },

  amenities:{
    type: Array,
    required: false,
  },

});

module.exports = mongoose.model("Property", propertySchema);