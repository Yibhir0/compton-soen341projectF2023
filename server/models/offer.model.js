const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Creating a new schema for the property model for the make an offer.

const offerSchema = new Schema({

  brokerID: {//This would be the brokers unique identifier.Only brokers would have this ID
    type: String,
    required: false,
  },
  sentBrokerID: {//This would be the brokers unique identifier.Only brokers would have this ID
    type: String,
    required: false,
  },
//email of buyer
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
  },

  offerPrice: {// The price offered by the homebuyer to buy the property
    type: String,
    default: false
  },

  brokerName: {// The name of the broker who's has the  property listed
    type: String,
    default: false
  },

  brokerLiscence: {//The unique broker identification number
    type: String,
    default: false
  },

  brokerAgency: {// The broker agency of the broker
    type: String,
    default: false
  },

  buyerName: {// The name of the homebuyer who requested the offer
    type: String,
    default: false
  },

  buyerAddress: {//The address of the homebuyer
    type: String,
    default: false
  },

  deedSaleDate: {// The deed sales date
    type: String,
    default: false
  },

  moveInDate: {// The date to move in by
    type: String,
    default: false
  },

  status: {
    type:String,
    default: "Pending"
  }

});

module.exports = mongoose.model("Offer", offerSchema);