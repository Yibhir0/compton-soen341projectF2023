const mongoose = require("mongoose");

var GeoJSON = require('mongoose-geojson-schema');

const Schema = mongoose.Schema;

/* Creating a new schema for the property model. */
const propertySchema = new Schema({
  brokerID: {//The Id of the broker who listed the property.This ID is unique to each broker
    type: String,
    required: false,
  },

  address: {// The address of the property 
    type: String,
    required: false,
  },

  city: {// The city of the property
    type: String,
    required: false,
  },

  postalCode: {// The postal code of the property
    type: String,
    required: false,
  },

  propertyType: {// The type of perperty listed
    type: String,
    required: false,
  },

  price: {// The price of the property
    type: Number,
    required: false,
  },

  numberOfBedrooms: {// The number of bedrooms in the property 
    type: Number,
    required: false,
  },

  numberOfBathrooms: {// The number of bathrooms in the property 
    type: Number,
    required: false,
  },

  amenities: {// The services provided by purchasing the property 
    type: Array,
    required: false,
  },

  images: {// The an imgage of the coralated property
    type: Array,
    required: false,
  },

  geometry: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },

  },

});

module.exports = mongoose.model("Property", propertySchema);