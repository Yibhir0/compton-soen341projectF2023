const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Creating a new schema for the property model for the make an offer.
const offerSchema = new Schema({

  brokerID: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: false,
  },

  propertyId: {
    type: String,
    required: false,
  },

  message: {
    type: String,
    required: false,
  },

  accepted: {

    type: Boolean,
    default: false

  },
  address: {

    type: String,
    default: false

  },
  city: {

    type: String,
    default: false

  },

  requestedAt: {
    type: Date
  },

  offerPrice: {
    type: String,
    default: false
  },

});

module.exports = mongoose.model("Offer", offerSchema);