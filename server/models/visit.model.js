const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Creating a new schema for the property model. */
const visitSchema = new Schema({

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
  }



});

module.exports = mongoose.model("Visit", visitSchema);