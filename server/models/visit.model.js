const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Creating a new schema for the property model. */
const visitSchema = new Schema({

  brokerID: { //This would be the brokers unique identifier.Only brokers would have this ID
    type: String,
    required: false,
  },

  email: {// This is the email tied to the accound. Every type of user (Admin,Broker or homebuyer must have one.
    type: String,
    required: false,
  },

  propertyId: {// This is the unique identifier of a given property.Every property must have there own ID.
    type: String,
    required: false,
  },

  message: {// This would be the message from the homebuyer to the broker
    type: String,
    required: false,
  },

  accepted: {//The statuts of the visit request. Upon the broker's acceptance, the value would be change to true

    type: Boolean,
    default: false

  },
  address: {// The address to the property that is requested to visit

    type: String,
    default: false

  },
  city: {//The city to the property that is requested to visit

    type: String,
    default: false

  },

  requestedAt: {// The date when the visit request was sent to the broker
    type: Date
  }



});

module.exports = mongoose.model("Visit", visitSchema);