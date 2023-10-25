const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Creating a new schema for the property model. */
const propertySchema = new Schema({
  brokerID: {
    type: String,
    required: false,
  },

  address: {
    type: String,
    required: false,
  },

  city:{
    type: String,
    required: false,
  },
  
  postalCode:{
    type: String,
    required: false,
  },

  propertyType: {
    type: String,
    required: false,
  },

  price:{
    type: Number,
    required: false,
  },

  numberOfBedrooms:{
    type: Number,
    required: false,
  },

  numberOfBathrooms:{
    type: Number,
    required: false,
  },

  amenities:{
    type: Array,
    required: false,
  },

  images:{
    type: Array,
    required: false,
  },

});

module.exports = mongoose.model("Property", propertySchema);